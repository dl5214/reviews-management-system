import Link from "next/link";

const properties = [
  {
    id: "1001",
    name: "Shoreditch Heights 2BR",
    location: "Shoreditch, London E1",
    price: 185,
    bedrooms: 2,
    rating: 4.5,
  },
  {
    id: "1002",
    name: "Canary Wharf Studio",
    location: "Canary Wharf, London E14",
    price: 145,
    bedrooms: 0,
    rating: 4.8,
  },
  {
    id: "1003",
    name: "Camden Town 1BR",
    location: "Camden Town, London NW1",
    price: 125,
    bedrooms: 1,
    rating: 4.2,
  },
  {
    id: "1004",
    name: "Kensington Luxury 3BR",
    location: "Kensington, London W8",
    price: 450,
    bedrooms: 3,
    rating: 4.9,
  },
  {
    id: "1005",
    name: "Greenwich View 1BR",
    location: "Greenwich, London SE10",
    price: 135,
    bedrooms: 1,
    rating: 4.3,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-bold text-lg">FL</span>
              </div>
              <span className="font-bold text-xl text-slate-800">
                Flex Living
              </span>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Manager Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-violet-800 to-purple-900" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-200 text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Premium London Apartments
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Live Flexibly in
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-violet-200">
                London's Best Locations
              </span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
              Discover beautifully designed apartments for short or long stays.
              Experience the comfort of home in the heart of the city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#properties"
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors shadow-xl inline-flex items-center justify-center gap-2"
              >
                Explore Properties
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Manager Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Our Properties
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Hand-picked apartments in London's most sought-after
              neighborhoods, each offering a unique experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-indigo-400 to-violet-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/80 text-6xl font-bold">
                        {property.name.charAt(0)}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {property.rating}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                      {property.name}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {property.location}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          🛏️{" "}
                          {property.bedrooms === 0
                            ? "Studio"
                            : `${property.bedrooms} BR`}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-slate-800">
                          £{property.price}
                        </span>
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

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg max-w-2xl mx-auto">
            Browse our collection of premium apartments and book your London
            home today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#properties"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors shadow-xl inline-block"
            >
              View All Properties
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
