"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NormalizedReview } from "@/types/review";

// Property data with complete amenities by category
const properties: Record<
  string,
  {
    name: string;
    fullName: string;
    description: string;
    location: string;
    amenities: Record<string, string[]>;
    houseRules: {
      checkIn: string;
      checkOut: string;
      children: string;
      infants: string;
      pets: string;
      parties: string;
      smoking: string;
      additionalRules?: string;
    };
    bedrooms: number;
    bathrooms: number;
    guests: number;
    images: string[];
    type: string;
  }
> = {
  "1001": {
    name: "Shoreditch Heights",
    fullName: "Spacious 2 Bed Flat in Shoreditch - The Flex London",
    description:
      "This apartment is located in Shoreditch, one of the coolest areas in London. It's a spacious unit with high-quality amenities to make your stay comfortable. The location is ideal—close to great cafes, shops, and bars, with easy access to transport. I've made sure everything is ready for you to enjoy your stay in this vibrant neighborhood.",
    location: "Shoreditch, London E1",
    amenities: {
      General: ["Free WiFi", "Internet", "Private living room", "Essentials", "Towels", "Washing Machine", "Iron", "Hair Dryer", "Wireless", "Elevator", "Heating", "Shampoo", "Hangers", "TV", "Iron board", "Linens", "Hot water", "WiFi speed (25+ Mbps)", "Smart TV", "Clothing storage", "Drying rack for clothing", "Portable fans"],
      "Kitchen & dining": ["Kitchen", "Microwave", "Toaster", "Oven", "Electric kettle", "Stove", "Refrigerator", "Kitchen utensils", "Dining area", "Dining table", "Freezer", "Wine glasses"],
      Policy: ["Suitable for children", "Suitable for infants", "Long term stays allowed"],
      Safety: ["Smoke detector", "Carbon Monoxide Detector"],
      Bathroom: ["Shower", "Tub", "Toilet", "Cleaning products", "Body soap", "Conditioner", "Shower gel"],
      Cleanliness: ["Enhanced Cleaning Practices", "Contactless Check-In/Out"],
    },
    houseRules: {
      checkIn: "3 pm",
      checkOut: "10 am",
      children: "allowed",
      infants: "allowed",
      pets: "not allowed",
      parties: "not allowed",
      smoking: "not allowed",
      additionalRules: "Quiet Hours 11pm-8am",
    },
    bedrooms: 2,
    bathrooms: 2,
    guests: 5,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    ],
    type: "Apartment",
  },
  "1002": {
    name: "Canary Wharf Studio",
    fullName: "Modern Studio in Canary Wharf - The Flex London",
    description:
      "A sleek and modern studio apartment in the heart of London's financial district. Perfect for business travelers, this space offers stunning Thames views, a dedicated workspace, and easy access to the city's major attractions.",
    location: "Canary Wharf, London E14",
    amenities: {
      General: ["Free WiFi", "Internet", "Essentials", "Towels", "Washing Machine", "Iron", "Hair Dryer", "Heating", "TV", "Linens", "Hot water", "WiFi speed (100+ Mbps)", "Smart TV", "Dedicated workspace", "Blackout curtains"],
      "Kitchen & dining": ["Kitchen", "Microwave", "Electric kettle", "Stove", "Refrigerator", "Kitchen utensils", "Dining area", "Coffee maker", "Dishwasher"],
      Policy: ["Long term stays allowed"],
      Safety: ["Smoke detector", "Carbon Monoxide Detector", "Fire extinguisher"],
      Bathroom: ["Shower", "Toilet", "Cleaning products", "Body soap", "Shampoo"],
      Cleanliness: ["Enhanced Cleaning Practices", "Contactless Check-In/Out"],
    },
    houseRules: {
      checkIn: "2 pm",
      checkOut: "11 am",
      children: "allowed",
      infants: "allowed",
      pets: "not allowed",
      parties: "not allowed",
      smoking: "not allowed",
    },
    bedrooms: 0,
    bathrooms: 1,
    guests: 2,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    ],
    type: "Studio",
  },
  "1003": {
    name: "Camden Town Apartment",
    fullName: "Charming 1 Bed in Camden Town - The Flex London",
    description:
      "Immerse yourself in Camden's iconic alternative culture from this charming 1-bedroom apartment. Just steps from Camden Market and the canal.",
    location: "Camden Town, London NW1",
    amenities: {
      General: ["Free WiFi", "Internet", "Private living room", "Essentials", "Towels", "Washing Machine", "Heating", "TV", "Linens", "Hot water", "Smart TV", "Hangers", "Books and reading material"],
      "Kitchen & dining": ["Kitchen", "Microwave", "Toaster", "Electric kettle", "Stove", "Refrigerator", "Kitchen utensils", "Coffee maker"],
      Policy: ["Suitable for children", "Suitable for infants", "Long term stays allowed"],
      Safety: ["Smoke detector"],
      Bathroom: ["Shower", "Toilet", "Hair Dryer", "Body soap", "Shampoo"],
      Cleanliness: ["Enhanced Cleaning Practices"],
    },
    houseRules: {
      checkIn: "3 pm",
      checkOut: "10 am",
      children: "allowed",
      infants: "allowed",
      pets: "not allowed",
      parties: "not allowed",
      smoking: "not allowed",
      additionalRules: "No loud music after 10pm",
    },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    ],
    type: "Apartment",
  },
  "1004": {
    name: "Kensington Luxury",
    fullName: "Luxury 3 Bed Apartment in Kensington - The Flex London",
    description:
      "Indulge in luxury living in one of London's most prestigious neighborhoods. This exquisite 3-bedroom apartment offers elegant interiors.",
    location: "Kensington, London W8",
    amenities: {
      General: ["Premium WiFi", "Internet", "Private living room", "Essentials", "Towels", "Washing Machine", "Iron", "Hair Dryer", "Elevator", "Air conditioning", "Heating", "Shampoo", "Hangers", "TV", "Iron board", "Linens", "Hot water", "WiFi speed (100+ Mbps)", "Smart TV", "Clothing storage", "Wine fridge", "Sound system", "Fireplace"],
      "Kitchen & dining": ["Gourmet kitchen", "Microwave", "Toaster", "Oven", "Electric kettle", "Stove", "Refrigerator", "Kitchen utensils", "Dining area", "Dining table", "Freezer", "Wine glasses", "Espresso machine", "Dishwasher"],
      Policy: ["Suitable for children", "Suitable for infants", "Long term stays allowed"],
      Safety: ["Smoke detector", "Carbon Monoxide Detector", "Fire extinguisher", "First aid kit"],
      Bathroom: ["Shower", "Bathtub", "Toilet", "Cleaning products", "Body soap", "Conditioner", "Shower gel", "Bidet", "Heated towel rack"],
      Cleanliness: ["Enhanced Cleaning Practices", "Contactless Check-In/Out"],
    },
    houseRules: {
      checkIn: "4 pm",
      checkOut: "11 am",
      children: "allowed",
      infants: "allowed",
      pets: "not allowed",
      parties: "not allowed",
      smoking: "not allowed",
      additionalRules: "Quiet Hours 10pm-8am",
    },
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=400&h=300&fit=crop",
    ],
    type: "Apartment",
  },
  "1005": {
    name: "Greenwich View",
    fullName: "Beautiful 1 Bed with River View in Greenwich - The Flex London",
    description:
      "Wake up to stunning views of the Cutty Sark and the River Thames in this beautiful 1-bedroom apartment.",
    location: "Greenwich, London SE10",
    amenities: {
      General: ["Free WiFi", "Internet", "Private living room", "Essentials", "Towels", "Washing Machine", "Heating", "TV", "Linens", "Hot water", "Smart TV", "Balcony", "River view"],
      "Kitchen & dining": ["Kitchen", "Microwave", "Toaster", "Electric kettle", "Stove", "Refrigerator", "Kitchen utensils", "Coffee maker"],
      Policy: ["Suitable for children", "Suitable for infants", "Long term stays allowed"],
      Safety: ["Smoke detector", "Carbon Monoxide Detector"],
      Bathroom: ["Shower", "Toilet", "Hair Dryer", "Body soap", "Shampoo"],
      Cleanliness: ["Enhanced Cleaning Practices", "Contactless Check-In/Out"],
    },
    houseRules: {
      checkIn: "3 pm",
      checkOut: "10 am",
      children: "allowed",
      infants: "allowed",
      pets: "not allowed",
      parties: "not allowed",
      smoking: "not allowed",
    },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=400&h=300&fit=crop",
    ],
    type: "Apartment",
  },
};

// Amenity icons by name
function AmenityIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  
  // WiFi/Internet
  if (lower.includes("wifi") || lower.includes("internet") || lower.includes("wireless")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    );
  }
  // TV
  if (lower.includes("tv") || lower.includes("smart tv")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  // Kitchen
  if (lower.includes("kitchen") || lower.includes("utensil") || lower.includes("microwave") || lower.includes("oven") || lower.includes("stove") || lower.includes("refrigerator") || lower.includes("freezer") || lower.includes("toaster") || lower.includes("kettle") || lower.includes("coffee") || lower.includes("espresso") || lower.includes("dishwasher")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }
  // Dining
  if (lower.includes("dining") || lower.includes("wine glass")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
      </svg>
    );
  }
  // Bathroom
  if (lower.includes("shower") || lower.includes("tub") || lower.includes("bath") || lower.includes("toilet") || lower.includes("bidet")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16v12H4zM8 16v4M16 16v4M4 10h16" />
      </svg>
    );
  }
  // Towels/Linens
  if (lower.includes("towel") || lower.includes("linen") || lower.includes("hanger")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    );
  }
  // Washing/Cleaning
  if (lower.includes("wash") || lower.includes("iron") || lower.includes("cleaning") || lower.includes("dryer") || lower.includes("drying")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    );
  }
  // Heating/AC
  if (lower.includes("heat") || lower.includes("air condition") || lower.includes("fan") || lower.includes("climate")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  }
  // Safety
  if (lower.includes("smoke") || lower.includes("carbon") || lower.includes("fire") || lower.includes("first aid") || lower.includes("detector")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  // Living room/Home
  if (lower.includes("living room") || lower.includes("balcony") || lower.includes("view") || lower.includes("fireplace") || lower.includes("elevator")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    );
  }
  // Children/Policy
  if (lower.includes("child") || lower.includes("infant") || lower.includes("long term") || lower.includes("suitable")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  // Personal care
  if (lower.includes("shampoo") || lower.includes("soap") || lower.includes("conditioner") || lower.includes("gel") || lower.includes("hair dryer")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
  }
  // Workspace
  if (lower.includes("workspace") || lower.includes("desk")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  // Default
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// House rule icon
function HouseRuleIcon({ type }: { type: string }) {
  if (type === "checkin" || type === "checkout") {
    return (
      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (type === "children" || type === "infants") {
    return (
      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (type === "pets") {
    return (
      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    );
  }
  if (type === "parties") {
    return (
      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    );
  }
  if (type === "smoking") {
    return (
      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// Modal component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Review item in modal with show more
function ReviewModalItem({ review }: { review: NormalizedReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.publicReview.length > 200;
  const displayText = expanded || !isLong ? review.publicReview : review.publicReview.slice(0, 200) + "...";

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Stars based on rating
  const rating = review.averageRating || 5;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="py-4 border-b border-slate-100 last:border-b-0">
      <div className="flex items-center gap-2 mb-2 text-sm">
        <span className="text-slate-800">
          {Array.from({ length: fullStars }).map((_, i) => "★").join("")}
          {hasHalf && "★"}
          {Array.from({ length: 5 - fullStars - (hasHalf ? 1 : 0) }).map((_, i) => "☆").join("")}
        </span>
        <span className="text-slate-400">·</span>
        <span className="font-medium text-slate-700">{review.guestName}</span>
        <span className="text-slate-400">·</span>
        <span className="text-slate-500">{formatMonth(review.submittedAt)}</span>
      </div>
      <p className="text-slate-600 leading-relaxed">{displayText}</p>
      {isLong && !expanded && (
        <button onClick={() => setExpanded(true)} className="text-slate-800 underline text-sm mt-2 font-medium">
          Show more
        </button>
      )}
    </div>
  );
}

export default function PropertyPage({ params }: { params: Promise<{ listingId: string }> }) {
  const [listingId, setListingId] = useState<string>("");
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [amenitiesModalOpen, setAmenitiesModalOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [houseRulesModalOpen, setHouseRulesModalOpen] = useState(false);

  useEffect(() => {
    params.then((p) => setListingId(p.listingId));
  }, [params]);

  useEffect(() => {
    if (!listingId) return;
    
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/public?listingId=${listingId}`);
        const data = await res.json();
        setReviews(data.result || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [listingId]);

  if (!listingId) return null;

  const property = properties[listingId];

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Property Not Found</h1>
          <Link href="/" className="text-teal-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  // Calculate real rating from approved reviews
  const reviewsWithRating = reviews.filter((r) => r.averageRating !== null);
  const averageRating = reviewsWithRating.length > 0
    ? reviewsWithRating.reduce((sum, r) => sum + (r.averageRating || 0), 0) / reviewsWithRating.length
    : 0;
  const reviewCount = reviews.length;

  // Count total amenities
  const totalAmenities = Object.values(property.amenities).flat().length;

  // First 6 amenities for preview
  const previewAmenities = Object.values(property.amenities).flat().slice(0, 6);

  // First 5 reviews for preview
  const previewReviews = reviews.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-700 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">FL</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-teal-800">Flex Living</span>
                  <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">Demo</span>
                </div>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
                <Link href="/" className="hover:text-teal-700">All listings</Link>
                <Link href="#" className="hover:text-teal-700">About Us</Link>
                <Link href="#" className="hover:text-teal-700">Contact Us</Link>
              </nav>
            </div>
            <Link href="/login" className="text-sm text-teal-700 hover:underline">Manager Login</Link>
          </div>
        </div>
      </header>

      {/* Photo Grid - Fixed layout */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-xl overflow-hidden">
          {/* Main large image - spans 2 cols and 2 rows */}
          <div className="col-span-2 row-span-2 relative">
            <Image src={property.images[0]} alt={property.name} fill className="object-cover" priority />
          </div>
          {/* 4 smaller images */}
          {property.images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="relative">
              <Image src={img} alt="" fill className="object-cover" />
              {idx === 3 && (
                <button className="absolute bottom-3 right-3 px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-slate-800 flex items-center gap-1.5 shadow hover:bg-slate-50">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  + 40 photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content with Sticky Sidebar */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Title Section */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-teal-800 mb-2">
                {property.fullName}
              </h1>
              <p className="text-slate-600 mb-3">
                {property.type} · {property.guests} guests · {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} bedrooms`} · {property.bathrooms} {property.bathrooms === 1 ? "bathroom" : "bathrooms"}
              </p>
              {/* Real rating from reviews - links to reviews section */}
              {!loading && reviewCount > 0 ? (
                <a href="#reviews" className="inline-flex items-center gap-2 text-slate-800">
                  <span className="text-amber-400 text-lg">★</span>
                  <span className="font-semibold">{averageRating.toFixed(2)}</span>
                  <span className="text-slate-400">·</span>
                  <span className="underline">{reviewCount} {reviewCount === 1 ? "review" : "reviews"}</span>
                </a>
              ) : !loading ? (
                <span className="text-slate-500 text-sm">No reviews yet</span>
              ) : null}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </div>

            <hr className="border-slate-200 my-8" />

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-teal-800 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {previewAmenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-teal-700"><AmenityIcon name={amenity} /></span>
                    <span className="text-slate-700">{amenity}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setAmenitiesModalOpen(true)}
                className="mt-6 px-5 py-2.5 border border-slate-300 rounded-full text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Show all {totalAmenities} amenities
              </button>
            </div>

            <hr className="border-slate-200 my-8" />

            {/* Available days */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-teal-800 mb-6">Available days</h2>
              <div className="flex gap-4 overflow-x-auto">
                {/* December 2025 */}
                <div className="min-w-[280px]">
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-1 hover:bg-slate-100 rounded">
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="font-medium text-slate-800">December 2025</span>
                    <div className="w-5" />
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                      <div key={d} className="py-2 text-slate-500 font-medium">{d}</div>
                    ))}
                    {Array.from({ length: 1 }, (_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: 31 }, (_, i) => (
                      <div key={i} className={`py-2 rounded cursor-pointer ${i < 14 ? "text-slate-300" : "text-slate-800 hover:bg-teal-50"}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                {/* January 2026 */}
                <div className="min-w-[280px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-5" />
                    <span className="font-medium text-slate-800">January 2026</span>
                    <button className="p-1 hover:bg-slate-100 rounded">
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                      <div key={d} className="py-2 text-slate-500 font-medium">{d}</div>
                    ))}
                    {Array.from({ length: 4 }, (_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: 31 }, (_, i) => (
                      <div key={i} className="py-2 text-slate-800 hover:bg-teal-50 rounded cursor-pointer">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-4">Select check-in and check-out dates</p>
              <button className="mt-2 px-4 py-2 border border-slate-300 rounded-full text-sm font-medium text-slate-700">
                Clear dates
              </button>
            </div>

            <hr className="border-slate-200 my-8" />

            {/* Reviews Section */}
            <div id="reviews" className="mb-8">
              {/* Section header with real data */}
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-teal-800">Reviews</h2>
                {!loading && reviewCount > 0 && (
                  <>
                    <span className="text-amber-400 text-xl">★</span>
                    <span className="font-semibold text-slate-800">{averageRating.toFixed(2)}</span>
                    <span className="text-slate-500">({reviewCount})</span>
                  </>
                )}
              </div>

              {loading ? (
                <div className="py-8 flex justify-center">
                  <div className="w-6 h-6 border-2 border-teal-200 border-t-teal-700 rounded-full animate-spin" />
                </div>
              ) : reviewCount === 0 ? (
                <p className="text-slate-500">No approved reviews yet</p>
              ) : (
                <>
                  {/* Preview reviews */}
                  <div>
                    {previewReviews.map((review) => (
                      <ReviewModalItem key={review.id} review={review} />
                    ))}
                  </div>
                  
                  {reviewCount > 5 && (
                    <button 
                      onClick={() => setReviewsModalOpen(true)}
                      className="mt-6 px-5 py-2.5 border border-slate-300 rounded-full text-sm font-medium text-slate-800 hover:bg-slate-50"
                    >
                      Show all {reviewCount} reviews
                    </button>
                  )}
                </>
              )}
            </div>

            <hr className="border-slate-200 my-8" />

            {/* Map */}
            <div className="mb-8">
              <div className="relative h-72 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2394a3b8' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                      <div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-700">{property.location}</p>
                    <p className="text-xs text-slate-500 mt-1">Interactive map - Demo only</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-8" />

            {/* Good to know */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-teal-800 mb-6">Good to know</h2>
              
              <h3 className="font-semibold text-slate-800 mb-3">House Rules</h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-8 mb-4">
                <p className="text-slate-600">Check-in: {property.houseRules.checkIn}</p>
                <p className="text-slate-600">Pets: {property.houseRules.pets}</p>
                <p className="text-slate-600">Check-out: {property.houseRules.checkOut}</p>
                <p className="text-slate-600">Smoking inside: {property.houseRules.smoking}</p>
              </div>
              <button 
                onClick={() => setHouseRulesModalOpen(true)}
                className="px-4 py-2 border border-slate-300 rounded-full text-sm font-medium text-slate-700 mb-6 hover:bg-slate-50"
              >
                Show more
              </button>

              <h3 className="font-semibold text-slate-800 mb-3">Cancellation policy</h3>
              <p className="text-slate-600">100% refund up to 14 days before arrival</p>
            </div>
          </div>

          {/* Sticky Sidebar - Inquiry Card */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm text-slate-600 text-center mb-4">
                Select dates and number of guests to see the total price per night
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <button className="flex-1 flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-lg hover:border-slate-300">
                  <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-slate-500">Select Dates</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-lg hover:border-slate-300">
                  <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-slate-800">1</span>
                </button>
              </div>

              <button className="w-full py-3 border border-slate-800 rounded-full text-sm font-medium text-slate-800 hover:bg-slate-50">
                Send Inquiry
              </button>

              <p className="text-xs text-slate-400 text-center mt-4">Demo - Not functional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-slate-700">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-700">Terms and conditions</Link>
          </div>
          <div className="flex items-center gap-2">
            <span>+447723745646</span>
            <span>info@theflexliving.com</span>
          </div>
        </div>
      </footer>

      {/* Amenities Modal */}
      <Modal isOpen={amenitiesModalOpen} onClose={() => setAmenitiesModalOpen(false)} title="Amenities">
        <div className="space-y-6">
          {Object.entries(property.amenities).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold text-slate-800 mb-3">{category}</h3>
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-slate-600"><AmenityIcon name={item} /></span>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Reviews Modal */}
      <Modal isOpen={reviewsModalOpen} onClose={() => setReviewsModalOpen(false)} title="Reviews">
        <div>
          {reviews.map((review) => (
            <ReviewModalItem key={review.id} review={review} />
          ))}
        </div>
      </Modal>

      {/* House Rules Modal */}
      <Modal isOpen={houseRulesModalOpen} onClose={() => setHouseRulesModalOpen(false)} title="House Rules">
        <div className="space-y-6">
          <div className="flex items-center gap-4 py-4 border-b border-slate-100">
            <HouseRuleIcon type="checkin" />
            <span className="text-slate-700">Check-in: {property.houseRules.checkIn}</span>
          </div>
          <div className="flex items-center gap-4 py-4 border-b border-slate-100">
            <HouseRuleIcon type="checkout" />
            <span className="text-slate-700">Check-out: {property.houseRules.checkOut}</span>
          </div>
          <div className="flex items-center gap-4 py-4 border-b border-slate-100">
            <HouseRuleIcon type="children" />
            <span className="text-slate-700">Children: {property.houseRules.children}</span>
          </div>
          <div className="flex items-center gap-4 py-4 border-b border-slate-100">
            <HouseRuleIcon type="infants" />
            <span className="text-slate-700">Infants: {property.houseRules.infants}</span>
          </div>
          <div className="flex items-center gap-4 py-4 border-b border-slate-100">
            <HouseRuleIcon type="pets" />
            <span className="text-slate-700">Pets: {property.houseRules.pets}</span>
          </div>
          <div className="flex items-center gap-4 py-4 border-b border-slate-100">
            <HouseRuleIcon type="parties" />
            <span className="text-slate-700">Parties and events: {property.houseRules.parties}</span>
          </div>
          <div className="flex items-center gap-4 py-4 border-b border-slate-100">
            <HouseRuleIcon type="smoking" />
            <span className="text-slate-700">Smoking inside: {property.houseRules.smoking}</span>
          </div>
          {property.houseRules.additionalRules && (
            <div className="flex items-start gap-4 py-4">
              <HouseRuleIcon type="additional" />
              <div>
                <span className="text-slate-700 font-medium">Additional rules:</span>
                <p className="text-slate-600 mt-1">{property.houseRules.additionalRules}</p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
