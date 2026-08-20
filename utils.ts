import { ReferenceBand, ResultFlag } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatReportTime(hours: number): string {
  if (hours < 24) return `${hours} hrs`;
  const days = Math.round(hours / 24);
  return `${days} day${days > 1 ? "s" : ""}`;
}

export function generateBookingId(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `HP-${new Date().getFullYear()}-${rand}`;
}

export function primaryRange(ranges: ReferenceBand[]): ReferenceBand {
  return ranges[0];
}

export function calcFlag(value: number, band: ReferenceBand): ResultFlag {
  if (band.low !== null && value < band.low) return "low";
  if (band.high !== null && value > band.high) return "high";
  return "normal";
}

/** Position of a value along a 0-100 meter, clamped, for the range-meter visual. */
export function meterPosition(value: number, band: ReferenceBand): number {
  if (band.low === null || band.high === null) return 50;
  const span = band.high - band.low;
  const padded = span * 0.6 || 1; // headroom on each side so out-of-range values are visible
  const min = band.low - padded;
  const max = band.high + padded;
  const pct = ((value - min) / (max - min)) * 100;
  return Math.min(96, Math.max(4, pct));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
