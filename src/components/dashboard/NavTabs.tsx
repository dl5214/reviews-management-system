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
          <nav className="flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-1 text-center py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
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
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-300 z-50 safe-area-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-4">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 text-xs font-medium transition-colors gap-1 ${
                  active 
                    ? "text-teal-600" 
                    : "text-slate-500"
                }`}
              >
                <div className={`w-10 h-0.5 rounded-full transition-colors ${active ? "bg-teal-600" : "bg-transparent"}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

