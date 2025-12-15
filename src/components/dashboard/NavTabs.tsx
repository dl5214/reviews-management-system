"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Reviews" },
  { href: "/dashboard/properties", label: "Properties" },
  { href: "/dashboard/channels", label: "Channels" },
  { href: "/dashboard/profile", label: "Profile" },
];

export function NavTabs() {
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
          <nav className="flex justify-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    active
                      ? "border-teal-600 text-teal-700"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile: Bottom navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 safe-area-bottom">
        <div className="grid grid-cols-4">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-center py-3 text-sm font-medium transition-colors ${
                  active 
                    ? "text-teal-600 border-t-2 border-teal-600 -mt-px" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

