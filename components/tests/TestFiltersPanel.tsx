"use client";

import { cn } from "@/lib/utils";
import { testCategories } from "@/data/tests";

export interface TestFilters {
  category: string | null;
  maxPrice: number | null;
  maxReportHours: number | null;
}

const priceOptions = [
  { label: "Any price", value: null },
  { label: "Under ₹150", value: 150 },
  { label: "Under ₹300", value: 300 },
  { label: "Under ₹600", value: 600 },
];

const reportTimeOptions = [
  { label: "Any time", value: null },
  { label: "Within 6 hrs", value: 6 },
  { label: "Within 24 hrs", value: 24 },
  { label: "Within 48 hrs", value: 48 },
];

export default function TestFiltersPanel({
  filters,
  onChange,
}: {
  filters: TestFilters;
  onChange: (filters: TestFilters) => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Category</h3>
        <div className="mt-3 flex flex-col gap-1">
          <button
            onClick={() => onChange({ ...filters, category: null })}
            className={cn(
              "rounded-lg px-2.5 py-1.5 text-left text-sm",
              !filters.category ? "bg-teal-100 font-medium text-teal-700" : "text-ink-soft hover:bg-teal-50"
            )}
          >
            All categories
          </button>
          {testCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-left text-sm",
                filters.category === cat ? "bg-teal-100 font-medium text-teal-700" : "text-ink-soft hover:bg-teal-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Price</h3>
        <div className="mt-3 flex flex-col gap-1">
          {priceOptions.map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-ink-soft hover:bg-teal-50">
              <input
                type="radio"
                name="maxPrice"
                checked={filters.maxPrice === opt.value}
                onChange={() => onChange({ ...filters, maxPrice: opt.value })}
                className="accent-teal-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Report time</h3>
        <div className="mt-3 flex flex-col gap-1">
          {reportTimeOptions.map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-ink-soft hover:bg-teal-50">
              <input
                type="radio"
                name="maxReportHours"
                checked={filters.maxReportHours === opt.value}
                onChange={() => onChange({ ...filters, maxReportHours: opt.value })}
                className="accent-teal-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => onChange({ category: null, maxPrice: null, maxReportHours: null })}
        className="text-xs font-medium text-teal-700 hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );
}
