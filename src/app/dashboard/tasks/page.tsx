"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { NormalizedReview, ApprovalStatus } from "@/types/review";
import { StarRating } from "@/components/dashboard/StarRating";
import Link from "next/link";

interface ReviewsResponse {
  status: string;
  result: NormalizedReview[];
  meta: {
    total: number;
    listings: { listingId: number; listingName: string }[];
    channels: string[];
  };
}

export default function TasksPage() {
  const [allPendingReviews, setAllPendingReviews] = useState<NormalizedReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Track actions made in current session (reviewId -> action)
  const [sessionActions, setSessionActions] = useState<Map<number, ApprovalStatus>>(new Map());
  
  // Selected action for current review (before saving)
  const [selectedAction, setSelectedAction] = useState<ApprovalStatus | null>(null);

  const fetchPendingReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews/hostaway?type=guest-to-host");
      const data: ReviewsResponse = await res.json();

      // Filter only pending reviews (from server)
      const pending = data.result.filter((r) => r.approvalStatus === "pending");
      setAllPendingReviews(pending);
      setCurrentIndex(0);
      // Clear session actions when freshly loaded
      setSessionActions(new Map());
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingReviews();
  }, [fetchPendingReviews]);

  // Count of remaining unprocessed reviews in this session
  const remainingCount = useMemo(() => {
    return allPendingReviews.filter(r => !sessionActions.has(r.id)).length;
  }, [allPendingReviews, sessionActions]);

  // Set selected action based on session actions when changing review
  useEffect(() => {
    const currentReview = allPendingReviews[currentIndex];
    if (currentReview && sessionActions.has(currentReview.id)) {
      setSelectedAction(sessionActions.get(currentReview.id)!);
    } else {
      setSelectedAction(null);
    }
  }, [currentIndex, allPendingReviews, sessionActions]);

  const saveAction = async () => {
    const currentReview = allPendingReviews[currentIndex];
    if (!currentReview || !selectedAction || updating) return;

    setUpdating(true);
    try {
      const res = await fetch("/api/reviews/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: currentReview.id, status: selectedAction }),
      });

      if (res.ok) {
        // Record the action in session
        setSessionActions(prev => {
          const newMap = new Map(prev);
          newMap.set(currentReview.id, selectedAction);
          return newMap;
        });
        
        // Move to next unprocessed review if available
        const nextUnprocessedIndex = allPendingReviews.findIndex(
          (r, idx) => idx > currentIndex && !sessionActions.has(r.id)
        );
        
        if (nextUnprocessedIndex !== -1) {
          setCurrentIndex(nextUnprocessedIndex);
        } else if (currentIndex < allPendingReviews.length - 1) {
          // Just go to next even if processed
          setCurrentIndex(currentIndex + 1);
        }
        // If it's the last one, stay on current (user can see the result)
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedAction) {
      // Save first, then auto-advance
      saveAction();
    } else if (currentIndex < allPendingReviews.length - 1) {
      // Just skip to next
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentReview = allPendingReviews[currentIndex];
  const isLastReview = currentIndex === allPendingReviews.length - 1;
  const isFirstReview = currentIndex === 0;
  const canGoNext = !isLastReview || selectedAction;
  const isCurrentProcessed = currentReview && sessionActions.has(currentReview.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const categoryLabels: Record<string, string> = {
    cleanliness: "Cleanliness",
    communication: "Communication",
    respectHouseRules: "House Rules",
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Title */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/dashboard" className="w-9 h-9 sm:w-10 sm:h-10 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-lg">FL</span>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-base sm:text-lg text-slate-800">Review Tasks</h1>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    <span className="sm:hidden">{remainingCount}</span>
                    <span className="hidden sm:inline">{remainingCount} pending</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">Approve or reject guest reviews</p>
              </div>
            </div>

            {/* Right: Back button */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Info Banner */}
        <div className="mb-4 sm:mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs sm:text-sm text-amber-800">
          <strong>Tip:</strong> Select Approve or Reject, then tap → to save.
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
              <p className="text-slate-500">Loading...</p>
            </div>
          </div>
        ) : allPendingReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white rounded-2xl border border-slate-200">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 sm:w-8 h-7 sm:h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-slate-800 text-base sm:text-lg font-semibold mb-2">All caught up!</p>
            <p className="text-slate-500 text-sm mb-6">No pending reviews.</p>
            <Link
              href="/dashboard"
              className="px-5 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        ) : currentReview ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[calc(100vh-180px)] sm:min-h-0">
            {/* Processed Banner */}
            {isCurrentProcessed && (
              <div className={`px-4 py-2 text-sm font-medium text-center ${
                sessionActions.get(currentReview.id) === "approved" 
                  ? "bg-teal-50 text-teal-700" 
                  : "bg-rose-50 text-rose-700"
              }`}>
                ✓ {sessionActions.get(currentReview.id) === "approved" ? "Approved" : "Rejected"} in this session (you can change it)
              </div>
            )}
            {/* Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                    {currentReview.listingName}
                  </h2>
                  <div className="flex items-center gap-1 sm:gap-2 mt-1 text-xs sm:text-sm text-slate-500 flex-wrap">
                    <span className="capitalize">{currentReview.channel}</span>
                    <span>•</span>
                    <span>{formatDate(currentReview.submittedAt)}</span>
                    <span className="text-slate-400 hidden sm:inline">({formatTimeAgo(currentReview.submittedAt)})</span>
                  </div>
                </div>
                {currentReview.averageRating && (
                  <StarRating rating={currentReview.averageRating} size="md" />
                )}
              </div>
            </div>

            {/* Review Content */}
            <div className="p-4 sm:p-6 flex-1">
              {/* Guest Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 sm:w-10 h-9 sm:h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-700 font-semibold text-sm sm:text-base">
                    {currentReview.guestName?.charAt(0).toUpperCase() || "G"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-sm sm:text-base">
                    {currentReview.guestName || "Anonymous Guest"}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500">Guest review</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-slate-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                &ldquo;{currentReview.publicReview}&rdquo;
              </p>

              {/* Category Ratings */}
              {currentReview.categories && Object.keys(currentReview.categories).length > 0 && (
                <div className="space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3 mb-4 sm:mb-6">
                  {Object.entries(currentReview.categories).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between sm:justify-start gap-2 px-3 py-2 bg-slate-50 rounded-lg"
                    >
                      <span className="text-sm text-slate-500">
                        {categoryLabels[key] || key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-semibold text-slate-700">
                        {value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="px-4 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 mt-auto">
              {/* Mobile Layout */}
              <div className="sm:hidden space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedAction("rejected")}
                    disabled={updating}
                    className={`h-11 flex items-center justify-center gap-2 rounded-xl font-medium transition-all ${
                      selectedAction === "rejected"
                        ? "bg-rose-500 text-white"
                        : "bg-white text-slate-600 border-2 border-slate-200"
                    } disabled:opacity-50`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                  <button
                    onClick={() => setSelectedAction("approved")}
                    disabled={updating}
                    className={`h-11 flex items-center justify-center gap-2 rounded-xl font-medium transition-all ${
                      selectedAction === "approved"
                        ? "bg-teal-500 text-white"
                        : "bg-white text-slate-600 border-2 border-slate-200"
                    } disabled:opacity-50`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={isFirstReview || updating}
                    className={`h-10 flex items-center justify-center rounded-lg font-medium text-sm ${
                      isFirstReview || updating
                        ? "text-slate-300"
                        : "text-slate-600 bg-white border border-slate-200"
                    }`}
                  >
                    ← Prev
                  </button>
                  <div className="flex items-center justify-center text-xs text-slate-400">
                    {currentIndex + 1} / {allPendingReviews.length}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!canGoNext || updating}
                    className={`h-10 flex items-center justify-center rounded-lg font-medium text-sm ${
                      !canGoNext || updating
                        ? "text-slate-300"
                        : selectedAction
                          ? "bg-teal-600 text-white"
                          : "text-slate-600 bg-white border border-slate-200"
                    }`}
                  >
                    {updating ? (
                      <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    ) : (
                      <>{selectedAction ? "Save" : "Skip"} →</>
                    )}
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:block">
                <div className="flex items-center justify-between">
                  {/* Left: Previous */}
                  <button
                    onClick={handlePrevious}
                    disabled={isFirstReview || updating}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                      isFirstReview || updating
                        ? "text-slate-300 cursor-not-allowed"
                        : "text-slate-600 hover:bg-white border border-slate-200"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  {/* Center: Action Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedAction("rejected")}
                      disabled={updating}
                      className={`w-32 h-12 flex items-center justify-center gap-2 rounded-xl font-medium transition-all ${
                        selectedAction === "rejected"
                          ? "bg-rose-500 text-white shadow-lg shadow-rose-200"
                          : "bg-white text-slate-600 border-2 border-slate-200 hover:border-rose-300 hover:text-rose-600"
                      } disabled:opacity-50`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>

                    <button
                      onClick={() => setSelectedAction("approved")}
                      disabled={updating}
                      className={`w-32 h-12 flex items-center justify-center gap-2 rounded-xl font-medium transition-all ${
                        selectedAction === "approved"
                          ? "bg-teal-500 text-white shadow-lg shadow-teal-200"
                          : "bg-white text-slate-600 border-2 border-slate-200 hover:border-teal-300 hover:text-teal-600"
                      } disabled:opacity-50`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                  </div>

                  {/* Right: Next */}
                  <button
                    onClick={handleNext}
                    disabled={!canGoNext || updating}
                    className={`w-28 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                      !canGoNext || updating
                        ? "text-slate-300 cursor-not-allowed"
                        : selectedAction
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "text-slate-600 hover:bg-white border border-slate-200"
                    }`}
                  >
                    {updating ? (
                      <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    ) : (
                      <>
                        {selectedAction ? "Save" : "Skip"}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {/* Progress */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{currentIndex + 1} / {allPendingReviews.length} · {remainingCount} remaining</span>
                  {selectedAction && !isCurrentProcessed && (
                    <span className={selectedAction === "approved" ? "text-teal-600" : "text-rose-600"}>
                      {selectedAction === "approved" ? "→ Will approve" : "→ Will reject"}
                    </span>
                  )}
                  {isCurrentProcessed && selectedAction && (
                    <span className={selectedAction === "approved" ? "text-teal-600" : "text-rose-600"}>
                      → Change to {selectedAction === "approved" ? "approve" : "reject"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

    </div>
  );
}
