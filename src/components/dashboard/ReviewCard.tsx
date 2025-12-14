"use client";

import { NormalizedReview } from "@/types/review";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
  review: NormalizedReview;
  onToggleApproval: (reviewId: number) => void;
  isUpdating?: boolean;
}

function getChannelColor(channel: string): string {
  const colors: Record<string, string> = {
    Airbnb: "bg-rose-100 text-rose-700 border-rose-200",
    "Booking.com": "bg-blue-100 text-blue-700 border-blue-200",
    VRBO: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Direct: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return colors[channel] || colors.Direct;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export function ReviewCard({
  review,
  onToggleApproval,
  isUpdating,
}: ReviewCardProps) {
  const categoryLabels: Record<string, string> = {
    cleanliness: "Cleanliness",
    communication: "Communication",
    checkIn: "Check-in",
    accuracy: "Accuracy",
    location: "Location",
    value: "Value",
  };

  const categoryEntries = Object.entries(review.categories).filter(
    ([key]) => categoryLabels[key]
  );

  return (
    <div
      className={`relative bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        review.isApproved
          ? "border-emerald-200 shadow-md shadow-emerald-100/50"
          : "border-slate-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Approved indicator bar */}
      {review.isApproved && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-800 truncate">
                {review.guestName}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getChannelColor(
                  review.channel
                )}`}
              >
                {review.channel}
              </span>
            </div>
            <p className="text-sm text-slate-500 truncate">
              {review.listingName}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <StarRating rating={review.averageRating} size="md" />
            <span className="text-xs text-slate-400" title={formatDate(review.submittedAt)}>
              {getRelativeTime(review.submittedAt)}
            </span>
          </div>
        </div>

        {/* Review content */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {review.publicReview}
        </p>

        {/* Category ratings */}
        {categoryEntries.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categoryEntries.map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg"
              >
                <span className="text-xs text-slate-500">
                  {categoryLabels[key]}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {value.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">ID: {review.id}</span>

          <button
            onClick={() => onToggleApproval(review.id)}
            disabled={isUpdating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              review.isApproved
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isUpdating ? (
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : review.isApproved ? (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Approved
              </>
            ) : (
              <>
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Approve for Website
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

