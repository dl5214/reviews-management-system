import Link from "next/link";
import { PropertyReviews } from "@/components/property/PropertyReviews";

// Mock property data
const properties: Record<
  string,
  {
    name: string;
    description: string;
    location: string;
    amenities: string[];
    price: number;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    images: string[];
  }
> = {
  "1001": {
    name: "Shoreditch Heights 2BR",
    description:
      "Experience the vibrant heart of East London in this stunning 2-bedroom apartment. Located in the creative hub of Shoreditch, you'll be surrounded by world-class street art, trendy cafes, and some of London's best nightlife. The apartment features floor-to-ceiling windows with city views, a fully equipped modern kitchen, and designer furnishings throughout.",
    location: "Shoreditch, London E1",
    amenities: [
      "High-speed WiFi",
      "Smart TV",
      "Fully equipped kitchen",
      "Washer/Dryer",
      "Air conditioning",
      "24/7 concierge",
      "Gym access",
      "Rooftop terrace",
    ],
    price: 185,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    images: ["/property-1.jpg"],
  },
  "1002": {
    name: "Canary Wharf Studio",
    description:
      "A sleek and modern studio apartment in the heart of London's financial district. Perfect for business travelers, this space offers stunning Thames views, a dedicated workspace, and easy access to the city's major attractions. The building features state-of-the-art amenities including a pool and fitness center.",
    location: "Canary Wharf, London E14",
    amenities: [
      "High-speed WiFi",
      "Smart TV",
      "Kitchen",
      "Washing machine",
      "Air conditioning",
      "Pool access",
      "Gym",
      "Parking available",
    ],
    price: 145,
    bedrooms: 0,
    bathrooms: 1,
    guests: 2,
    images: ["/property-2.jpg"],
  },
  "1003": {
    name: "Camden Town 1BR",
    description:
      "Immerse yourself in Camden's iconic alternative culture from this charming 1-bedroom apartment. Just steps from Camden Market and the canal, this unique property combines vintage charm with modern comfort. Enjoy the eclectic neighborhood by day and return to a cozy retreat at night.",
    location: "Camden Town, London NW1",
    amenities: [
      "WiFi",
      "Smart TV",
      "Kitchen",
      "Washer",
      "Heating",
      "Canal views",
    ],
    price: 125,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    images: ["/property-3.jpg"],
  },
  "1004": {
    name: "Kensington Luxury 3BR",
    description:
      "Indulge in luxury living in one of London's most prestigious neighborhoods. This exquisite 3-bedroom apartment offers elegant interiors, premium furnishings, and unparalleled attention to detail. Walking distance to Hyde Park, world-class museums, and Kensington Palace.",
    location: "Kensington, London W8",
    amenities: [
      "Premium WiFi",
      "65\" Smart TV",
      "Gourmet kitchen",
      "Wine fridge",
      "Washer/Dryer",
      "Climate control",
      "Private terrace",
      "Concierge",
      "Valet parking",
    ],
    price: 450,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    images: ["/property-4.jpg"],
  },
  "1005": {
    name: "Greenwich View 1BR",
    description:
      "Wake up to stunning views of the Cutty Sark and the River Thames in this beautiful 1-bedroom apartment. Located in historic Greenwich, you'll have easy access to maritime museums, Greenwich Park, and the famous market. The apartment features a private balcony perfect for morning coffee.",
    location: "Greenwich, London SE10",
    amenities: [
      "WiFi",
      "Smart TV",
      "Kitchen",
      "Washer",
      "Balcony",
      "River views",
      "Parking",
    ],
    price: 135,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    images: ["/property-5.jpg"],
  },
};

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;
  const property = properties[listingId];

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Property Not Found
          </h1>
          <p className="text-slate-500 mb-4">
            The property you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-bold text-lg">FL</span>
              </div>
              <span className="font-bold text-xl text-slate-800">
                Flex Living
              </span>
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Manager Dashboard →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[400px] bg-gradient-to-br from-indigo-900 via-violet-800 to-purple-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-indigo-200 mb-2">Flex Living</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {property.name}
            </h1>
            <p className="text-lg text-indigo-100 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {property.location}
            </p>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
        {/* Quick Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-1">🛏️</div>
              <div className="text-2xl font-bold text-slate-800">
                {property.bedrooms || "Studio"}
              </div>
              <div className="text-sm text-slate-500">
                {property.bedrooms === 1
                  ? "Bedroom"
                  : property.bedrooms
                  ? "Bedrooms"
                  : ""}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">🚿</div>
              <div className="text-2xl font-bold text-slate-800">
                {property.bathrooms}
              </div>
              <div className="text-sm text-slate-500">
                {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">👥</div>
              <div className="text-2xl font-bold text-slate-800">
                {property.guests}
              </div>
              <div className="text-sm text-slate-500">Guests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">💷</div>
              <div className="text-2xl font-bold text-slate-800">
                £{property.price}
              </div>
              <div className="text-sm text-slate-500">per night</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            About This Property
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            {property.description}
          </p>
        </section>

        {/* Amenities */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {property.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 text-slate-600"
              >
                <svg
                  className="w-5 h-5 text-emerald-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Reviews Section */}
      <div className="bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-6">
            <PropertyReviews listingId={listingId} />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Experience the best of London with Flex Living
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors shadow-xl">
            Check Availability
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">FL</span>
              </div>
              <span className="font-bold text-xl text-white">Flex Living</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 Flex Living. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

