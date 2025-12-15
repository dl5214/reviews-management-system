// Raw review from Hostaway API
export interface HostawayReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayReview {
  id: number;
  type: "guest-to-host" | "host-to-guest";
  status: "published" | "pending" | "expired";
  rating: number | null;
  publicReview: string;
  privateReview?: string;
  reviewCategory: HostawayReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  listingId?: number;
  channelId?: number;
  channelName?: string;
}

export type ApprovalStatus = "approved" | "pending" | "rejected";

// Normalized review for frontend consumption
export interface NormalizedReview {
  id: number;
  type: "guest-to-host" | "host-to-guest";
  status: "published" | "pending" | "expired";
  rating: number | null;
  averageRating: number | null;
  publicReview: string;
  categories: {
    cleanliness?: number;
    communication?: number;
    checkIn?: number;
    accuracy?: number;
    location?: number;
    value?: number;
    overall?: number;
    respectHouseRules?: number;
  };
  submittedAt: string;
  guestName: string;
  listingId: string;
  listingName: string;
  channel: string;
  approvalStatus: ApprovalStatus;
}

// Listing summary for dashboard
export interface ListingSummary {
  listingId: string;
  listingName: string;
  totalReviews: number;
  averageRating: number;
  approvedCount: number;
}

// Filter options
export interface ReviewFilters {
  listingId?: string;
  channel?: string;
  minRating?: number;
  maxRating?: number;
  dateFrom?: string;
  dateTo?: string;
  type?: "guest-to-host" | "host-to-guest";
  isApproved?: boolean;
}

export type SortField = "submittedAt" | "rating" | "guestName" | "listingName";
export type SortOrder = "asc" | "desc";

