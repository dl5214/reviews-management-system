"use client";

import { MultiSelect, RatingMultiSelect } from "./MultiSelect";

interface FilterBarProps {
  listings: { listingId: number; listingName: string }[];
  channels: string[];
  selectedListings: string[];
  selectedChannels: string[];
  selectedRatings: number[];
  sortOption: string;
  onListingsChange: (values: string[]) => void;
  onChannelsChange: (values: string[]) => void;
  onRatingsChange: (values: number[]) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

export function FilterBar({
  listings,
  channels,
  selectedListings,
  selectedChannels,
  selectedRatings,
  sortOption,
  onListingsChange,
  onChannelsChange,
  onRatingsChange,
  onSortChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters =
    selectedListings.length > 0 ||
    selectedChannels.length > 0 ||
    selectedRatings.length > 0;

  const listingOptions = listings.map((l) => ({
    value: l.listingId.toString(),
    label: l.listingName.replace("Flex Living - ", ""),
  }));

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
        <h2 className="font-semibold text-slate-800 text-sm sm:text-base">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Reset Filters</span>
            <span className="sm:hidden">Reset</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Property Filter */}
        <MultiSelect
          label="Property"
          options={listingOptions}
          selected={selectedListings}
          onChange={onListingsChange}
          placeholder="All"
        />

        {/* Channel Filter */}
        <MultiSelect
          label="Channel"
          options={channelOptions}
          selected={selectedChannels}
          onChange={onChannelsChange}
          placeholder="All"
        />

        {/* Rating Filter */}
        <RatingMultiSelect
          selected={selectedRatings}
          onChange={onRatingsChange}
        />

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
