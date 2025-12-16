"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NormalizedReview } from "@/types/review";

interface ChannelInfo {
  channel: string;
  reviewCount: number;
  avgRating: number;
  pendingCount: number;
  approvedCount: number;
  properties: string[];
}

export default function ChannelsPage() {
  const [channels, setChannels] = useState<ChannelInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/reviews/hostaway?type=guest-to-host");
        const data = await res.json();
        const reviews: NormalizedReview[] = data.result || [];

        // Aggregate by channel
        const channelMap = new Map<string, ChannelInfo>();
        
        reviews.forEach((review) => {
          const ch = review.channel;
          if (!ch) return;
          
          if (!channelMap.has(ch)) {
            channelMap.set(ch, {
              channel: ch,
              reviewCount: 0,
              avgRating: 0,
              pendingCount: 0,
              approvedCount: 0,
              properties: [],
            });
          }
          const info = channelMap.get(ch)!;
          info.reviewCount++;
          if (review.approvalStatus === "pending") info.pendingCount++;
          if (review.approvalStatus === "approved") info.approvedCount++;
          
          const propName = review.listingName.includes(" - ") 
            ? review.listingName.split(" - ").slice(1).join(" - ")
            : review.listingName;
          if (!info.properties.includes(propName)) {
            info.properties.push(propName);
          }
        });

        // Calculate averages
        channelMap.forEach((info, ch) => {
          const chReviews = reviews.filter((r) => r.channel === ch);
          const withRating = chReviews.filter((r) => r.averageRating !== null);
          if (withRating.length > 0) {
            info.avgRating = withRating.reduce((sum, r) => sum + (r.averageRating || 0), 0) / withRating.length;
          }
        });

        setChannels(Array.from(channelMap.values()).sort((a, b) => b.reviewCount - a.reviewCount));
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          <p className="text-slate-500">Loading channels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Channels</h1>
        <p className="text-slate-500">View reviews by booking platform</p>
      </div>

      {/* Channels List */}
      {channels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200">
          <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <p className="text-slate-500 text-lg">No channels found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {channels.map((ch) => (
            <Link
              key={ch.channel}
              href={`/dashboard/channels/${encodeURIComponent(ch.channel)}`}
              className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Channel icon */}
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg">{ch.channel}</h3>
                    <p className="text-sm text-slate-500">
                      {ch.properties.length} {ch.properties.length === 1 ? "property" : "properties"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-slate-800">{ch.reviewCount}</p>
                      <p className="text-slate-500">Reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-amber-600">{ch.pendingCount}</p>
                      <p className="text-slate-500">Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-slate-800">{ch.avgRating.toFixed(2)}</p>
                      <p className="text-slate-500">Avg Rating</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Mobile stats */}
              <div className="flex sm:hidden items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-sm">
                <span className="text-slate-600">{ch.reviewCount} reviews</span>
                <span className="text-amber-600">{ch.pendingCount} pending</span>
                <span className="text-slate-600">★ {ch.avgRating.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
