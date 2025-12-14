# Flex Living Reviews Management System

A reviews dashboard for Flex Living property managers to assess guest feedback, manage review approvals, and display selected reviews on public property pages.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Font**: DM Sans (Google Fonts)
- **State Management**: React hooks + in-memory store

## Key Features

### 1. Manager Dashboard (`/dashboard`)
- **Statistics Overview**: Total reviews, average rating, approved/pending counts
- **Rating Distribution**: Google-style horizontal bar chart
- **Advanced Filtering**: Filter by property, channel (Airbnb/Booking.com/VRBO), rating, approval status
- **Sorting**: Sort by date, rating, guest name, or property
- **One-click Approval**: Toggle reviews for public display

### 2. Public Property Pages (`/property/[listingId]`)
- Property details with amenities
- Guest reviews section (only approved reviews displayed)
- Rating breakdown by category (cleanliness, communication, check-in, location)

### 3. API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/reviews/hostaway` | GET | Fetch & normalize reviews with filtering/sorting |
| `/api/reviews/approve` | POST | Toggle single review approval |
| `/api/reviews/approve` | PUT | Bulk approve/unapprove reviews |
| `/api/reviews/public` | GET | Get approved reviews for public display |

## Project Structure

```
src/
├── app/
│   ├── api/reviews/
│   │   ├── hostaway/route.ts   # Hostaway API integration (mocked)
│   │   ├── approve/route.ts    # Review approval endpoints
│   │   └── public/route.ts     # Public-facing reviews API
│   ├── dashboard/page.tsx      # Manager dashboard
│   ├── property/[listingId]/   # Public property pages
│   ├── page.tsx                # Landing page
│   └── layout.tsx              # Root layout
├── components/
│   ├── dashboard/
│   │   ├── ReviewCard.tsx      # Individual review card
│   │   ├── FilterBar.tsx       # Filter controls
│   │   ├── StatsCards.tsx      # Statistics & rating distribution
│   │   └── StarRating.tsx      # Star rating display
│   └── property/
│       └── PropertyReviews.tsx # Public reviews section
├── lib/
│   ├── mock-data.ts            # Mock Hostaway review data (18 reviews, 5 properties)
│   └── store.ts                # In-memory approval state management
└── types/
    └── review.ts               # TypeScript interfaces
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Available Routes

- `/` - Landing page with property listings
- `/dashboard` - Manager dashboard for review management
- `/property/1001` - Shoreditch Heights property page
- `/property/1002` - Canary Wharf Studio property page
- `/property/1003` - Camden Town property page
- `/property/1004` - Kensington Luxury property page
- `/property/1005` - Greenwich View property page

## Mock Data

The system includes 18 mock reviews across 5 properties and 3 channels:
- **Properties**: Shoreditch Heights, Canary Wharf Studio, Camden Town, Kensington Luxury, Greenwich View
- **Channels**: Airbnb, Booking.com, VRBO
- **Rating Range**: 2-5 stars with detailed category breakdowns

## Notes

- Approval state is stored in-memory and resets on server restart
- In production, this would be replaced with a database
- The Hostaway API is mocked since the sandbox contains no real reviews
