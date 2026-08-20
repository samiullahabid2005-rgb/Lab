"use client";

import { cn } from "@/lib/utils";

const timeSlots = ["7:00 – 9:00 AM", "9:00 – 11:00 AM", "11:00 AM – 1:00 PM", "3:00 – 5:00 PM", "5:00 – 7:00 PM"];

function nextDays(count: number): { iso: string; label: string; weekday: string }[] {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
    });
  }
  return days;
}

export default function ScheduleStep({
  date,
  timeSlot,
  onChangeDate,
  onChangeTimeSlot,
}: {
  date: string;
  timeSlot: string;
  onChangeDate: (date: string) => void;
  onChangeTimeSlot: (slot: string) => void;
}) {
  const days = nextDays(7);

  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">Select a date</h3>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {days.map((d) => {
          const selected = date === d.iso;
          return (
            <button
              key={d.iso}
              onClick={() => onChangeDate(d.iso)}
              aria-pressed={selected}
              className={cn(
                "flex min-w-[68px] flex-col items-center rounded-xl border px-3 py-2.5",
                selected ? "border-teal-600 bg-teal-50 text-teal-700" : "border-line text-ink-soft hover:border-teal-600/50"
              )}
            >
              <span className="text-[11px] uppercase">{d.weekday}</span>
              <span className="mt-0.5 text-sm font-semibold">{d.label}</span>
            </button>
          );
        })}
      </div>

      <h3 className="mt-6 text-sm font-semibold text-ink">Select a time slot</h3>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {timeSlots.map((slot) => {
          const selected = timeSlot === slot;
          return (
            <button
              key={slot}
              onClick={() => onChangeTimeSlot(slot)}
              aria-pressed={selected}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-sm",
                selected ? "border-teal-600 bg-teal-50 text-teal-700 font-medium" : "border-line text-ink-soft hover:border-teal-600/50"
              )}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}
