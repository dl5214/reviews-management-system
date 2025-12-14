"use client";

interface FilterBarProps {
  listings: { listingId: number; listingName: string }[];
  channels: string[];
  selectedListing: string;
  selectedChannel: string;
  selectedRating: string;
  selectedApproval: string;
  sortBy: string;
  sortOrder: string;
  onListingChange: (value: string) => void;
  onChannelChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onApprovalChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
  onReset: () => void;
}

export function FilterBar({
  listings,
  channels,
  selectedListing,
  selectedChannel,
  selectedRating,
  selectedApproval,
  sortBy,
  sortOrder,
  onListingChange,
  onChannelChange,
  onRatingChange,
  onApprovalChange,
  onSortByChange,
  onSortOrderChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters =
    selectedListing || selectedChannel || selectedRating || selectedApproval;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-slate-800">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Property Filter */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Property
          </label>
          <select
            value={selectedListing}
            onChange={(e) => onListingChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Properties</option>
            {listings.map((listing) => (
              <option key={listing.listingId} value={listing.listingId}>
                {listing.listingName.replace("Flex Living - ", "")}
              </option>
            ))}
          </select>
        </div>

        {/* Channel Filter */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Channel
          </label>
          <select
            value={selectedChannel}
            onChange={(e) => onChannelChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Channels</option>
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Rating
          </label>
          <select
            value={selectedRating}
            onChange={(e) => onRatingChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Stars</option>
          </select>
        </div>

        {/* Approval Status Filter */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Status
          </label>
          <select
            value={selectedApproval}
            onChange={(e) => onApprovalChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Reviews</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="submittedAt">Date</option>
            <option value="rating">Rating</option>
            <option value="guestName">Guest Name</option>
            <option value="listingName">Property</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
}

