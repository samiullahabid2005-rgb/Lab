"use client";

import { CheckCircle2, Copy } from "lucide-react";
import Button from "@/components/ui/Button";
import { Booking } from "@/types";
import { formatINR } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export default function ConfirmationStep({ booking }: { booking: Booking }) {
  const { showToast } = useToast();

  function copyId() {
    navigator.clipboard.writeText(booking.bookingId).then(() => showToast("Booking ID copied to clipboard."));
  }

  return (
    <div className="text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-100 text-success">
        <CheckCircle2 className="h-7 w-7" />
      </span>
      <h2 className="mt-4 text-2xl font-semibold text-ink">Booking confirmed</h2>
      <p className="mt-1 text-sm text-ink-soft">A confirmation has been recorded for {booking.patient.name}.</p>

      <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-line bg-teal-50 p-5 text-left">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Booking ID</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-data text-lg font-semibold text-teal-700">{booking.bookingId}</span>
          <button onClick={copyId} aria-label="Copy booking ID" className="rounded-full p-1.5 hover:bg-teal-100">
            <Copy className="h-4 w-4 text-teal-700" />
          </button>
        </div>
        <dl className="mt-4 space-y-2 text-sm">
          <Row label="Item" value={booking.itemName} />
          <Row label="Mode" value={booking.mode === "home" ? "Home Collection" : "Lab Visit"} />
          <Row label="Date" value={new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
          <Row label="Time slot" value={booking.timeSlot} />
          <Row label="Amount" value={formatINR(booking.price)} />
          <Row label="Status" value={booking.status} />
        </dl>
      </div>

      <p className="mx-auto mt-4 max-w-sm text-xs text-ink-soft">
        This is demo booking data stored only in your browser for this session — no payment was processed.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/reports" variant="outline">
          Go to Reports
        </Button>
        <Button href="/">Back to Home</Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
