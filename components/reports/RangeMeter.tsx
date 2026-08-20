import { ReferenceBand, ResultFlag } from "@/types";
import { meterPosition, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Layout";

const flagLabel: Record<ResultFlag, string> = {
  low: "Below range",
  normal: "Normal",
  high: "Above range",
};

const flagTone: Record<ResultFlag, "danger" | "success" | "amber"> = {
  low: "amber",
  normal: "success",
  high: "danger",
};

export function FlagBadge({ flag }: { flag: ResultFlag }) {
  return <Badge tone={flagTone[flag]}>{flagLabel[flag]}</Badge>;
}

export default function RangeMeter({
  value,
  band,
  flag,
}: {
  value: number;
  band: ReferenceBand;
  flag: ResultFlag;
}) {
  const pos = meterPosition(value, band);
  return (
    <div className="w-full min-w-[140px]">
      <div className="range-meter">
        <div
          className={cn(
            "range-meter-marker",
            flag === "low" && "bg-amber-600",
            flag === "high" && "bg-danger",
            flag === "normal" && "bg-teal-700"
          )}
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] font-medium text-ink-soft/70">
        <span>Low</span>
        <span>Normal</span>
        <span>High</span>
      </div>
    </div>
  );
}

export function ReferenceDisclaimer({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-amber-500/40 bg-amber-100 px-4 py-3 text-sm text-ink", className)}>
      <p>
        <strong>Educational / demo purposes only.</strong> Reference ranges shown here are examples. Actual
        reference intervals may vary by laboratory, testing method, age, sex, and other factors. Please
        interpret your laboratory report with a qualified healthcare professional.
      </p>
    </div>
  );
}
