import Link from "next/link";
import { Clock, Droplet, ArrowRight } from "lucide-react";
import { LabTest } from "@/types";
import { Badge, Card } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import { formatINR, formatReportTime } from "@/lib/utils";

export default function TestCard({ test }: { test: LabTest }) {
  const hasDiscount = test.discountPrice && test.discountPrice < test.price;
  return (
    <Card className="flex flex-col p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Badge tone="teal">{test.category}</Badge>
          <h3 className="mt-2 text-base font-semibold text-ink">
            <Link href={`/tests/${test.id}`} className="hover:text-teal-700">
              {test.name}
            </Link>
          </h3>
          <p className="font-data text-xs text-ink-soft">{test.abbreviation}</p>
        </div>
      </div>

      <p className="mt-2 line-clamp-2 flex-1 text-sm text-ink-soft">{test.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-soft">
        <span className="flex items-center gap-1">
          <Droplet className="h-3.5 w-3.5" /> {test.sampleType}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {formatReportTime(test.reportTimeHours)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <div>
          {hasDiscount ? (
            <div className="flex items-baseline gap-2">
              <span className="font-data text-lg font-semibold text-ink">{formatINR(test.discountPrice!)}</span>
              <span className="font-data text-xs text-ink-soft line-through">{formatINR(test.price)}</span>
            </div>
          ) : (
            <span className="font-data text-lg font-semibold text-ink">{formatINR(test.price)}</span>
          )}
        </div>
        <Button href={`/book?type=test&id=${test.id}`} size="sm" variant="primary">
          Book Now
        </Button>
      </div>
      <Link
        href={`/tests/${test.id}`}
        className="mt-3 flex items-center justify-center gap-1 text-xs font-medium text-teal-700 hover:underline"
      >
        View details <ArrowRight className="h-3 w-3" />
      </Link>
    </Card>
  );
}
