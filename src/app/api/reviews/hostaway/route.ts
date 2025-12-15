import { NextResponse } from "next/server";
import { mockHostawayReviews, getUniqueListings, getUniqueChannels } from "@/lib/mock-data";
import { getReviewStatus } from "@/lib/store";
import { HostawayReview, NormalizedReview } from "@/types/review";

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

// Keep Hostaway rating as-is (1-10 scale)
function convertRating(rating: number | null): number | null {
  if (rating === null) return null;
  return Math.round(rating * 10) / 10; // Round to 1 decimal, keep 10-scale
}

// Calculate average from category ratings (keep 10-scale)
function calculateAverageFromCategories(
  categories: { category: string; rating: number }[]
): number | null {
  const validRatings = categories.filter((c) => c.rating !== null);
  if (validRatings.length === 0) return null;
  const sum = validRatings.reduce((acc, c) => acc + c.rating, 0);
  return Math.round((sum / validRatings.length) * 10) / 10; // Keep 10-scale
}

// Normalize a single Hostaway review
function normalizeReview(review: HostawayReview): NormalizedReview {
  const categories: NormalizedReview["categories"] = {};

  review.reviewCategory.forEach((cat) => {
    const key = normalizeCategoryKey(cat.category);
    const convertedRating = convertRating(cat.rating);
    if (convertedRating !== null) {
      (categories as Record<string, number>)[key] = convertedRating;
    }
  });

  // Calculate average rating
  let averageRating: number | null = null;
  if (review.rating !== null) {
    averageRating = review.rating; // Already in 1-5 scale in our mock
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
    approvalStatus: getReviewStatus(review.id),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse filter parameters
  const listingId = searchParams.get("listingId");
  const channel = searchParams.get("channel");
  const minRating = searchParams.get("minRating");
  const maxRating = searchParams.get("maxRating");
  const type = searchParams.get("type") as "guest-to-host" | "host-to-guest" | null;
  const sortBy = searchParams.get("sortBy") || "submittedAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  // Filter reviews
  let filteredReviews = mockHostawayReviews.filter((review) => {
    // Only show guest-to-host reviews by default for the dashboard
    if (type) {
      if (review.type !== type) return false;
    }

    if (listingId && review.listingId?.toString() !== listingId) {
      return false;
    }

    if (channel && review.channelName !== channel) {
      return false;
    }

    if (minRating && review.rating !== null && review.rating < parseFloat(minRating)) {
      return false;
    }

    if (maxRating && review.rating !== null && review.rating > parseFloat(maxRating)) {
      return false;
    }

    return true;
  });

  // Normalize reviews
  const normalizedReviews = filteredReviews.map(normalizeReview);

  // Sort reviews
  normalizedReviews.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "submittedAt":
        comparison = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        break;
      case "rating":
        const ratingA = a.averageRating ?? 0;
        const ratingB = b.averageRating ?? 0;
        comparison = ratingA - ratingB;
        break;
      case "guestName":
        comparison = a.guestName.localeCompare(b.guestName);
        break;
      case "listingName":
        comparison = a.listingName.localeCompare(b.listingName);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });

  // Get metadata
  const listings = getUniqueListings();
  const channels = getUniqueChannels();

  return NextResponse.json({
    status: "success",
    result: normalizedReviews,
    meta: {
      total: normalizedReviews.length,
      listings,
      channels,
    },
  });
}
