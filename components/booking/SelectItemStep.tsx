"use client";

import { useMemo, useState } from "react";
import { Search, CheckCircle2 } from "lucide-react";
import { tests } from "@/data/tests";
import { packages } from "@/data/packages";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface BookingSelection {
  type: "test" | "package";
  id: string;
  name: string;
  price: number;
}

export default function SelectItemStep({
  selection,
  onSelect,
}: {
  selection: BookingSelection | null;
  onSelect: (s: BookingSelection) => void;
}) {
  const [tab, setTab] = useState<"test" | "package">(selection?.type ?? "test");
  const [query, setQuery] = useState("");

  const filteredTests = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tests.filter((t) => !q || t.name.toLowerCase().includes(q) || t.abbreviation.toLowerCase().includes(q));
  }, [query]);

  const filteredPackages = useMemo(() => {
    const q = query.trim().toLowerCase();
    return packages.filter((p) => !q || p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <div className="flex gap-2 rounded-full bg-black/5 p-1">
        {(["test", "package"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === t ? "bg-paper-raised text-ink shadow-sm" : "text-ink-soft"
            )}
          >
            {t === "test" ? "Individual Test" : "Health Package"}
          </button>
        ))}
      </div>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tab === "test" ? "Search tests…" : "Search packages…"}
          className="w-full rounded-full border border-line bg-paper-raised py-2.5 pl-10 pr-4 text-sm focus:border-teal-600 focus:outline-none"
        />
      </div>

      <div className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">
        {tab === "test"
          ? filteredTests.map((t) => (
              <ItemRow
                key={t.id}
                selected={selection?.type === "test" && selection.id === t.id}
                name={t.name}
                sub={t.category}
                price={t.discountPrice ?? t.price}
                onClick={() => onSelect({ type: "test", id: t.id, name: t.name, price: t.discountPrice ?? t.price })}
              />
            ))
          : filteredPackages.map((p) => (
              <ItemRow
                key={p.id}
                selected={selection?.type === "package" && selection.id === p.id}
                name={p.name}
                sub={`${p.testIds.length} tests included`}
                price={p.price}
                onClick={() => onSelect({ type: "package", id: p.id, name: p.name, price: p.price })}
              />
            ))}
      </div>
    </div>
  );
}

function ItemRow({
  name,
  sub,
  price,
  selected,
  onClick,
}: {
  name: string;
  sub: string;
  price: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left",
        selected ? "border-teal-600 bg-teal-50" : "border-line hover:border-teal-600/50"
      )}
      aria-pressed={selected}
    >
      <div>
        <p className="text-sm font-medium text-ink">{name}</p>
        <p className="text-xs text-ink-soft">{sub}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-data text-sm font-semibold text-ink">{formatINR(price)}</span>
        {selected && <CheckCircle2 className="h-5 w-5 text-teal-600" />}
      </div>
    </button>
  );
}
