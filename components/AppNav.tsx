"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ListMusic, MapPin, PlusCircle } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", shortLabel: "Home", icon: BarChart3 },
  { href: "/add", label: "Add Concert", shortLabel: "Add", icon: PlusCircle },
  { href: "/concerts", label: "My Concerts", shortLabel: "List", icon: ListMusic },
  { href: "/map", label: "Map", shortLabel: "Map", icon: MapPin },
];

function NavLink({
  href,
  label,
  shortLabel,
  icon: Icon,
  active,
  compact,
}: {
  href: string;
  label: string;
  shortLabel: string;
  icon: typeof BarChart3;
  active: boolean;
  compact?: boolean;
}) {
  const displayLabel = compact ? shortLabel : label;
  return (
    <Link
      href={href}
      className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs transition-colors sm:flex-row sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
        active
          ? "bg-primary text-primary-content"
          : "text-base-content/70 hover:bg-base-200"
      }`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${active ? "" : "opacity-80"}`} />
      <span className={compact ? "text-[10px] leading-tight sm:text-sm" : ""}>
        {displayLabel}
      </span>
    </Link>
  );
}

export function AppNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / tablet tabs */}
      <nav className="hidden w-full rounded-box border border-base-300 bg-base-100 p-1 shadow-sm sm:flex">
        {links.map((link) => (
          <NavLink
            key={link.href}
            {...link}
            active={pathname === link.href}
          />
        ))}
      </nav>

      {/* Mobile bottom bar */}
      <nav className="btm-nav btm-nav-md fixed bottom-0 left-0 right-0 z-40 border-t border-base-300 bg-base-100/95 backdrop-blur sm:hidden">
        {links.map((link) => (
          <NavLink
            key={link.href}
            {...link}
            active={pathname === link.href}
            compact
          />
        ))}
      </nav>
    </>
  );
}
