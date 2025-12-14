import { NextResponse } from "next/server";
import {
  toggleReviewApproval,
  setReviewApproval,
  approveReviews,
  unapproveReviews,
} from "@/lib/store";

// Toggle single review approval
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reviewId, approved } = body;

    if (typeof reviewId !== "number") {
      return NextResponse.json(
        { status: "error", message: "reviewId must be a number" },
        { status: 400 }
      );
    }

    let newStatus: boolean;

    if (typeof approved === "boolean") {
      // Set specific approval status
      setReviewApproval(reviewId, approved);
      newStatus = approved;
    } else {
      // Toggle approval status
      newStatus = toggleReviewApproval(reviewId);
    }

    return NextResponse.json({
      status: "success",
      result: {
        reviewId,
        isApproved: newStatus,
      },
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request body" },
      { status: 400 }
    );
  }
}

// Bulk approve/unapprove reviews
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { reviewIds, approved } = body;

    if (!Array.isArray(reviewIds)) {
      return NextResponse.json(
        { status: "error", message: "reviewIds must be an array" },
        { status: 400 }
      );
    }

    if (typeof approved !== "boolean") {
      return NextResponse.json(
        { status: "error", message: "approved must be a boolean" },
        { status: 400 }
      );
    }

    if (approved) {
      approveReviews(reviewIds);
    } else {
      unapproveReviews(reviewIds);
    }

    return NextResponse.json({
      status: "success",
      result: {
        reviewIds,
        isApproved: approved,
      },
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request body" },
      { status: 400 }
    );
  }
}

