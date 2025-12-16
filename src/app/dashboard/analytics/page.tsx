"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { NormalizedReview } from "@/types/review";

interface ReviewsResponse {
  status: string;
  result: NormalizedReview[];
}

export default function AnalyticsPage() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("type", "guest-to-host");
      params.set("_t", Date.now().toString());

      const res = await fetch(`/api/reviews/hostaway?${params.toString()}`);
      const data: ReviewsResponse = await res.json();
      setReviews(data.result);
    } catch (error) {
      console.error("Failed to fetch reviews for analytics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const weekly = useMemo(() => {
    const weeklyMap = new Map<
      string,
      { sum: number; count: number; approved: number; pending: number; rejected: number }
    >();

    reviews.forEach((r) => {
      if (r.averageRating === null) return;
      const d = new Date(r.submittedAt);
      const start = startOfWeekUtc(d);
      const key = start.toISOString().slice(0, 10); // yyyy-mm-dd
      const current =
        weeklyMap.get(key) || { sum: 0, count: 0, approved: 0, pending: 0, rejected: 0 };
      current.sum += r.averageRating;
      current.count += 1;
      if (r.approvalStatus === "approved") current.approved += 1;
      else if (r.approvalStatus === "pending") current.pending += 1;
      else if (r.approvalStatus === "rejected") current.rejected += 1;
      weeklyMap.set(key, current);
    });

    return Array.from(weeklyMap.entries())
      .map(([week, { sum, count, approved, pending, rejected }]) => ({
        weekLabel: week,
        avgRating: count > 0 ? sum / count : 0,
        count,
        approved,
        pending,
        rejected,
      }))
      .sort((a, b) => a.weekLabel.localeCompare(b.weekLabel));
  }, [reviews]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-20 sm:pb-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          Analytics
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Weekly rating patterns and the most recent low-scoring reviews across all guest-to-host feedback.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
            <p className="text-slate-500">Loading analytics...</p>
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-base sm:text-lg mb-2">No reviews available</p>
          <p className="text-slate-400 text-sm">Analytics will appear once there are guest reviews.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch lg:min-h-[420px]">
            <div className="lg:w-1/2 flex flex-col h-full">
              <WeeklyRatingChart weekly={weekly} />
            </div>
            <div className="lg:w-1/2 flex flex-col h-full">
              <WeeklyApprovalTable weekly={weekly} />
            </div>
          </div>
          <RecentLowReviews reviews={reviews} />
        </div>
      )}
    </div>
  );
}

interface WeeklyPoint {
  weekLabel: string;
  avgRating: number;
  count: number;
  approved: number;
  pending: number;
  rejected: number;
}

interface AnalyticsReviewsProps {
  reviews: NormalizedReview[];
}

function startOfWeekUtc(date: Date): Date {
  const day = date.getUTCDay(); // 0 = Sun ... 6 = Sat
  const diff = (day + 6) % 7; // Monday as first day
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - diff)
  );
}

function WeeklyRatingChart({ weekly }: { weekly: WeeklyPoint[] }) {
  if (weekly.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <h2 className="text-sm font-semibold text-slate-800 mb-3">
          Weekly Average Rating
        </h2>
        <div className="flex items-center justify-center py-8 text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg flex-1">
          No data for current filters
        </div>
      </div>
    );
  }

  const avgAll = weekly.reduce((sum, w) => sum + w.avgRating, 0) / weekly.length;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-800">
          Weekly Average Rating
        </h3>
        <div className="inline-flex items-center rounded-full bg-transparent p-0.5 text-[10px] w-[132px]" />
      </div>

      <div className="border border-slate-100 rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="divide-y divide-slate-100 overflow-auto flex-1">
          {weekly.map((w) => (
            <div key={w.weekLabel} className="px-3 py-2">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span className="tabular-nums">{w.weekLabel}</span>
                <span className="font-medium text-slate-800 tabular-nums">
                  {w.avgRating.toFixed(1)} ★ ({w.count})
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((w.avgRating / 5) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="tabular-nums">
            {weekly[0].weekLabel} – {weekly[weekly.length - 1].weekLabel}
          </span>
          <span className="font-medium text-slate-800 tabular-nums">Avg {avgAll.toFixed(1)} ★</span>
        </div>
      </div>
    </div>
  );
}

type ApprovalTableMode = "percent" | "count";

interface WeeklyApprovalTableProps {
  weekly?: WeeklyPoint[];
  reviews?: NormalizedReview[];
}

function WeeklyApprovalTable({ weekly, reviews }: WeeklyApprovalTableProps) {
  const [mode, setMode] = useState<ApprovalTableMode>("count");

  // If weekly is not provided but reviews is, compute weekly from reviews
  if (!weekly && reviews) {
    const computedWeekly: WeeklyPoint[] = useMemo(() => {
      const weeklyMap = new Map<
        string,
        { sum: number; count: number; approved: number; pending: number; rejected: number }
      >();

      reviews.forEach((r) => {
        if (r.averageRating === null) return;
        const d = new Date(r.submittedAt);
        const start = startOfWeekUtc(d);
        const key = start.toISOString().slice(0, 10); // yyyy-mm-dd
        const current =
          weeklyMap.get(key) || { sum: 0, count: 0, approved: 0, pending: 0, rejected: 0 };
        current.sum += r.averageRating;
        current.count += 1;
        if (r.approvalStatus === "approved") current.approved += 1;
        else if (r.approvalStatus === "pending") current.pending += 1;
        else if (r.approvalStatus === "rejected") current.rejected += 1;
        weeklyMap.set(key, current);
      });

      return Array.from(weeklyMap.entries())
        .map(([week, { sum, count, approved, pending, rejected }]) => ({
          weekLabel: week,
          avgRating: count > 0 ? sum / count : 0,
          count,
          approved,
          pending,
          rejected,
        }))
        .sort((a, b) => a.weekLabel.localeCompare(b.weekLabel));
    }, [reviews]);

    weekly = computedWeekly;
  }

  if (!weekly || weekly.length === 0) {
    return (
      <div className="mb-6 sm:mb-8 flex flex-col flex-grow">
        <h3 className="text-xs font-semibold text-slate-700 mb-2">
          Weekly Approval Breakdown
        </h3>
        <div className="flex items-center justify-center py-8 text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg flex-grow">
          No data for current filters
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-slate-700">
          Weekly Approval Breakdown
        </h3>
        <div className="inline-flex items-center rounded-full bg-slate-100 p-0.5 text-[10px] w-[132px]">
          <button
            type="button"
            onClick={() => setMode("count")}
            className={`px-2 py-0.5 rounded-full font-medium w-1/2 text-center ${
              mode === "count" ? "bg-teal-600 text-white" : "text-slate-600"
            }`}
          >
            Count
          </button>
          <button
            type="button"
            onClick={() => setMode("percent")}
            className={`px-2 py-0.5 rounded-full font-medium w-1/2 text-center ${
              mode === "percent" ? "bg-teal-600 text-white" : "text-slate-600"
            }`}
          >
            Percent
          </button>
        </div>
      </div>
      <div className="border border-slate-100 rounded-lg overflow-hidden flex-grow">
        <div className="grid grid-cols-4 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 text-center">
          <span>Week</span>
          <span className="text-teal-700">Approved</span>
          <span className="text-amber-700">Pending</span>
          <span className="text-rose-700">Rejected</span>
        </div>
        <div className="divide-y divide-slate-100 overflow-auto flex-1">
          {weekly.map((w) => {
            const total = w.approved + w.pending + w.rejected || 1;
            const approvedPct = (w.approved / total) * 100;
            const pendingPct = (w.pending / total) * 100;
            const rejectedPct = (w.rejected / total) * 100;

            const approvedValue =
              mode === "percent" ? `${approvedPct.toFixed(0)}%` : w.approved;
            const pendingValue =
              mode === "percent" ? `${pendingPct.toFixed(0)}%` : w.pending;
            const rejectedValue =
              mode === "percent" ? `${rejectedPct.toFixed(0)}%` : w.rejected;

            return (
              <div
                key={w.weekLabel}
                className="px-3 py-1.5 grid grid-cols-4 items-center text-[11px] text-slate-600 text-center"
              >
                <span className="truncate">{w.weekLabel.slice(5)}</span>
                <span className="text-teal-700">{approvedValue}</span>
                <span className="text-amber-700">{pendingValue}</span>
                <span className="text-rose-700">{rejectedValue}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RecentLowReviews({ reviews }: AnalyticsReviewsProps) {
  const recentLows = useMemo(
    () =>
      [...reviews]
        .filter((r) => r.averageRating !== null && r.averageRating < 4)
        .sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        )
        .slice(0, 4),
    [reviews]
  );

  return (
    <div className="mt-2">
      <h2 className="text-sm font-semibold text-slate-800 mb-3">
        Recent Low Reviews
      </h2>
      {recentLows.length === 0 ? (
        <p className="text-sm text-slate-500">
          No recent low reviews for current data.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentLows.map((r) => (
            <div
              key={r.id}
              className="border border-slate-200 rounded-lg p-3 bg-slate-50"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>{new Date(r.submittedAt).toLocaleDateString()}</span>
                <span className="text-amber-600 font-semibold">
                  {r.averageRating?.toFixed(1)} ★
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-1">
                {r.guestName}
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {r.listingName.replace(/^Flex Living -\s*/i, "")}
              </p>
              <p className="text-xs text-slate-600 mb-1">{r.channel}</p>
              <div className="flex flex-wrap gap-1 mb-1">
                {Object.entries(r.categories || {})
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-slate-600"
                    >
                      <span className="mr-1 capitalize">
                        {key === "respectHouseRules" ? "House rules" : key}
                      </span>
                      <span className="font-semibold">
                        {typeof value === "number" ? value.toFixed(1) : ""}
                      </span>
                    </span>
                  ))}
              </div>
              <p className="text-sm text-slate-700 line-clamp-3">
                {r.publicReview}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
