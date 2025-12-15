"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { NavTabs } from "@/components/dashboard/NavTabs";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch("/api/reviews/hostaway?type=guest-to-host");
        const data = await res.json();
        const pending = data.result?.filter((r: { approvalStatus: string }) => r.approvalStatus === "pending").length || 0;
        setPendingCount(pending);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPending();

    const handleFocus = () => fetchPending();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleLogout = () => {
    document.cookie = "isLoggedIn=; path=/; max-age=0";
    document.cookie = "userName=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 sm:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-base sm:text-lg">FL</span>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-xl text-slate-800">Flex Living</h1>
                  <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">Demo</span>
                </div>
                <p className="text-xs text-slate-500">Reviews Dashboard</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/dashboard/tasks"
                className="flex items-center justify-center gap-2 h-10 w-40 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Review Tasks
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-xs">{pendingCount}</span>
                )}
              </Link>

              <Link
                href="/reviews"
                className="flex items-center justify-center gap-2 h-10 w-40 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Public Reviews
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 h-10 px-4 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors border border-slate-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>

            {/* Mobile Nav */}
            <div className="flex md:hidden items-center gap-1">
              <Link
                href="/dashboard/tasks"
                className="relative flex items-center justify-center gap-1 w-16 h-8 bg-amber-500 text-white rounded-lg text-xs font-medium"
              >
                Tasks
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-rose-500 rounded-full text-[10px] font-bold flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </Link>
              <Link
                href="/reviews"
                className="flex items-center justify-center w-16 h-8 bg-teal-600 text-white rounded-lg text-xs font-medium"
              >
                Public
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-12 h-8 text-slate-500 hover:bg-slate-100 rounded-lg text-xs font-medium border border-slate-200"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <NavTabs />

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
