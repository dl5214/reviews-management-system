"use client";

import { useState, useEffect, useCallback } from "react";
import { NormalizedReview } from "@/types/review";
import { ReviewCard } from "@/components/dashboard/ReviewCard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { StatsCards } from "@/components/dashboard/StatsCards";
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

export default function DashboardPage() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [listings, setListings] = useState<
    { listingId: number; listingName: string }[]
  >([]);
  const [channels, setChannels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());

  // Filter states
  const [selectedListing, setSelectedListing] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedApproval, setSelectedApproval] = useState("");
  const [sortBy, setSortBy] = useState("submittedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("type", "guest-to-host");
      if (selectedListing) params.set("listingId", selectedListing);
      if (selectedChannel) params.set("channel", selectedChannel);
      if (selectedRating) params.set("minRating", selectedRating);
      if (selectedApproval === "approved") params.set("isApproved", "true");
      if (selectedApproval === "pending") params.set("isApproved", "false");
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);

      const res = await fetch(`/api/reviews/hostaway?${params.toString()}`);
      const data: ReviewsResponse = await res.json();

      setReviews(data.result);
      setListings(data.meta.listings);
      setChannels(data.meta.channels);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [
    selectedListing,
    selectedChannel,
    selectedRating,
    selectedApproval,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleToggleApproval = async (reviewId: number) => {
    setUpdatingIds((prev) => new Set(prev).add(reviewId));

    try {
      const res = await fetch("/api/reviews/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId }),
      });

      if (res.ok) {
        const data = await res.json();
        setReviews((prev) =>
          prev.map((r) =>
            r.id === reviewId ? { ...r, isApproved: data.result.isApproved } : r
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle approval:", error);
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(reviewId);
        return next;
      });
    }
  };

  const handleResetFilters = () => {
    setSelectedListing("");
    setSelectedChannel("");
    setSelectedRating("");
    setSelectedApproval("");
    setSortBy("submittedAt");
    setSortOrder("desc");
  };

  const approvedCount = reviews.filter((r) => r.isApproved).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="text-white font-bold text-lg">FL</span>
                </div>
                <div>
                  <h1 className="font-bold text-xl text-slate-800">
                    Reviews Dashboard
                  </h1>
                  <p className="text-xs text-slate-500">Flex Living Manager</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {approvedCount > 0 && (
                <Link
                  href="/property/1001"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Preview Public Page
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <section className="mb-8">
          <StatsCards reviews={reviews} />
        </section>

        {/* Filters */}
        <section className="mb-8">
          <FilterBar
            listings={listings}
            channels={channels}
            selectedListing={selectedListing}
            selectedChannel={selectedChannel}
            selectedRating={selectedRating}
            selectedApproval={selectedApproval}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onListingChange={setSelectedListing}
            onChannelChange={setSelectedChannel}
            onRatingChange={setSelectedRating}
            onApprovalChange={setSelectedApproval}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
            onReset={handleResetFilters}
          />
        </section>

        {/* Reviews Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Guest Reviews
              <span className="ml-2 text-sm font-normal text-slate-500">
                ({reviews.length} reviews)
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-slate-500">Loading reviews...</p>
              </div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
              <svg
                className="w-16 h-16 text-slate-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <p className="text-slate-500 text-lg mb-2">No reviews found</p>
              <p className="text-slate-400 text-sm">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onToggleApproval={handleToggleApproval}
                  isUpdating={updatingIds.has(review.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
