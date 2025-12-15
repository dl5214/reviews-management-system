"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { NormalizedReview, ApprovalStatus } from "@/types/review";
import { ReviewCard } from "@/components/dashboard/ReviewCard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { StatsCards } from "@/components/dashboard/StatsCards";

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
  const [allReviews, setAllReviews] = useState<NormalizedReview[]>([]);
  const [listings, setListings] = useState<
    { listingId: number; listingName: string }[]
  >([]);
  const [channels, setChannels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());

  // Filter states
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [currentStatusTab, setCurrentStatusTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [sortOption, setSortOption] = useState("date-desc");

  const fetchReviews = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("type", "guest-to-host");
      // Add cache buster to ensure fresh data
      params.set("_t", Date.now().toString());

      const res = await fetch(`/api/reviews/hostaway?${params.toString()}`);
      const data: ReviewsResponse = await res.json();

      setAllReviews(data.result);
      setListings(data.meta.listings);
      setChannels(data.meta.channels);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
    
    // Refresh data when page gains focus (e.g., returning from tasks page)
    const handleFocus = () => {
      fetchReviews(false);
    };
    
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchReviews]);

  // Client-side filtering and sorting
  const filteredReviews = useMemo(() => {
    let result = [...allReviews];

    // Filter by status tab
    if (currentStatusTab !== "all") {
      result = result.filter((r) => r.approvalStatus === currentStatusTab);
    }

    // Filter by listings
    if (selectedListings.length > 0) {
      result = result.filter((r) => selectedListings.includes(r.listingId));
    }

    // Filter by channels
    if (selectedChannels.length > 0) {
      result = result.filter((r) => selectedChannels.includes(r.channel));
    }

    // Filter by ratings (10-scale, grouped by 2)
    if (selectedRatings.length > 0) {
      result = result.filter(
        (r) =>
          r.averageRating !== null &&
          selectedRatings.some(
            (rating) => r.averageRating! > rating - 2 && r.averageRating! <= rating
          )
      );
    }

    // Sort
    const [sortField, sortOrder] = sortOption.split("-");
    result.sort((a, b) => {
      let comparison = 0;

      if (sortField === "date") {
        comparison =
          new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      } else if (sortField === "rating") {
        const ratingA = a.averageRating ?? 0;
        const ratingB = b.averageRating ?? 0;
        comparison = ratingA - ratingB;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    return result;
  }, [
    allReviews,
    selectedListings,
    selectedChannels,
    selectedRatings,
    currentStatusTab,
    sortOption,
  ]);

  const handleUpdateStatus = async (reviewId: number, status: ApprovalStatus) => {
    setUpdatingIds((prev) => new Set(prev).add(reviewId));

    try {
      const res = await fetch("/api/reviews/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId, status }),
      });

      if (res.ok) {
    const data = await res.json();
        setAllReviews((prev) =>
          prev.map((r) =>
            r.id === reviewId
              ? { ...r, approvalStatus: data.result.approvalStatus }
              : r
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(reviewId);
        return next;
      });
    }
  };

  const handleResetFilters = () => {
    setSelectedListings([]);
    setSelectedChannels([]);
    setSelectedRatings([]);
  };

  // Stats
  const pendingCount = allReviews.filter((r) => r.approvalStatus === "pending").length;
  const approvedCount = allReviews.filter((r) => r.approvalStatus === "approved").length;
  const rejectedCount = allReviews.filter((r) => r.approvalStatus === "rejected").length;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Stats */}
        <section className="mb-6 sm:mb-8">
          <StatsCards reviews={allReviews} />
        </section>

        {/* Status Tabs - Scrollable on mobile */}
        <div className="mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg w-full sm:w-auto sm:inline-grid">
            <button
              onClick={() => setCurrentStatusTab("all")}
              className={`px-2 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors text-center ${
                currentStatusTab === "all"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              All <span className="text-slate-400">{allReviews.length}</span>
            </button>
            <button
              onClick={() => setCurrentStatusTab("pending")}
              className={`px-2 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors text-center ${
                currentStatusTab === "pending"
                  ? "bg-white text-amber-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Pending <span className={currentStatusTab === "pending" ? "text-amber-500" : "text-slate-400"}>{pendingCount}</span>
            </button>
            <button
              onClick={() => setCurrentStatusTab("approved")}
              className={`px-2 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors text-center ${
                currentStatusTab === "approved"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Approved <span className={currentStatusTab === "approved" ? "text-teal-500" : "text-slate-400"}>{approvedCount}</span>
            </button>
            <button
              onClick={() => setCurrentStatusTab("rejected")}
              className={`px-2 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors text-center ${
                currentStatusTab === "rejected"
                  ? "bg-white text-rose-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Rejected <span className={currentStatusTab === "rejected" ? "text-rose-500" : "text-slate-400"}>{rejectedCount}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <section className="mb-6 sm:mb-8">
          <FilterBar
            listings={listings}
            channels={channels}
            selectedListings={selectedListings}
            selectedChannels={selectedChannels}
            selectedRatings={selectedRatings}
            sortOption={sortOption}
            onListingsChange={setSelectedListings}
            onChannelsChange={setSelectedChannels}
            onRatingsChange={setSelectedRatings}
            onSortChange={setSortOption}
            onReset={handleResetFilters}
          />
        </section>

        {/* Reviews */}
        <section>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">
              {currentStatusTab === "all" ? "All Reviews" :
               currentStatusTab === "pending" ? "Pending Reviews" :
               currentStatusTab === "approved" ? "Approved Reviews" : "Rejected Reviews"}
              <span className="ml-2 text-sm font-normal text-slate-500">
                ({filteredReviews.length})
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
                <p className="text-slate-500">Loading reviews...</p>
              </div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white rounded-2xl border border-slate-200">
              <svg className="w-12 sm:w-16 h-12 sm:h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <p className="text-slate-500 text-base sm:text-lg mb-2">No reviews found</p>
              <p className="text-slate-400 text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onUpdateStatus={handleUpdateStatus}
                  isUpdating={updatingIds.has(review.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }
