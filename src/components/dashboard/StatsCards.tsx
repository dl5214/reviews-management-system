"use client";

import { NormalizedReview } from "@/types/review";

interface StatsCardsProps {
  reviews: NormalizedReview[];
}

export function StatsCards({ reviews }: StatsCardsProps) {
  const totalReviews = reviews.length;
  const approvedCount = reviews.filter((r) => r.approvalStatus === "approved").length;
  const pendingCount = reviews.filter((r) => r.approvalStatus === "pending").length;
  const rejectedCount = reviews.filter((r) => r.approvalStatus === "rejected").length;

  const reviewsWithRating = reviews.filter((r) => r.averageRating !== null);
  const averageRating =
    reviewsWithRating.length > 0
      ? reviewsWithRating.reduce((sum, r) => sum + (r.averageRating || 0), 0) /
        reviewsWithRating.length
      : 0;

  // Calculate rating distribution (5-scale)
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter(
      (r) =>
        r.averageRating !== null &&
        r.averageRating > rating - 1 &&
        r.averageRating <= rating
    ).length;
    return { rating, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Main Stats Card */}
      <div className="lg:col-span-8 bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-6">
          {/* Total */}
          <div className="text-center">
            <div className="hidden sm:inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl mb-3">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">{totalReviews}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Total</p>
          </div>

          {/* Average Rating */}
          <div className="text-center">
            <div className="hidden sm:inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-3">
              <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">
              {averageRating.toFixed(1)}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Rating</p>
          </div>

          {/* Approved */}
          <div className="text-center">
            <div className="hidden sm:inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-3">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-teal-600">{approvedCount}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Approved</p>
          </div>

          {/* Pending */}
          <div className="text-center">
            <div className="hidden sm:inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-3">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-amber-600">{pendingCount}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Pending</p>
          </div>
        </div>

        {/* Status Bar - Desktop only */}
        {totalReviews > 0 && (
          <div className="hidden sm:block mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
              <span>Status</span>
              <span className="flex-1 text-right">
                {Math.round((approvedCount / totalReviews) * 100)}% approved
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-teal-500 transition-all duration-500"
                style={{ width: `${(approvedCount / totalReviews) * 100}%` }}
              />
              <div 
                className="h-full bg-amber-400 transition-all duration-500"
                style={{ width: `${(pendingCount / totalReviews) * 100}%` }}
              />
              <div 
                className="h-full bg-rose-400 transition-all duration-500"
                style={{ width: `${(rejectedCount / totalReviews) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-teal-500 rounded-full"></span>
                <span>Approved ({approvedCount})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                <span>Pending ({pendingCount})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-rose-400 rounded-full"></span>
                <span>Rejected ({rejectedCount})</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Rating Distribution */}
      <div className="lg:col-span-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 sm:mb-4">
          Rating Distribution
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {ratingDistribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 w-10 sm:w-12 shrink-0">
                <span className="text-xs sm:text-sm font-medium text-slate-700">{item.rating}</span>
                <span className="text-amber-400 text-sm">★</span>
              </div>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm text-slate-500 w-6 sm:w-8 text-center tabular-nums">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
