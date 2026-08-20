import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, Droplet, FlaskConical, ListChecks } from "lucide-react";
import { Container, Section, Badge, Card } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import { getTestById, getRelatedTests, tests } from "@/data/tests";
import { formatINR, formatReportTime } from "@/lib/utils";
import RelatedTests from "@/components/tests/RelatedTests";
import { ReferenceDisclaimer } from "@/components/reports/RangeMeter";

export function generateStaticParams() {
  return tests.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const test = getTestById(id);
  if (!test) return {};
  return {
    title: test.name,
    description: test.description,
  };
}

export default async function TestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = getTestById(id);
  if (!test) notFound();

  const related = getRelatedTests(test);
  const hasDiscount = test.discountPrice && test.discountPrice < test.price;

  return (
    <Section className="pt-10">
      <Container className="max-w-5xl">
        <Badge tone="teal">{test.category}</Badge>
        <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{test.name}</h1>
        <p className="mt-1 font-data text-sm text-ink-soft">{test.abbreviation}</p>
        <p className="mt-4 max-w-2xl text-base text-ink-soft">{test.description}</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <Card className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-4">
              <InfoStat icon={<Droplet className="h-4 w-4" />} label="Sample" value={test.sampleType} />
              <InfoStat icon={<Clock className="h-4 w-4" />} label="Report Time" value={formatReportTime(test.reportTimeHours)} />
              <InfoStat icon={<FlaskConical className="h-4 w-4" />} label="Fasting" value={test.fasting ? "Required" : "Not required"} />
              <InfoStat icon={<ListChecks className="h-4 w-4" />} label="Panel" value={test.panel ?? "Standalone"} />
            </Card>

            <section>
              <h2 className="text-lg font-semibold text-ink">Why this test is done</h2>
              <p className="mt-2 text-sm text-ink-soft">{test.whyDone}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-ink">Preparation instructions</h2>
              <p className="mt-2 text-sm text-ink-soft">{test.preparation}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-ink">Reference range</h2>
              <div className="mt-3 overflow-x-auto rounded-xl border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
                    <tr>
                      <th className="px-4 py-3">Group</th>
                      <th className="px-4 py-3">Reference Range</th>
                      <th className="px-4 py-3">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {test.referenceRanges.map((r) => (
                      <tr key={r.group}>
                        <td className="px-4 py-3 font-medium text-ink">{r.group}</td>
                        <td className="px-4 py-3 font-data text-ink">{r.text}</td>
                        <td className="px-4 py-3 font-data text-ink-soft">{test.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ReferenceDisclaimer className="mt-4" />
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="p-6">
              {hasDiscount ? (
                <div className="flex items-baseline gap-2">
                  <span className="font-data text-3xl font-semibold text-ink">{formatINR(test.discountPrice!)}</span>
                  <span className="font-data text-sm text-ink-soft line-through">{formatINR(test.price)}</span>
                </div>
              ) : (
                <span className="font-data text-3xl font-semibold text-ink">{formatINR(test.price)}</span>
              )}
              <p className="mt-1 text-xs text-ink-soft">Inclusive of home collection where applicable</p>
              <Button href={`/book?type=test&id=${test.id}`} size="lg" className="mt-5 w-full">
                Book Test
              </Button>
              <Button href="/tests" variant="outline" size="md" className="mt-2.5 w-full">
                Back to all tests
              </Button>
            </Card>
          </aside>
        </div>

        <RelatedTests tests={related} />
      </Container>
    </Section>
  );
}

function InfoStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
        {icon} {label}
      </div>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
