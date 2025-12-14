// In-memory store for approved reviews
// In production, this would be a database

const approvedReviewIds: Set<number> = new Set();

export function isReviewApproved(reviewId: number): boolean {
  return approvedReviewIds.has(reviewId);
}

export function setReviewApproval(reviewId: number, approved: boolean): void {
  if (approved) {
    approvedReviewIds.add(reviewId);
  } else {
    approvedReviewIds.delete(reviewId);
  }
}

export function getApprovedReviewIds(): number[] {
  return Array.from(approvedReviewIds);
}

export function toggleReviewApproval(reviewId: number): boolean {
  if (approvedReviewIds.has(reviewId)) {
    approvedReviewIds.delete(reviewId);
    return false;
  } else {
    approvedReviewIds.add(reviewId);
    return true;
  }
}

// Bulk operations
export function approveReviews(reviewIds: number[]): void {
  reviewIds.forEach((id) => approvedReviewIds.add(id));
}

export function unapproveReviews(reviewIds: number[]): void {
  reviewIds.forEach((id) => approvedReviewIds.delete(id));
}

