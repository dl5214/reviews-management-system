import { NextResponse } from "next/server";
import { setReviewStatus, getReviewStatus, ReviewStatus } from "@/lib/store";

// Update single review status
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reviewId, status } = body;

    if (typeof reviewId !== "number") {
      return NextResponse.json(
        { status: "error", message: "reviewId must be a number" },
        { status: 400 }
      );
    }

    if (!["approved", "pending", "rejected"].includes(status)) {
      return NextResponse.json(
        { status: "error", message: "status must be 'approved', 'pending', or 'rejected'" },
        { status: 400 }
      );
    }

    setReviewStatus(reviewId, status as ReviewStatus);

    return NextResponse.json({
      status: "success",
      result: {
        reviewId,
        approvalStatus: getReviewStatus(reviewId),
      },
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request body" },
      { status: 400 }
    );
  }
}

// Bulk update review statuses
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { reviewIds, status } = body;

    if (!Array.isArray(reviewIds)) {
      return NextResponse.json(
        { status: "error", message: "reviewIds must be an array" },
        { status: 400 }
      );
    }

    if (!["approved", "pending", "rejected"].includes(status)) {
      return NextResponse.json(
        { status: "error", message: "status must be 'approved', 'pending', or 'rejected'" },
        { status: 400 }
      );
    }

    reviewIds.forEach((id: number) => {
      setReviewStatus(id, status as ReviewStatus);
    });

    return NextResponse.json({
      status: "success",
      result: {
        reviewIds,
        approvalStatus: status,
      },
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request body" },
      { status: 400 }
    );
  }
}
