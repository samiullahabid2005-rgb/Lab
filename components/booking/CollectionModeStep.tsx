"use client";

import { Home, Building2, CheckCircle2 } from "lucide-react";
import { BookingMode } from "@/types";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";

export default function CollectionModeStep({
  mode,
  onChange,
}: {
  mode: BookingMode | null;
  onChange: (mode: BookingMode) => void;
}) {
  const options: { value: BookingMode; icon: typeof Home; title: string; description: string }[] = [
    {
      value: "home",
      icon: Home,
      title: "Home Sample Collection",
      description: "A trained phlebotomist visits your address at your chosen time slot.",
    },
    {
      value: "lab",
      icon: Building2,
      title: "Visit Laboratory",
      description: `Visit us directly at ${siteConfig.contact.addressLine1}, ${siteConfig.contact.addressLine2}.`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {options.map((opt) => {
        const selected = mode === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-pressed={selected}
            className={cn(
              "flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-colors",
              selected ? "border-teal-600 bg-teal-50" : "border-line hover:border-teal-600/50"
            )}
          >
            <div className="flex w-full items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <opt.icon className="h-5 w-5" />
              </span>
              {selected && <CheckCircle2 className="h-5 w-5 text-teal-600" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{opt.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{opt.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
