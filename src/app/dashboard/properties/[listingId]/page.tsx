"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { NormalizedReview, ApprovalStatus } from "@/types/review";
import { ReviewCard } from "@/components/dashboard/ReviewCard";
import { ReviewStatusTabs } from "@/components/dashboard/ReviewStatusTabs";
import { StatsCards } from "@/components/dashboard/StatsCards";

export default function PropertyReviewsPage({ params }: { params: Promise<{ listingId: string }> }) {
  const { listingId } = use(params);
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [propertyName, setPropertyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/reviews/hostaway?type=guest-to-host&listingId=${listingId}`);
        const data = await res.json();
        const allReviews: NormalizedReview[] = data.result || [];
        setReviews(allReviews);
        if (allReviews.length > 0) {
          setPropertyName(allReviews[0].listingName);
        }
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [listingId]);

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
        setReviews((prev) =>
          prev.map((r) =>
            r.id === reviewId ? { ...r, approvalStatus: data.result.approvalStatus } : r
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

  const filteredReviews = statusFilter === "all"
    ? reviews
    : reviews.filter((r) => r.approvalStatus === statusFilter);

  const pendingCount = reviews.filter((r) => r.approvalStatus === "pending").length;
  const approvedCount = reviews.filter((r) => r.approvalStatus === "approved").length;
  const rejectedCount = reviews.filter((r) => r.approvalStatus === "rejected").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          <p className="text-slate-500">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        {/* Left: Property info */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">
            {propertyName.includes(" - ")
                ? propertyName.split(" - ").slice(1).join(" - ")
                : propertyName || `Property ${listingId}`}
          </h1>
          <p className="text-slate-500">{reviews.length} reviews</p>
        </div>

        {/* Right: Back button */}
        <Link
            href="/dashboard/properties"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Properties
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <StatsCards reviews={reviews} />
      </div>

      {/* Status Tabs */}
      <div className="mb-6">
        <ReviewStatusTabs
            value={statusFilter}
            onChange={setStatusFilter}
            counts={{
              all: reviews.length,
              pending: pendingCount,
              approved: approvedCount,
              rejected: rejectedCount,
            }}
        />
      </div>

      {/* Reviews */}
      {filteredReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200">
          <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <p className="text-slate-500 text-lg">No reviews found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
    </div>
  );
}

