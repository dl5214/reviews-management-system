"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NormalizedReview } from "@/types/review";

interface PropertyInfo {
  listingId: number;
  listingName: string;
  reviewCount: number;
  avgRating: number;
  pendingCount: number;
  approvedCount: number;
  channels: string[];
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/reviews/hostaway?type=guest-to-host");
        const data = await res.json();
        const reviews: NormalizedReview[] = data.result || [];

        // Aggregate by property
        const propMap = new Map<number, PropertyInfo>();
        
        reviews.forEach((review) => {
          const id = parseInt(review.listingId);
          if (!propMap.has(id)) {
            propMap.set(id, {
              listingId: id,
              listingName: review.listingName,
              reviewCount: 0,
              avgRating: 0,
              pendingCount: 0,
              approvedCount: 0,
              channels: [],
            });
          }
          const prop = propMap.get(id)!;
          prop.reviewCount++;
          if (review.approvalStatus === "pending") prop.pendingCount++;
          if (review.approvalStatus === "approved") prop.approvedCount++;
          if (review.channel && !prop.channels.includes(review.channel)) {
            prop.channels.push(review.channel);
          }
        });

        // Calculate averages
        propMap.forEach((prop, id) => {
          const propReviews = reviews.filter((r) => parseInt(r.listingId) === id);
          const withRating = propReviews.filter((r) => r.averageRating !== null);
          if (withRating.length > 0) {
            prop.avgRating = withRating.reduce((sum, r) => sum + (r.averageRating || 0), 0) / withRating.length;
          }
        });

        setProperties(Array.from(propMap.values()).sort((a, b) => a.listingName.localeCompare(b.listingName)));
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProperties = search.trim()
    ? properties.filter((p) => p.listingName.toLowerCase().includes(search.toLowerCase()))
    : properties;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          <p className="text-slate-500">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Properties</h1>
        <p className="text-slate-500">View reviews by property</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200">
          <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-slate-500 text-lg">No properties found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((prop) => (
            <Link
              key={prop.listingId}
              href={`/dashboard/properties/${prop.listingId}`}
              className="block bg-white rounded-xl border border-slate-200 p-5 hover:border-teal-300 hover:shadow-md transition-all"
            >
              {/* Property name */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                {prop.avgRating > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
                    <span className="text-amber-500">★</span>
                    <span className="text-sm font-medium text-amber-700">{prop.avgRating.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                {prop.listingName.includes(" - ") ? prop.listingName.split(" - ").slice(1).join(" - ") : prop.listingName}
              </h3>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                <span>{prop.reviewCount} reviews</span>
                {prop.pendingCount > 0 && (
                  <span className="text-amber-600">{prop.pendingCount} pending</span>
                )}
              </div>

              {/* Channels */}
              <div className="flex flex-wrap gap-1">
                {prop.channels.map((channel) => (
                  <span
                    key={channel}
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      channel === "Airbnb"
                        ? "bg-rose-100 text-rose-700"
                        : channel === "Booking.com"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

