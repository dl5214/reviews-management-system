import Link from "next/link";
import Image from "next/image";
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
    image: string;
  }
> = {
  "1001": {
    name: "Shoreditch Heights",
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
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
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
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
  },
  "1003": {
    name: "Camden Town Apartment",
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
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
  },
  "1004": {
    name: "Kensington Luxury",
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
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
  },
  "1005": {
    name: "Greenwich View",
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
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
  },
  "1006": {
    name: "Notting Hill Flat",
    description:
      "A charming 2-bedroom apartment in the heart of Notting Hill. Enjoy the famous Portobello Road Market, beautiful gardens, and vibrant local cafes. This stylish flat combines period features with modern amenities for a truly unique London experience.",
    location: "Notting Hill, London W11",
    amenities: [
      "WiFi",
      "Smart TV",
      "Kitchen",
      "Washer/Dryer",
      "Heating",
      "Garden access",
    ],
    price: 195,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Property Not Found
          </h1>
          <p className="text-slate-500 mb-4">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FL</span>
              </div>
              <span className="font-semibold text-xl text-slate-800">
                Flex Living
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-slate-600 hover:text-slate-800"
              >
                ← Back to Properties
              </Link>
              <Link
                href="/login"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                Manager Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-teal-300 text-sm font-medium mb-2">Flex Living</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {property.name}
            </h1>
            <p className="text-white/80 flex items-center gap-2">
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
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl mb-1">🛏️</div>
                <div className="text-lg font-bold text-slate-800">
                  {property.bedrooms || "Studio"}
                </div>
                <div className="text-sm text-slate-500">
                  {property.bedrooms === 1 ? "Bedroom" : property.bedrooms ? "Bedrooms" : ""}
                </div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl mb-1">🚿</div>
                <div className="text-lg font-bold text-slate-800">
                  {property.bathrooms}
                </div>
                <div className="text-sm text-slate-500">
                  {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                </div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl mb-1">👥</div>
                <div className="text-lg font-bold text-slate-800">
                  {property.guests}
                </div>
                <div className="text-sm text-slate-500">Guests</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl mb-1">📍</div>
                <div className="text-lg font-bold text-slate-800">Zone 1-2</div>
                <div className="text-sm text-slate-500">London</div>
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                About This Property
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {property.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-slate-600 p-3 bg-slate-50 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5 text-teal-500 flex-shrink-0"
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
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-slate-800">
                  £{property.price}
                </span>
                <span className="text-slate-500">/ night</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Check-in</p>
                    <p className="font-medium text-slate-800">Select date</p>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Check-out</p>
                    <p className="font-medium text-slate-800">Select date</p>
                  </div>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Guests</p>
                  <p className="font-medium text-slate-800">1 guest</p>
                </div>
              </div>

              <button className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors mb-4">
                Check Availability
              </button>

              <p className="text-center text-sm text-slate-500">
                You won&apos;t be charged yet
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-400 text-center">
                  Demo Version - Booking not functional
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-slate-200">
        <PropertyReviews listingId={listingId} />
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">FL</span>
              </div>
              <span className="font-semibold text-white">Flex Living</span>
            </div>
            <p className="text-slate-500 text-sm">
              Demo Version · © 2025 Flex Living
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
