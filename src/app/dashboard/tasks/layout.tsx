"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch("/api/reviews/hostaway?type=guest-to-host&_t=" + Date.now());
        const data = await res.json();
        const pending = data.result?.filter((r: { approvalStatus: string }) => r.approvalStatus === "pending").length || 0;
        setPendingCount(pending);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPending();

    const handleFocus = () => fetchPending();
    const handleReviewUpdate = () => fetchPending();
    
    window.addEventListener("focus", handleFocus);
    window.addEventListener("reviewUpdated", handleReviewUpdate);
    
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("reviewUpdated", handleReviewUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Title */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/dashboard" className="w-9 h-9 sm:w-10 sm:h-10 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-lg">FL</span>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-lg sm:text-xl text-slate-800">Review Tasks</h1>
                  {pendingCount > 0 && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs sm:text-sm font-medium rounded-full">
                      {pendingCount} pending
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">Review and approve guest feedback</p>
              </div>
            </div>

            {/* Right: Back button */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors border border-slate-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

