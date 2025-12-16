"use client";

import { useState, useEffect } from "react";
import type { NormalizedReview } from "@/types/review";

interface PropertyReviewsProps {
  listingId: string;
}

function formatMonth(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

// Star rating display
function Stars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const roundUp = rating % 1 >= 0.75;
  const displayFull = roundUp ? fullStars + 1 : fullStars;
  const displayHalf = !roundUp && hasHalf;
  const empty = 5 - displayFull - (displayHalf ? 1 : 0);

  return (
    <span className="inline-flex">
      {Array.from({ length: displayFull }).map((_, i) => (
        <span key={`full-${i}`} className="text-teal-700">★</span>
      ))}
      {displayHalf && <span className="text-teal-700">★</span>}
      {Array.from({ length: Math.max(0, empty) }).map((_, i) => (
        <span key={`empty-${i}`} className="text-slate-300">☆</span>
      ))}
    </span>
  );
}

function ReviewItem({ review }: { review: NormalizedReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.publicReview.length > 180;
  const displayText = expanded || !isLong 
    ? review.publicReview 
    : review.publicReview.slice(0, 180) + "...";

  return (
    <div className="py-5 border-b border-slate-100 last:border-b-0">
      {/* Header: Stars · Name · Date */}
      <div className="flex items-center gap-2 mb-2 text-sm">
        <Stars rating={review.averageRating || 5} />
        <span className="text-slate-400">·</span>
        <span className="font-medium text-slate-800">{review.guestName}</span>
        <span className="text-slate-400">·</span>
        <span className="text-slate-600">{formatMonth(review.submittedAt)}</span>
      </div>

      {/* Review Content */}
      <p className="text-slate-600 leading-relaxed">{displayText}</p>
      
      {isLong && !expanded && (
        <button 
          onClick={() => setExpanded(true)}
          className="text-slate-800 underline text-sm mt-2 font-medium"
        >
          Show more
        </button>
      )}
    </div>
  );
}

export function PropertyReviews({ listingId }: PropertyReviewsProps) {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

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
      <div className="py-8 flex justify-center">
        <div className="w-6 h-6 border-2 border-teal-200 border-t-teal-700 rounded-full animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold text-teal-800 mb-4">Reviews</h2>
        <p className="text-slate-500">No approved reviews yet</p>
      </div>
    );
  }

  // Calculate average rating
  const reviewsWithRating = reviews.filter((r) => r.averageRating !== null);
  const averageRating =
    reviewsWithRating.length > 0
      ? reviewsWithRating.reduce((sum, r) => sum + (r.averageRating || 0), 0) /
        reviewsWithRating.length
      : 0;

  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  return (
    <div className="mb-8">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-teal-800">Reviews</h2>
        <span className="text-amber-400 text-xl">★</span>
        <span className="font-semibold text-slate-800">{averageRating.toFixed(2)}</span>
        <span className="text-slate-500">({reviews.length})</span>
      </div>

      {/* Reviews list */}
      <div>
        {displayedReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>

      {/* Show all button */}
      {reviews.length > 5 && !showAll && (
        <button 
          onClick={() => setShowAll(true)}
          className="mt-6 px-5 py-2.5 border border-slate-300 rounded-full text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          Show all {reviews.length} reviews
        </button>
      )}
    </div>
  );
}
