# Flex Living - Reviews Management System

A comprehensive reviews dashboard for Flex Living property managers to assess guest feedback, manage review approvals, and display selected reviews on public property pages.

> **Demo Version** - This project is a technical assessment demonstrating a reviews management system for Flex Living.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - Login credentials are pre-filled (demo/demo).

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15 | Full-stack React framework (App Router) |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| React | 19 | UI components |

---

## Features Implemented

### ✅ 1. Hostaway Integration (Mocked)

- **API Route**: `GET /api/reviews/hostaway`
- Parses and normalizes reviews by:
  - Listing (property)
  - Review type (guest-to-host)
  - Channel (Airbnb, Booking.com, VRBO)
  - Date
- Converts Hostaway 1-10 ratings to standard 1-5 scale
- Supports filtering by listing, channel, rating range, type
- Supports sorting by date, rating, guest name, listing

### ✅ 2. Manager Dashboard (`/dashboard`)

- **Per-property performance**: Filter reviews by property
- **Filtering & Sorting**: By rating, channel, status, time
- **Statistics**: Total reviews, average rating, approval status breakdown
- **Rating Distribution**: Visual bar chart showing 1-5 star distribution
- **Review Approval**: Select which reviews appear on public pages
- **Task-based Workflow**: Dedicated `/dashboard/tasks` page for efficient review processing

### ✅ 3. Review Display Page

- **Property Pages**: `/property/[listingId]` with Flex Living-style layout
- **Public Reviews Page**: `/reviews` showing all approved reviews grouped by property
- **Approval Control**: Only approved reviews displayed publicly
- **Consistent Design**: Teal/green color scheme matching Flex Living branding

### ⏳ 4. Google Reviews (Exploration)

> **Finding**: Google Places API requires business verification and API key setup. Integration is feasible but requires:
> - Google Cloud Console project with Places API enabled
> - Place ID for each property location
> - API key with proper restrictions
> 
> For a production implementation, reviews could be fetched via the Places API and normalized alongside Hostaway reviews.

---

## Project Structure

```
src/
├── app/
│   ├── api/reviews/
│   │   ├── hostaway/route.ts   # Main reviews API (GET with filters)
│   │   ├── approve/route.ts    # Review status management (POST)
│   │   └── public/route.ts     # Public reviews (approved only)
│   ├── dashboard/
│   │   ├── page.tsx            # Manager dashboard
│   │   └── tasks/page.tsx      # Task-based review approval
│   ├── property/[listingId]/   # Public property pages
│   ├── reviews/page.tsx        # Public reviews listing
│   ├── login/page.tsx          # Manager authentication
│   └── page.tsx                # Landing page
├── components/
│   ├── dashboard/
│   │   ├── ReviewCard.tsx      # Review card with status controls
│   │   ├── FilterBar.tsx       # Multi-select filters
│   │   ├── StatsCards.tsx      # Statistics & charts
│   │   ├── MultiSelect.tsx     # Reusable multi-select dropdown
│   │   └── StarRating.tsx      # Star display component
│   └── property/
│       └── PropertyReviews.tsx # Public reviews section
├── lib/
│   ├── mock-data.ts            # 25 mock reviews, 5 properties, 3 channels
│   └── store.ts                # In-memory approval state
├── types/
│   └── review.ts               # TypeScript interfaces
└── middleware.ts               # Route protection for /dashboard
```

---

## API Reference

### GET `/api/reviews/hostaway`

Fetch and normalize reviews from Hostaway (mocked).

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `listingId` | string | Filter by property ID |
| `channel` | string | Filter by channel name |
| `type` | string | `guest-to-host` or `host-to-guest` |
| `minRating` | number | Minimum rating (1-5) |
| `maxRating` | number | Maximum rating (1-5) |
| `sortBy` | string | `submittedAt`, `rating`, `guestName`, `listingName` |
| `sortOrder` | string | `asc` or `desc` |

**Response:**
```json
{
  "status": "success",
  "result": [...normalizedReviews],
  "meta": {
    "total": 25,
    "listings": [...],
    "channels": [...]
  }
}
```

### POST `/api/reviews/approve`

Update review approval status.

**Body:**
```json
{
  "reviewId": 7453,
  "status": "approved" | "pending" | "rejected"
}
```

### GET `/api/reviews/public`

Get approved reviews for public display.

**Query Parameters:**
- `listingId` (optional): Filter by property

---

## Mock Data

- **25 reviews** across 5 properties
- **3 channels**: Airbnb, Booking.com, VRBO
- **Date range**: Oct 25, 2025 - Dec 14, 2025
- **Rating distribution**: ~80% 5-star (realistic positive bias)
- **Categories**: Cleanliness, Communication, House Rules

---

## Key Design Decisions

1. **Task-based Approval Flow**: Separate `/dashboard/tasks` page for focused review processing with Previous/Next navigation and confirmation workflow.

2. **Client-side Filtering**: All filtering done client-side for instant feedback. Server fetches all reviews once.

3. **Status Tabs + Filters**: Status (All/Pending/Approved/Rejected) as primary tabs, with property/channel/rating as secondary filters.

4. **In-memory State**: Approval status stored in memory for demo. Production would use database.

5. **Flex Living Branding**: Teal/green color scheme, clean typography, professional property rental aesthetic.

---

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with property listings |
| `/login` | Public | Manager login (demo/demo) |
| `/dashboard` | Protected | Review management dashboard |
| `/dashboard/tasks` | Protected | Task-based approval workflow |
| `/reviews` | Public | All approved reviews |
| `/property/[id]` | Public | Property details + approved reviews |

---

## Notes

- Approval state resets on server restart (in-memory storage)
- Login session persists for 7 days via cookies
- Images from Unsplash (requires internet connection)
