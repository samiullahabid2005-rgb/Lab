"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Activity, CalendarPlus } from "lucide-react";
import { Container } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tests", label: "Tests" },
  { href: "/packages", label: "Packages" },
  { href: "/doctors", label: "Doctors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile menu on route change
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper-raised/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={`${siteConfig.name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
            <Activity className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold leading-tight text-ink">
            {siteConfig.shortName}
            <span className="block font-body text-[10px] font-medium uppercase tracking-widest text-teal-600">
              Diagnostics
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "bg-teal-50 text-teal-700" : "text-ink-soft hover:bg-teal-50 hover:text-ink"
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-sm font-medium text-ink-soft hover:text-ink">
            {siteConfig.contact.phone}
          </a>
          <Button href="/book" size="sm">
            <CalendarPlus className="h-4 w-4" />
            Book a Test
          </Button>
        </div>

        <button
          className="rounded-lg p-2 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper-raised lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === link.href ? "bg-teal-50 text-teal-700" : "text-ink-soft hover:bg-teal-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/book" size="md" className="mt-2 w-full">
              <CalendarPlus className="h-4 w-4" />
              Book a Test
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
