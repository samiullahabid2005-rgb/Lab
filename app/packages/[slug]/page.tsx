import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, CheckCircle2 } from "lucide-react";
import { Container, Section, Badge, Card } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import { packages, getPackageBySlug } from "@/data/packages";
import { getTestById } from "@/data/tests";
import { formatINR, formatReportTime } from "@/lib/utils";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};
  return { title: pkg.name, description: pkg.description };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const includedTests = pkg.testIds.map((id) => getTestById(id)).filter((t): t is NonNullable<typeof t> => !!t);
  const discountPct = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

  return (
    <Section className="pt-10">
      <Container className="max-w-5xl">
        <Badge tone="amber">{pkg.category}</Badge>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{pkg.name}</h1>
        <p className="mt-4 max-w-2xl text-base text-ink-soft">{pkg.description}</p>
        <p className="mt-2 text-sm text-ink-soft">Recommended for: {pkg.recommendedFor}</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <CheckCircle2 className="h-5 w-5 text-teal-600" />
              Included tests ({includedTests.length})
            </h2>
            <div className="mt-4 divide-y divide-line rounded-2xl border border-line">
              {includedTests.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-ink">{t.name}</p>
                    <p className="text-xs text-ink-soft">{t.category}</p>
                  </div>
                  <span className="font-data text-xs text-ink-soft">{t.sampleType}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-data text-3xl font-semibold text-ink">{formatINR(pkg.price)}</span>
                <span className="font-data text-sm text-ink-soft line-through">{formatINR(pkg.originalPrice)}</span>
              </div>
              <span className="text-xs font-semibold text-success">{discountPct}% off</span>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-soft">
                <Clock className="h-3.5 w-3.5" /> Report in {formatReportTime(pkg.reportTimeHours)}
              </p>
              <Button href={`/book?type=package&id=${pkg.id}`} size="lg" className="mt-5 w-full">
                Book Package
              </Button>
              <Button href="/packages" variant="outline" size="md" className="mt-2.5 w-full">
                Back to all packages
              </Button>
            </Card>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
