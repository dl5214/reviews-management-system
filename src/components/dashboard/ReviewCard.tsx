"use client";

import { useState, useRef, useEffect } from "react";
import { NormalizedReview, ApprovalStatus } from "@/types/review";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
  review: NormalizedReview;
  onUpdateStatus: (reviewId: number, status: ApprovalStatus) => void;
  isUpdating?: boolean;
}

function getChannelColor(channel: string): string {
  const colors: Record<string, string> = {
    Airbnb: "bg-rose-100 text-rose-700 border-rose-200",
    "Booking.com": "bg-blue-100 text-blue-700 border-blue-200",
    VRBO: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Direct: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return colors[channel] || colors.Direct;
}

function getStatusStyle(status: ApprovalStatus): { bg: string; text: string; label: string } {
  switch (status) {
    case "approved":
      return { bg: "bg-emerald-100", text: "text-emerald-700", label: "Approved" };
    case "rejected":
      return { bg: "bg-rose-100", text: "text-rose-700", label: "Rejected" };
    default:
      return { bg: "bg-amber-100", text: "text-amber-700", label: "Pending" };
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

function formatPropertyName(listingName: string): string {
  const prefix = "Flex Living - ";
  if (listingName.startsWith(prefix)) {
    return listingName.slice(prefix.length);
  }
  return listingName;
}

function StatusDropdown({
  currentStatus,
  onStatusChange,
  isUpdating,
}: {
  currentStatus: ApprovalStatus;
  onStatusChange: (status: ApprovalStatus) => void;
  isUpdating?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 130; // Approximate height of dropdown
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < dropdownHeight);
    }
  }, [isOpen]);

  const statusStyle = getStatusStyle(currentStatus);
  const statuses: { value: ApprovalStatus; label: string; color: string }[] = [
    { value: "pending", label: "Pending", color: "text-amber-600" },
    { value: "approved", label: "Approved", color: "text-emerald-600" },
    { value: "rejected", label: "Rejected", color: "text-rose-600" },
  ];

  if (isUpdating) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5">
        <svg className="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative z-20">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusStyle.bg} ${statusStyle.text} hover:opacity-80`}
      >
        {statusStyle.label}
        <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute right-0 ${dropUp ? 'bottom-full mb-1' : 'mt-1'} w-36 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50`}>
          {statuses.map((status, index) => (
            <button
              key={status.value}
              onClick={() => {
                onStatusChange(status.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${
                currentStatus === status.value ? "font-medium" : ""
              } ${status.color} ${index < statuses.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              {currentStatus === status.value && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span className={currentStatus === status.value ? "" : "ml-6"}>{status.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ReviewCard({
  review,
  onUpdateStatus,
  isUpdating,
}: ReviewCardProps) {
  const categoryLabels: Record<string, string> = {
    cleanliness: "Cleanliness",
    communication: "Communication",
    respectHouseRules: "House Rules",
  };

  const categoryEntries = Object.entries(review.categories).filter(
    ([key]) => categoryLabels[key]
  );

  return (
    <div
      className={`relative bg-white rounded-2xl border shadow-sm transition-all duration-200 ${
        review.approvalStatus === "approved"
          ? "border-emerald-200"
          : review.approvalStatus === "rejected"
          ? "border-rose-200"
          : "border-slate-200"
      }`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-slate-800">
                {review.guestName}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getChannelColor(
                  review.channel
                )}`}
              >
                {review.channel}
              </span>
            </div>
            <p className="text-sm text-slate-500 truncate">
              {formatPropertyName(review.listingName)}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <StarRating rating={review.averageRating} size="md" />
            <span className="text-xs text-slate-400" title={formatDate(review.submittedAt)}>
              {getRelativeTime(review.submittedAt)}
            </span>
          </div>
        </div>

        {/* Review content */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {review.publicReview}
        </p>

        {/* Category ratings */}
        {categoryEntries.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categoryEntries.map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg"
              >
                <span className="text-xs text-slate-500">
                  {categoryLabels[key]}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {value.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Footer with status dropdown */}
        <div className="flex items-center justify-end">
          <StatusDropdown
            currentStatus={review.approvalStatus}
            onStatusChange={(status) => onUpdateStatus(review.id, status)}
            isUpdating={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}
