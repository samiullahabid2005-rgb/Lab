import Link from "next/link";
import { Activity, AtSign, Briefcase, Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Layout";
import { siteConfig } from "@/data/site-config";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/tests", label: "All Tests" },
      { href: "/packages", label: "Health Packages" },
      { href: "/doctors", label: "Our Doctors" },
      { href: "/reference-values", label: "Reference Values" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/reports", label: "View Reports" },
      { href: "/admin", label: "Admin Demo" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-teal-900 text-teal-50">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white">
              <Activity className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold">{siteConfig.shortName}</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-teal-100/80">{siteConfig.description}</p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: MessageCircle, href: siteConfig.social.facebook, label: "Facebook" },
              { icon: Camera, href: siteConfig.social.instagram, label: "Instagram" },
              { icon: AtSign, href: siteConfig.social.twitter, label: "Twitter" },
              { icon: Briefcase, href: siteConfig.social.linkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full bg-teal-800 p-2 text-teal-100 transition-colors hover:bg-teal-700"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-teal-100/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-teal-100/80">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 translate-y-0.5" />
              <span>
                {siteConfig.contact.addressLine1}
                <br />
                {siteConfig.contact.addressLine2}
              </span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>{siteConfig.contact.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-teal-800">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-teal-200/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Demo project — not a real laboratory.</p>
          <p>Built with Next.js · Tailwind CSS</p>
        </Container>
      </div>
    </footer>
  );
}
