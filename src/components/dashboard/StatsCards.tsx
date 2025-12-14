"use client";

import { NormalizedReview } from "@/types/review";

interface StatsCardsProps {
  reviews: NormalizedReview[];
}

export function StatsCards({ reviews }: StatsCardsProps) {
  const totalReviews = reviews.length;
  const approvedCount = reviews.filter((r) => r.isApproved).length;
  const pendingCount = totalReviews - approvedCount;

  const reviewsWithRating = reviews.filter((r) => r.averageRating !== null);
  const averageRating =
    reviewsWithRating.length > 0
      ? reviewsWithRating.reduce((sum, r) => sum + (r.averageRating || 0), 0) /
        reviewsWithRating.length
      : 0;

  const fiveStarCount = reviews.filter((r) => r.averageRating === 5).length;
  const fiveStarPercentage =
    totalReviews > 0 ? (fiveStarCount / totalReviews) * 100 : 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter(
      (r) =>
        r.averageRating !== null &&
        r.averageRating >= rating &&
        r.averageRating < rating + 1
    ).length;
    return { rating, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 };
  });

  const stats = [
    {
      label: "Total Reviews",
      value: totalReviews,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      ),
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Average Rating",
      value: averageRating.toFixed(1),
      suffix: "/ 5",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Approved",
      value: approvedCount,
      suffix: `/ ${totalReviews}`,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Stats Cards - Left Side (2/3) */}
      <div className="grid grid-cols-2 gap-4 lg:w-2/3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl ${stat.color}`}>{stat.icon}</div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-800">
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="text-sm text-slate-400">{stat.suffix}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rating Distribution - Right Side (1/3) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm lg:w-1/3">
        <h3 className="text-sm font-medium text-slate-500 mb-4">
          Rating Distribution
        </h3>
        <div className="space-y-2.5">
          {ratingDistribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-3">
              {/* Rating label */}
              <div className="flex items-center gap-1 w-8 shrink-0">
                <span className="text-sm font-medium text-slate-600">
                  {item.rating}
                </span>
                <svg
                  className="w-3.5 h-3.5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              {/* Progress bar */}
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              {/* Count */}
              <span className="text-sm text-slate-500 w-6 text-right tabular-nums">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

