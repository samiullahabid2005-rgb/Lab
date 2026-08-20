import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Select", "Details", "Collection", "Schedule", "Confirm"];

export default function BookingSteps({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-1 sm:gap-2" aria-label="Booking progress">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  done && "bg-teal-600 text-white",
                  active && "bg-teal-100 text-teal-700 ring-2 ring-teal-600",
                  !done && !active && "bg-black/5 text-ink-soft"
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : stepNum}
              </span>
              <span className={cn("hidden text-xs font-medium sm:inline", active ? "text-ink" : "text-ink-soft")}>
                {label}
              </span>
            </div>
            {stepNum < steps.length && <span className="h-px flex-1 bg-line" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
