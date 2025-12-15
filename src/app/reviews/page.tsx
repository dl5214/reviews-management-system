"use client";

import { useState, useEffect } from "react";
import { NormalizedReview } from "@/types/review";
import { StarRating } from "@/components/dashboard/StarRating";
import Link from "next/link";

interface PublicReviewsResponse {
  status: string;
  result: NormalizedReview[];
}

export default function PublicReviewsPage() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status
    const checkLogin = () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("isLoggedIn="));
      setIsLoggedIn(cookie?.split("=")[1] === "true");
    };
    checkLogin();

    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews/public");
        const data: PublicReviewsResponse = await res.json();
        setReviews(data.result);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Group reviews by property
  const reviewsByProperty = reviews.reduce(
    (acc, review) => {
      const key = review.listingId;
      if (!acc[key]) {
        acc[key] = {
          listingId: review.listingId,
          listingName: review.listingName,
          reviews: [],
        };
      }
      acc[key].reviews.push(review);
      return acc;
    },
    {} as Record<
      string,
      {
        listingId: string;
        listingName: string;
        reviews: NormalizedReview[];
      }
    >
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Calculate overall stats
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.averageRating || 0), 0) /
        reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-base sm:text-lg">FL</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="font-bold text-xl text-slate-800">
                  Flex Living
                </span>
                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                  Demo
                </span>
              </div>
            </Link>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to</span> Dashboard
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to</span> Home
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Guest Reviews
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-8">
            Hear what our guests have to say about their stay with Flex Living.
            Real reviews from real guests.
          </p>
          {!loading && reviews.length > 0 && (
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">
                  {avgRating.toFixed(1)}
                </span>
                <StarRating rating={avgRating} size="lg" />
              </div>
              <div className="w-px h-8 bg-white/30" />
              <span className="text-teal-100">
                Based on {reviews.length} reviews
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
              <p className="text-slate-500">Loading reviews...</p>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
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
            <p className="text-slate-500 text-lg">No reviews available yet</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.values(reviewsByProperty).map((property) => (
              <div key={property.listingId}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Link
                      href={`/property/${property.listingId}`}
                      className="text-xl font-bold text-slate-800 hover:text-teal-600 transition-colors"
                    >
                      {property.listingName}
                    </Link>
                    <p className="text-sm text-slate-500 mt-1">
                      {property.reviews.length} review
                      {property.reviews.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <Link
                    href={`/property/${property.listingId}`}
                    className="px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg font-medium transition-colors"
                  >
                    View Property →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white p-6 rounded-xl border border-slate-200 hover:border-teal-200 hover:shadow-sm transition-all"
                    >
                      {/* Guest Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-700 font-semibold">
                            {review.guestName?.charAt(0).toUpperCase() || "G"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">
                            {review.guestName || "Anonymous Guest"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatDate(review.submittedAt)} ·{" "}
                            {review.channel && (
                              <span className="capitalize">
                                via {review.channel}
                              </span>
                            )}
                          </p>
                        </div>
                        {review.averageRating && (
                          <StarRating rating={review.averageRating} size="sm" />
                        )}
                      </div>

                      {/* Review Text */}
                      <p className="text-slate-600 leading-relaxed">
                        &ldquo;{review.publicReview}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">FL</span>
              </div>
              <span className="font-bold text-xl text-white">Flex Living</span>
            </div>
            <p className="text-slate-400 text-sm">
              Demo Version · © 2025 Flex Living. For demonstration purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
