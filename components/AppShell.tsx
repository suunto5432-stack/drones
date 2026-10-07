"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Briefing" },
  { href: "/console", label: "Operator console" },
  { href: "/tests", label: "Drop tests" },
  { href: "/specs", label: "Airframe & BOM" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className="min-h-full flex flex-col bg-[var(--ink)] text-[var(--paper)]">
      <header className="border-b border-[var(--stroke)]">
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <Link href="/" className="flex items-baseline gap-3 min-w-0">
            <span className="font-mono text-[11px] tracking-[0.22em] text-[var(--amber)]">FYP-UAV</span>
            <span className="truncate text-sm font-medium tracking-tight">Flood Rescue Flotation Delivery</span>
          </Link>
          <p className="hidden md:block text-xs text-[var(--mute)]">Human-in-the-loop · fail-safe pin lock</p>
        </div>
        <nav className="flex gap-1 px-3 pb-2 overflow-x-auto">
          {LINKS.map((l) => {
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 text-sm whitespace-nowrap border-b-2 ${
                  active
                    ? "border-[var(--amber)] text-[var(--paper)]"
                    : "border-transparent text-[var(--mute)] hover:text-[var(--paper)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
