"use client";

import { useState, useEffect } from "react";
import type { NormalizedReview } from "@/types/review";
import { StarRating } from "@/components/dashboard/StarRating";

interface PropertyReviewsProps {
  listingId: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ReviewItem({ review }: { review: NormalizedReview }) {
  return (
    <div className="py-6 border-b border-slate-100 last:border-b-0">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-200/50">
          <span className="text-white font-semibold text-lg">
            {review.guestName.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Guest info and rating */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <div>
              <h4 className="font-semibold text-slate-800">{review.guestName}</h4>
              <p className="text-sm text-slate-500">{formatDate(review.submittedAt)}</p>
            </div>
            <StarRating rating={review.averageRating} size="md" />
          </div>

          {/* Review text */}
          <p className="text-slate-600 leading-relaxed">{review.publicReview}</p>

          {/* Category badges */}
          {Object.keys(review.categories).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(review.categories)
                .filter(([key]) =>
                  ["cleanliness", "communication", "respectHouseRules"].includes(key)
                )
                .map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full text-xs"
                  >
                    <span className="text-slate-500 capitalize">
                      {key === "respectHouseRules" ? "House Rules" : key}
                    </span>
                    <span className="font-semibold text-slate-700">{value}</span>
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PropertyReviews({ listingId }: PropertyReviewsProps) {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/public?listingId=${listingId}`);
        const data = await res.json();
        setReviews(data.result || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [listingId]);

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="w-8 h-8 border-3 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  // Calculate average rating
  const reviewsWithRating = reviews.filter((r) => r.averageRating !== null);
  const averageRating =
    reviewsWithRating.length > 0
      ? reviewsWithRating.reduce((sum, r) => sum + (r.averageRating || 0), 0) /
        reviewsWithRating.length
      : 0;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              Guest Reviews
            </h2>
            <div className="flex items-center gap-3">
              <StarRating rating={averageRating} size="lg" />
              <span className="text-slate-500">
                · {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Rating breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-slate-50 rounded-2xl">
          {[
            { key: "cleanliness", label: "Cleanliness", icon: "✨" },
            { key: "communication", label: "Communication", icon: "💬" },
            { key: "respectHouseRules", label: "House Rules", icon: "📋" },
          ].map(({ key, label, icon }) => {
            const reviewsWithCategory = reviews.filter(
              (r) => r.categories[key as keyof typeof r.categories]
            );
            const avg =
              reviewsWithCategory.length > 0
                ? reviewsWithCategory.reduce(
                    (sum, r) =>
                      sum + (r.categories[key as keyof typeof r.categories] || 0),
                    0
                  ) / reviewsWithCategory.length
                : 0;

            return (
              <div key={key} className="text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-xl font-bold text-slate-800">
                  {avg.toFixed(1)}
                </div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            );
          })}
        </div>

        {/* Reviews list */}
        <div className="divide-y divide-slate-100">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
