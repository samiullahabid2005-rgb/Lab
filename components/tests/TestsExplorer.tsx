"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { tests } from "@/data/tests";
import TestCard from "@/components/tests/TestCard";
import SearchBar from "@/components/tests/SearchBar";
import TestFiltersPanel, { TestFilters } from "@/components/tests/TestFiltersPanel";
import { EmptyState } from "@/components/ui/States";
import { SearchX } from "lucide-react";

export default function TestsExplorer({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<TestFilters>({ category: null, maxPrice: null, maxReportHours: null });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tests.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.abbreviation.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.panel ? t.panel.toLowerCase().includes(q) : false);
      const matchesCategory = !filters.category || t.category === filters.category;
      const effectivePrice = t.discountPrice ?? t.price;
      const matchesPrice = !filters.maxPrice || effectivePrice <= filters.maxPrice;
      const matchesReportTime = !filters.maxReportHours || t.reportTimeHours <= filters.maxReportHours;
      return matchesQuery && matchesCategory && matchesPrice && matchesReportTime;
    });
  }, [query, filters]);

  return (
    <div>
      <SearchBar initialValue={query} onSearch={setQuery} className="max-w-xl" />

      <div className="mt-6 flex items-center justify-between lg:hidden">
        <p className="text-sm text-ink-soft">{results.length} tests found</p>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm font-medium text-ink"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <TestFiltersPanel filters={filters} onChange={setFilters} />
        </aside>

        <div>
          <p className="hidden text-sm text-ink-soft lg:block">{results.length} tests found</p>
          {results.length === 0 ? (
            <EmptyState
              icon={<SearchX className="h-6 w-6" />}
              title="No tests match your filters"
              description="Try a different search term or clear your filters to see all tests."
            />
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((t) => (
                <TestCard key={t.id} test={t} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[95] flex lg:hidden">
          <div className="flex-1 bg-ink/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="w-[85%] max-w-xs overflow-y-auto bg-paper-raised p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            <TestFiltersPanel filters={filters} onChange={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
}
