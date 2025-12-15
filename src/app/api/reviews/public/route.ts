import { NextResponse } from "next/server";
import { mockHostawayReviews } from "@/lib/mock-data";
import { getReviewStatus } from "@/lib/store";
import { NormalizedReview } from "@/types/review";

// Convert Hostaway rating (1-10) to 5-star scale, keep 2 decimal places
function convertRating(rating: number | null): number | null {
  if (rating === null) return null;
  return Math.round((rating / 2) * 100) / 100;
}

// Calculate average from category ratings (convert to 5-scale)
function calculateAverageFromCategories(
  categories: { category: string; rating: number }[]
): number | null {
  const validRatings = categories.filter((c) => c.rating !== null);
  if (validRatings.length === 0) return null;
  const sum = validRatings.reduce((acc, c) => acc + c.rating, 0);
  const avg10 = sum / validRatings.length;
  return Math.round((avg10 / 2) * 100) / 100;
}

// Normalize category name to camelCase key
function normalizeCategoryKey(category: string): string {
  const mapping: Record<string, string> = {
    cleanliness: "cleanliness",
    communication: "communication",
    check_in: "checkIn",
    checkin: "checkIn",
    accuracy: "accuracy",
    location: "location",
    value: "value",
    overall: "overall",
    respect_house_rules: "respectHouseRules",
  };
  return mapping[category.toLowerCase()] || category;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get("listingId");

  // Filter to only approved guest-to-host reviews
  let approvedReviews = mockHostawayReviews.filter(
    (review) =>
      getReviewStatus(review.id) === "approved" &&
      review.type === "guest-to-host" &&
      review.status === "published"
  );

  // Filter by listing if specified
  if (listingId) {
    approvedReviews = approvedReviews.filter(
      (review) => review.listingId?.toString() === listingId
    );
  }

  // Normalize for public consumption
  const publicReviews: NormalizedReview[] = approvedReviews.map((review) => {
    const categories: NormalizedReview["categories"] = {};

    review.reviewCategory.forEach((cat) => {
      const key = normalizeCategoryKey(cat.category);
      const convertedRating = convertRating(cat.rating);
      if (convertedRating !== null) {
        (categories as Record<string, number>)[key] = convertedRating;
      }
    });

    // Calculate average rating from categories (10-scale)
    let averageRating: number | null = null;
    if (review.rating !== null) {
      averageRating = review.rating;
    } else {
      averageRating = calculateAverageFromCategories(review.reviewCategory);
    }

    return {
      id: review.id,
      type: review.type,
      status: review.status,
      rating: review.rating,
      averageRating,
      publicReview: review.publicReview,
      categories,
      submittedAt: review.submittedAt,
      guestName: review.guestName,
      listingId: review.listingId?.toString() || "unknown",
      listingName: review.listingName,
      channel: review.channelName || "Direct",
      approvalStatus: "approved",
    };
  });

  // Sort by date (newest first)
  publicReviews.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return NextResponse.json({
    status: "success",
    result: publicReviews,
    meta: { total: publicReviews.length },
  });
}
