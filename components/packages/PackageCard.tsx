import Link from "next/link";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import { HealthPackage } from "@/types";
import { Badge, Card } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import { formatINR, formatReportTime } from "@/lib/utils";

export default function PackageCard({ pkg }: { pkg: HealthPackage }) {
  const discountPct = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
  return (
    <Card className="flex flex-col p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <Badge tone="amber">{pkg.category}</Badge>
        {pkg.popular && (
          <span className="flex items-center gap-1 text-xs font-semibold text-teal-700">
            <Sparkles className="h-3.5 w-3.5" /> Popular
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold text-ink">
        <Link href={`/packages/${pkg.slug}`} className="hover:text-teal-700">
          {pkg.name}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm text-ink-soft">{pkg.description}</p>

      <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-teal-700">
        <CheckCircle2 className="h-4 w-4" />
        {pkg.testIds.length} tests included
      </div>
      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-soft">
        <Clock className="h-3.5 w-3.5" /> Report in {formatReportTime(pkg.reportTimeHours)}
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-data text-2xl font-semibold text-ink">{formatINR(pkg.price)}</span>
            <span className="font-data text-sm text-ink-soft line-through">{formatINR(pkg.originalPrice)}</span>
          </div>
          <span className="text-xs font-semibold text-success">{discountPct}% off</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button href={`/packages/${pkg.slug}`} size="sm" variant="outline" className="flex-1">
          View Details
        </Button>
        <Button href={`/book?type=package&id=${pkg.id}`} size="sm" className="flex-1">
          Book Package
        </Button>
      </div>
    </Card>
  );
}
