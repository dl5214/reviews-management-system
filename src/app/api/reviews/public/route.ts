import { NextResponse } from "next/server";
import { mockHostawayReviews } from "@/lib/mock-data";
import { getApprovedReviewIds, isReviewApproved } from "@/lib/store";
import { NormalizedReview } from "@/types/review";

// Convert Hostaway rating (1-10) to standard (1-5)
function convertRating(rating: number | null): number | null {
  if (rating === null) return null;
  return Math.round((rating / 10) * 5 * 10) / 10;
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

  // Get approved review IDs
  const approvedIds = getApprovedReviewIds();

  if (approvedIds.length === 0) {
    return NextResponse.json({
      status: "success",
      result: [],
      meta: { total: 0 },
    });
  }

  // Filter to only approved guest-to-host reviews
  let approvedReviews = mockHostawayReviews.filter(
    (review) =>
      isReviewApproved(review.id) &&
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

    return {
      id: review.id,
      type: review.type,
      status: review.status,
      rating: review.rating,
      averageRating: review.rating,
      publicReview: review.publicReview,
      categories,
      submittedAt: review.submittedAt,
      guestName: review.guestName,
      listingId: review.listingId?.toString() || "unknown",
      listingName: review.listingName,
      channel: review.channelName || "Direct",
      isApproved: true,
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

