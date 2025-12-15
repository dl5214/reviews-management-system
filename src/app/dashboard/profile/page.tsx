"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NormalizedReview } from "@/types/review";

export default function ProfilePage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalReviews: 0,
    totalProperties: 0,
    totalChannels: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    avgRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/reviews/hostaway?type=guest-to-host");
        const data = await res.json();
        const reviews: NormalizedReview[] = data.result || [];

        const properties = new Set(reviews.map((r) => r.listingId));
        const channels = new Set(reviews.map((r) => r.channel));
        const withRating = reviews.filter((r) => r.averageRating !== null);
        const avgRating = withRating.length > 0
          ? withRating.reduce((sum, r) => sum + (r.averageRating || 0), 0) / withRating.length
          : 0;

        setStats({
          totalReviews: reviews.length,
          totalProperties: properties.size,
          totalChannels: channels.size,
          pendingCount: reviews.filter((r) => r.approvalStatus === "pending").length,
          approvedCount: reviews.filter((r) => r.approvalStatus === "approved").length,
          rejectedCount: reviews.filter((r) => r.approvalStatus === "rejected").length,
          avgRating,
        });
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    document.cookie = "isLoggedIn=; path=/; max-age=0";
    document.cookie = "userName=; path=/; max-age=0";
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
          <p className="text-slate-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-teal-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">D</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">demo</h1>
            <p className="text-slate-500 text-sm">Platform Administrator</p>
          </div>
        </div>

        {/* Account Info */}
        <div className="space-y-0">
          {/* Username */}
          <div className="flex items-center justify-between py-4 border-t border-slate-100">
            <span className="text-slate-600">Username</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-800">demo</span>
              <button
                onClick={() => alert("This feature is disabled in demo mode.")}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between py-4 border-t border-slate-100">
            <span className="text-slate-600">Email</span>
            <span className="font-medium text-slate-800">demo@flexliving.com</span>
          </div>

          {/* Role */}
          <div className="flex items-center justify-between py-4 border-t border-slate-100">
            <span className="text-slate-600">Role</span>
            <span className="font-medium text-slate-800">Platform Administrator</span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-4 border-t border-slate-100">
            <span className="text-slate-600">Account Status</span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded">Active</span>
          </div>

          {/* Password */}
          <div className="flex items-center justify-between py-4 border-t border-slate-100">
            <span className="text-slate-600">Password</span>
            <button
              onClick={() => alert("This feature is disabled in demo mode.")}
              className="text-sm text-teal-600 hover:text-teal-700"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="bg-white rounded-xl border border-teal-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Overview</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-800">{stats.totalReviews}</p>
            <p className="text-sm text-slate-500">Reviews</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-800">{stats.totalProperties}</p>
            <p className="text-sm text-slate-500">Properties</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-800">{stats.totalChannels}</p>
            <p className="text-sm text-slate-500">Channels</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-800">{stats.avgRating.toFixed(2)}</p>
            <p className="text-sm text-slate-500">Avg Rating</p>
          </div>
        </div>

        {/* Status breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Approved</span>
            <span className="font-medium text-emerald-600">{stats.approvedCount}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500"
              style={{ width: stats.totalReviews > 0 ? `${(stats.approvedCount / stats.totalReviews) * 100}%` : '0%' }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Pending</span>
            <span className="font-medium text-amber-600">{stats.pendingCount}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500"
              style={{ width: stats.totalReviews > 0 ? `${(stats.pendingCount / stats.totalReviews) * 100}%` : '0%' }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Rejected</span>
            <span className="font-medium text-rose-600">{stats.rejectedCount}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500"
              style={{ width: stats.totalReviews > 0 ? `${(stats.rejectedCount / stats.totalReviews) * 100}%` : '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl border border-teal-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Links</h2>
        
        <div className="space-y-2">
          <Link
            href="/dashboard/tasks"
            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="font-medium text-slate-700">Review Tasks</span>
            </div>
            {stats.pendingCount > 0 && (
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded">
                {stats.pendingCount} pending
              </span>
            )}
          </Link>

          <Link
            href="/reviews"
            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-medium text-slate-700">Public Reviews Page</span>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-4 border border-teal-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>

        {/* Demo notice */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Demo account for demonstration purposes
        </p>
      </div>
    </div>
  );
}
