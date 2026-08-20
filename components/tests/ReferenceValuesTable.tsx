"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tests, testCategories } from "@/data/tests";
import { EmptyState } from "@/components/ui/States";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/tests/SearchBar";

export default function ReferenceValuesTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tests.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.abbreviation.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      const matchesCategory = !category || t.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div>
      <SearchBar
        placeholder="Search a test — e.g. Hemoglobin, TSH, HbA1c"
        onSearch={setQuery}
        className="max-w-xl"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory(null)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-medium",
            !category ? "bg-teal-600 text-white" : "bg-black/5 text-ink-soft hover:bg-black/10"
          )}
        >
          All categories
        </button>
        {testCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium",
              category === cat ? "bg-teal-600 text-white" : "bg-black/5 text-ink-soft hover:bg-black/10"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {results.length === 0 ? (
          <EmptyState icon={<SearchX className="h-6 w-6" />} title="No tests found" description="Try a different search term or category." />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="px-4 py-3">Test</th>
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3">Reference Range</th>
                  <th className="px-4 py-3">Sample</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-paper-raised">
                {results.map((t) => (
                  <tr key={t.id} className="hover:bg-teal-50/50">
                    <td className="px-4 py-3">
                      <Link href={`/tests/${t.id}`} className="font-medium text-ink hover:text-teal-700">
                        {t.name}
                      </Link>
                      <p className="font-data text-xs text-ink-soft">{t.abbreviation}</p>
                    </td>
                    <td className="px-4 py-3 font-data text-ink-soft">{t.unit}</td>
                    <td className="px-4 py-3">
                      {t.referenceRanges.map((r) => (
                        <div key={r.group} className="font-data text-xs text-ink">
                          {r.group !== "General" && <span className="text-ink-soft">{r.group}: </span>}
                          {r.text}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{t.sampleType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
