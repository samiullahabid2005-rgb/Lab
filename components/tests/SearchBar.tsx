"use client";

import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({
  placeholder = "Search for a test — e.g. Thyroid, CBC, Vitamin D",
  initialValue = "",
  onSearch,
  className,
}: {
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    } else {
      router.push(`/tests?q=${encodeURIComponent(value)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className} role="search">
      <label htmlFor="test-search" className="sr-only">
        Search tests
      </label>
      <div className="flex items-center gap-2 rounded-full border border-line bg-paper-raised p-1.5 pl-4 shadow-sm focus-within:border-teal-600">
        <Search className="h-5 w-5 shrink-0 text-ink-soft" aria-hidden="true" />
        <input
          id="test-search"
          type="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch?.(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}
