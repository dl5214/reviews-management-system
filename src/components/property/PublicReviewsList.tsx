"use client";

import { useState, useEffect } from "react";
import { NormalizedReview } from "@/types/review";
import Link from "next/link";

interface Property {
  id: string;
  name: string;
  location: string;
}

interface PublicReviewsListProps {
  properties: Property[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return null;
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-slate-600">{rating.toFixed(1)}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: NormalizedReview }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-lg">
            {review.guestName.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h4 className="font-semibold text-slate-800">{review.guestName}</h4>
              <p className="text-sm text-slate-500">{formatDate(review.submittedAt)}</p>
            </div>
            <StarRating rating={review.averageRating} />
          </div>
          <p className="text-slate-600 leading-relaxed">{review.publicReview}</p>
        </div>
      </div>
    </div>
  );
}

function PropertySection({ property, reviews }: { property: Property; reviews: NormalizedReview[] }) {
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.averageRating || 0), 0) / reviews.length
    : 0;

  if (reviews.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href={`/property/${property.id}`} className="group">
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              {property.name}
            </h2>
          </Link>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-slate-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {property.location}
            </span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-slate-700">{avgRating.toFixed(1)}</span>
              <span className="text-sm text-slate-500">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>
        <Link
          href={`/property/${property.id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          View Property
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}

export function PublicReviewsList({ properties }: PublicReviewsListProps) {
  const [reviewsByProperty, setReviewsByProperty] = useState<Record<string, NormalizedReview[]>>({});
  const [loading, setLoading] = useState(true);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await fetch("/api/reviews/public");
        const data = await res.json();
        const reviews: NormalizedReview[] = data.result || [];

        // Group by property
        const grouped: Record<string, NormalizedReview[]> = {};
        reviews.forEach((review) => {
          if (!grouped[review.listingId]) {
            grouped[review.listingId] = [];
          }
          grouped[review.listingId].push(review);
        });

        setReviewsByProperty(grouped);
        setTotalReviews(reviews.length);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-slate-500">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (totalReviews === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
        <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <p className="text-slate-500 text-lg mb-2">No reviews yet</p>
        <p className="text-slate-400 text-sm">Check back soon for guest reviews</p>
      </div>
    );
  }

  // Calculate overall stats
  const allReviews = Object.values(reviewsByProperty).flat();
  const overallAvg = allReviews.reduce((sum, r) => sum + (r.averageRating || 0), 0) / allReviews.length;

  return (
    <div>
      {/* Summary Stats */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-3xl font-bold text-slate-800">{overallAvg.toFixed(1)}</span>
            </div>
            <p className="text-sm text-slate-500">Average Rating</p>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800 mb-1">{totalReviews}</div>
            <p className="text-sm text-slate-500">Total Reviews</p>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800 mb-1">
              {Object.keys(reviewsByProperty).length}
            </div>
            <p className="text-sm text-slate-500">Properties</p>
          </div>
        </div>
      </div>

      {/* Reviews by Property */}
      {properties.map((property) => (
        <PropertySection
          key={property.id}
          property={property}
          reviews={reviewsByProperty[property.id] || []}
        />
      ))}
    </div>
  );
}

