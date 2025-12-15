// In-memory store for review approval status
// In production, this would be a database

export type ReviewStatus = "approved" | "pending" | "rejected";

// Extend global to persist data across hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var reviewStatuses: Map<number, ReviewStatus> | undefined;
}

// Use global variable to persist across hot reloads
if (!global.reviewStatuses) {
  global.reviewStatuses = new Map<number, ReviewStatus>();
}

const reviewStatuses = global.reviewStatuses;

export function getReviewStatus(reviewId: number): ReviewStatus {
  return reviewStatuses.get(reviewId) || "pending";
}

export function setReviewStatus(reviewId: number, status: ReviewStatus): void {
  if (status === "pending") {
    reviewStatuses.delete(reviewId);
  } else {
    reviewStatuses.set(reviewId, status);
  }
}

export function getReviewsByStatus(status: ReviewStatus): number[] {
  if (status === "pending") {
    // Pending means not in the map
    return [];
  }
  return Array.from(reviewStatuses.entries())
    .filter(([, s]) => s === status)
    .map(([id]) => id);
}

export function getApprovedReviewIds(): number[] {
  return Array.from(reviewStatuses.entries())
    .filter(([, status]) => status === "approved")
    .map(([id]) => id);
}

export function isReviewApproved(reviewId: number): boolean {
  return reviewStatuses.get(reviewId) === "approved";
}

// For backwards compatibility
export function toggleReviewApproval(reviewId: number): boolean {
  const current = getReviewStatus(reviewId);
  if (current === "approved") {
    setReviewStatus(reviewId, "pending");
    return false;
  } else {
    setReviewStatus(reviewId, "approved");
    return true;
  }
}

// Get all statuses for multiple reviews
export function getReviewStatuses(reviewIds: number[]): Map<number, ReviewStatus> {
  const result = new Map<number, ReviewStatus>();
  reviewIds.forEach((id) => {
    result.set(id, getReviewStatus(id));
  });
  return result;
}
