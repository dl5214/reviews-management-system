"use client";

import { MultiSelect, RatingMultiSelect } from "./MultiSelect";
import { ReviewStatusTabs } from "@/components/dashboard/ReviewStatusTabs";

interface FilterBarProps {
  channels: string[];
  searchTerm: string;
  selectedChannels: string[];
  selectedRatings: number[];
  sortOption: string;
  currentStatusTab: "all" | "pending" | "approved" | "rejected";
  onSearchChange: (value: string) => void;
  onChannelsChange: (values: string[]) => void;
  onRatingsChange: (values: number[]) => void;
  onSortChange: (value: string) => void;
  onStatusTabChange: (status: "all" | "pending" | "approved" | "rejected") => void;
  onReset: () => void;
}

export function FilterBar({
  channels,
  searchTerm,
  selectedChannels,
  selectedRatings,
  sortOption,
  currentStatusTab,
  onSearchChange,
  onChannelsChange,
  onRatingsChange,
  onSortChange,
  onStatusTabChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters =
    searchTerm.length > 0 ||
    selectedChannels.length > 0 ||
    selectedRatings.length > 0;

  const channelOptions = channels.map((c) => ({
    value: c,
    label: c,
  }));

  const sortOptions = [
    { value: "date-desc", label: "Newest" },
    { value: "date-asc", label: "Oldest" },
    { value: "rating-desc", label: "Highest" },
    { value: "rating-asc", label: "Lowest" },
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="font-semibold text-slate-800 text-sm sm:text-base">Search & Filter</h2>
        <button
          onClick={onReset}
          className="text-xs sm:text-sm text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Clear All</span>
          <span className="sm:hidden">Clear</span>
        </button>
      </div>

      {/* Status Tabs */}
      <div className="mb-4">
        <ReviewStatusTabs
            label="Review Status"
            value={currentStatusTab}
            onChange={onStatusTabChange}
            showCounts={false}
        />
      </div>

      {/* Search - Full width on mobile */}
      <div className="mb-4 sm:mb-0 sm:hidden">
        <label className="block text-xs font-medium text-slate-500 mb-1">
          Search
        </label>
        <div className="relative">
          <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by property or guest name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
        {/* Property/Guest Search - Desktop only */}
        <div className="hidden sm:block col-span-2 sm:col-span-3">
          <label className="block text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">
            Search
          </label>
          <div className="relative">
            <svg className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by property or guest name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 sm:pl-9 pr-2 sm:pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Channel Filter */}
        <div>
          <MultiSelect
            label="Channel"
            options={channelOptions}
            selected={selectedChannels}
            onChange={onChannelsChange}
            placeholder="All"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <RatingMultiSelect
            selected={selectedRatings}
            onChange={onRatingsChange}
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">
            Sort
          </label>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-2 sm:px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
