import Link from "next/link";
import Image from "next/image";

const properties = [
  {
    id: "1001",
    name: "Shoreditch Heights",
    location: "Shoreditch, London E1",
    price: 185,
    bedrooms: 2,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  },
  {
    id: "1002",
    name: "Canary Wharf Studio",
    location: "Canary Wharf, London E14",
    price: 145,
    bedrooms: 0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  },
  {
    id: "1003",
    name: "Camden Town Apartment",
    location: "Camden Town, London NW1",
    price: 125,
    bedrooms: 1,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  },
  {
    id: "1004",
    name: "Kensington Luxury",
    location: "Kensington, London W8",
    price: 450,
    bedrooms: 3,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  },
  {
    id: "1005",
    name: "Greenwich View",
    location: "Greenwich, London SE10",
    price: 135,
    bedrooms: 1,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    id: "1006",
    name: "Notting Hill Flat",
    location: "Notting Hill, London W11",
    price: 195,
    bedrooms: 2,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FL</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xl text-slate-800">
                    Flex Living
                  </span>
                  <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                    Demo
                  </span>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#properties" className="text-sm text-slate-600 hover:text-teal-600 transition-colors">
                Properties
              </a>
              <Link href="/reviews" className="text-sm text-slate-600 hover:text-teal-600 transition-colors">
                Reviews
              </Link>
              <a href="#about" className="text-sm text-slate-600 hover:text-teal-600 transition-colors">
                About
              </a>
            </nav>

            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg text-sm font-medium transition-colors"
            >
              Manager Login
            </Link>
          </div>
        </div>
      </header>

      {/* Reviewer Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 bg-amber-400 rounded-full text-white text-xs font-bold">
              !
            </span>
            <p className="text-sm text-amber-800">
              <strong>Demo Notice:</strong> This is a demonstration project. To access the <strong>Manager Dashboard</strong> and review management features, please{" "}
              <Link href="/login" className="text-teal-600 underline hover:text-teal-700 font-semibold">
                click here to login
              </Link>
              {" "}(username: demo, password: demo)
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-sm font-medium rounded-full mb-6">
                Premium London Apartments
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Live Flexibly<br />
                <span className="text-teal-600">in London</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Discover beautifully designed apartments for short or long stays. 
                Experience the comfort of home in the heart of the city with Flex Living.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#properties"
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors text-center"
                >
                  Explore Properties
                </a>
                <Link
                  href="/reviews"
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors text-center"
                >
                  Read Guest Reviews
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
                  alt="Modern London apartment"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">500+</p>
                    <p className="text-sm text-slate-500">Happy Guests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🏠", title: "Fully Furnished", desc: "Move-in ready" },
              { icon: "📶", title: "High-Speed WiFi", desc: "Work from home" },
              { icon: "🧹", title: "Weekly Cleaning", desc: "Included" },
              { icon: "🔑", title: "Flexible Stays", desc: "1 week to 1 year" },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-slate-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Featured Properties
              </h2>
              <p className="text-slate-600">
                Hand-picked apartments in London&apos;s best neighborhoods
              </p>
            </div>
            <Link
              href="/reviews"
              className="hidden md:flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              View all reviews
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-slate-700 flex items-center gap-1">
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {property.rating}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
                      {property.name}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {property.location}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-sm text-slate-500">
                        {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Bedroom${property.bedrooms > 1 ? "s" : ""}`}
                      </span>
                      <div>
                        <span className="text-xl font-bold text-slate-800">£{property.price}</span>
                        <span className="text-sm text-slate-500"> /night</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop"
                  alt="Flex Living interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Choose <span className="text-teal-600">Flex Living</span>?
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We believe in providing more than just a place to stay. Our apartments are designed 
                for modern living, offering the perfect blend of comfort, style, and convenience.
              </p>
              <ul className="space-y-4">
                {[
                  "Premium locations across London",
                  "All-inclusive pricing with no hidden fees",
                  "24/7 guest support",
                  "Flexible booking options",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            Browse our collection of premium apartments and book your London home today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#properties"
              className="px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              View All Properties
            </a>
            <Link
              href="/reviews"
              className="px-8 py-4 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Read Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FL</span>
                </div>
                <span className="font-semibold text-xl text-white">Flex Living</span>
              </div>
              <p className="text-slate-400 text-sm">
                Premium serviced apartments for flexible living in London.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#properties" className="text-slate-400 hover:text-white text-sm">Properties</a></li>
                <li><Link href="/reviews" className="text-slate-400 hover:text-white text-sm">Reviews</Link></li>
                <li><a href="#about" className="text-slate-400 hover:text-white text-sm">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>hello@flexliving.com</li>
                <li>+44 20 1234 5678</li>
                <li>London, UK</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Demo Access</h4>
              <p className="text-slate-400 text-sm mb-3">
                Access the manager dashboard to review and manage guest reviews.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Manager Login →
              </Link>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 Flex Living. All rights reserved.
            </p>
            <p className="text-amber-500 text-sm font-medium">
              ⚠️ Demo Version - For Interview Assessment Only
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
