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

## Deployment

This project is deployed on **Vercel**: https://reviews-management-system-nu.vercel.app

CI/CD: Changes pushed to the `main` branch automatically trigger a build and deployment on Vercel.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|:-------:|---------|
| Next.js | 16 | Full-stack React framework (App Router) |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| React | 19 | UI components |

---

## Features Implemented

### 1. Hostaway Integration (Mocked)

- **API Route**: `GET /api/reviews/hostaway`
- Parses and normalizes reviews by:
  - Listing (property)
  - Review type (guest-to-host)
  - Channel (Airbnb, Booking.com, VRBO)
  - Date
- Converts Hostaway 1-10 ratings to standard 1-5 scale
- Supports filtering by listing, channel, rating range, type
- Supports sorting by date, rating, guest name, listing

### 2. Manager Dashboard (`/dashboard`)

- **Multi-view navigation**: Switch between **Dashboard / Properties / Channels** views
- **Analytics**: Dedicated `/dashboard/analytics` page for weekly trends and recent low reviews
- **Searching & Filtering & Sorting**: By property, channel, rating, status, time
- **Statistics**: Total reviews, average rating, approval status breakdown
- **Rating Distribution**: Visual bar chart showing 1-5 star distribution
- **Review Approval**: Select which reviews appear on public pages
- **Task-based Workflow**: Dedicated `/dashboard/tasks` page for efficient review processing

### 3. Review Display Page

- **Property Pages**: `/property/[listingId]` with Flex Living-style layout
- **Public Reviews Page**: `/reviews` showing all approved reviews grouped by property
- **Approval Control**: Only approved reviews displayed publicly
- **Consistent Design**: Teal/green color scheme matching Flex Living branding

### 4. Google Reviews (Exploration)

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
│   ├── api/
│   │   └── reviews/
│   │       ├── approve/route.ts      # Review status management
│   │       ├── hostaway/route.ts     # Reviews API
│   │       └── public/route.ts       # Approved, published guest-to-host reviews
│   ├── dashboard/
│   │   ├── channels/
│   │   │   ├── [channel]/page.tsx    # Channel drill-down
│   │   │   └── page.tsx              # Channel overview
│   │   ├── properties/
│   │   │   ├── [listingId]/page.tsx  # Property drill-down
│   │   │   └── page.tsx              # Property overview
│   │   ├── analytics/page.tsx        # Analytics tab
│   │   ├── profile/page.tsx          # Manager profile card
│   │   ├── tasks/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx              # Task-based review approval flow
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Manager dashboard home
│   ├── property/[listingId]/page.tsx # Public property page
│   ├── reviews/page.tsx              # Public approved reviews listing
│   ├── login/page.tsx                # Manager authentication
│   ├── layout.tsx
│   ├── page.tsx                      # Landing page
│   ├── globals.css
│   └── icon.svg
├── components/
│   ├── dashboard/
│   │   ├── FilterBar.tsx
│   │   ├── MultiSelect.tsx
│   │   ├── NavTabs.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── ReviewStatusTabs.tsx
│   │   ├── StarRating.tsx
│   │   └── StatsCards.tsx
│   └── property/
│       ├── PropertyReviews.tsx
│       └── PublicReviewsList.tsx
├── lib/
│   ├── mock-data.ts                  # 30 mock reviews across 5 properties
│   └── store.ts                      # In-memory approval state
├── types/
│   └── review.ts                     # TypeScript interfaces
└── middleware.ts                     # Protects /dashboard routes
```

---

## API Reference

### GET `/api/reviews/hostaway`

Fetch and normalize reviews from Hostaway (mocked).

**Query Parameters:**

| Param | Type | Description |
|-------|:----:|-------------|
| `listingId` | string | Filter by property ID |
| `channel` | string | Filter by channel name |
| `type` | string | `guest-to-host` or `host-to-guest` |
| `minRating` | number | Minimum rating (1-5) |
| `maxRating` | number | Maximum rating (1-5) |
| `sortBy` | string | `submittedAt`, `rating`, `guestName`, `listingName` |
| `sortOrder` | string | `asc` or `desc` |

**Response:**
```text
{
  "status": "success",
  "result": [...normalizedReviews],
  "meta": {
    "total": <filteredCount>,
    "listings": [...],
    "channels": [...]
  }
}
```

### POST `/api/reviews/approve`

Update a single review approval status.

**Body:**
```text
{
  "reviewId": 7453,
  "status": "approved" | "pending" | "rejected"
}
```

### PUT `/api/reviews/approve`

Bulk update review approval statuses.

**Body:**
```text
{
  "reviewIds": [7453, 7454],
  "status": "approved" | "pending" | "rejected"
}
```

### GET `/api/reviews/public`

Get approved reviews for public display.

**Query Parameters:**
- `listingId` (optional): Filter by property

---

## Mock Data

- **30 reviews** across 5 properties
- **3 channels**: Airbnb, Booking.com, VRBO
- **Date range**: Oct 20, 2025 - Dec 14, 2025
- **Rating mix**: Mostly 8–10s with several mid/low scores for realism
- **Categories**: Cleanliness, Communication, House Rules

---

## Key Design Decisions

1. **Task-based Approval Flow**: Separate `/dashboard/tasks` page for focused review processing with Previous/Next navigation and confirmation workflow.

2. **Client-side Filtering**: All filtering done client-side for instant feedback. Server fetches all reviews once.

3. **Status Tabs + Multi-view**: Status tabs (All/Pending/Approved/Rejected) with property/channel/rating filters, plus Properties/Channels views for alternate navigation.

4. **In-memory State**: Approval status stored in memory for demo. Production would use database.

5. **Flex Living Branding**: Teal/green color scheme, clean typography, professional property rental aesthetic.

---

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with property listings |
| `/login` | Public | Manager login (demo/demo) |
| `/dashboard` | Protected | Review management dashboard |
| `/dashboard/properties` | Protected | Property overview |
| `/dashboard/properties/[id]` | Protected | Property drill-down |
| `/dashboard/channels` | Protected | Channel overview |
| `/dashboard/channels/[channel]` | Protected | Channel drill-down |
| `/dashboard/tasks` | Protected | Task-based approval workflow |
| `/dashboard/profile` | Protected | Manager profile card |
| `/dashboard/analytics` | Protected | Reviews analytics and trends |
| `/reviews` | Public | All approved reviews |
| `/property/[id]` | Public | Property details + approved reviews |

---

## Notes

- Approval state resets on server restart (in-memory storage)
- Login session persists for 7 days via cookies
- Images from Unsplash (requires internet connection)
