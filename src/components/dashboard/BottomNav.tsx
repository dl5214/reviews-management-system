"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/dashboard",
    label: "Reviews",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? "text-teal-600" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/properties",
    label: "Properties",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? "text-teal-600" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    href: "/dashboard/channels",
    label: "Channels",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? "text-teal-600" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? "text-teal-600" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/tasks";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop: Top tabs under header */}
      <div className="hidden sm:block border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    active
                      ? "border-teal-600 text-teal-700 bg-teal-50/50"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.icon(active)}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile: Bottom navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                  active ? "text-teal-600" : "text-slate-400"
                }`}
              >
                {item.icon(active)}
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

