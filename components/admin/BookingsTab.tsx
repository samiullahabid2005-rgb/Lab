"use client";

import { useMemo, useState } from "react";
import { Card, Badge } from "@/components/ui/Layout";
import { formatINR, cn } from "@/lib/utils";
import { mockBookings } from "@/data/admin-mock";
import { EmptyState } from "@/components/ui/States";
import { SearchX } from "lucide-react";

const statusTone = {
  Pending: "neutral",
  "Sample Collected": "amber",
  "In Progress": "teal",
  "Report Ready": "success",
} as const;

const statusFilters = ["All", "Pending", "Sample Collected", "In Progress", "Report Ready"] as const;

export default function BookingsTab() {
  const [status, setStatus] = useState<(typeof statusFilters)[number]>("All");

  const rows = useMemo(
    () => mockBookings.filter((b) => status === "All" || b.status === status),
    [status]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-ink">All Bookings</h2>
        <div className="flex flex-wrap gap-1.5">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium",
                status === s ? "bg-teal-600 text-white" : "bg-black/5 text-ink-soft hover:bg-black/10"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <EmptyState icon={<SearchX className="h-6 w-6" />} title="No bookings match this filter" className="mt-4" />
      ) : (
        <Card className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 font-data text-xs text-ink-soft">{b.id}</td>
                  <td className="px-4 py-3 font-medium text-ink">{b.patient}</td>
                  <td className="px-4 py-3 text-ink-soft">{b.item}</td>
                  <td className="px-4 py-3 text-ink-soft">{b.mode}</td>
                  <td className="px-4 py-3 font-data text-ink-soft">{b.date}</td>
                  <td className="px-4 py-3 font-data text-ink">{formatINR(b.amount)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone[b.status]}>{b.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
