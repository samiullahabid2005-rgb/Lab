import { FileText, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/tests/SearchBar";
import { siteConfig } from "@/data/site-config";

export default function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-line bg-gradient-to-b from-teal-50 to-paper">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
            <ShieldCheck className="h-3.5 w-3.5" /> Trusted diagnostic testing
          </span>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
            Know your health,
            <br /> down to the numbers.
          </h1>
          <p className="mt-4 max-w-lg text-base text-ink-soft sm:text-lg">
            {siteConfig.name} brings lab-accurate testing to your doorstep — book a test, choose home
            collection or a lab visit, and read your report with reference ranges explained.
          </p>

          <SearchBar className="mt-7 max-w-lg" />

          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/book" size="lg">
              Book a Test
            </Button>
            <Button href="/reports" size="lg" variant="outline">
              <FileText className="h-4 w-4" />
              View Reports
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-teal-600" /> Free home sample collection
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-600" /> Reports reviewed by pathologists
            </span>
          </div>
        </div>

        <HeroPanel />
      </Container>
    </div>
  );
}

function HeroPanel() {
  const rows = [
    { name: "Hemoglobin", value: "14.2 g/dL", pos: 52, flag: "normal" as const },
    { name: "Fasting Glucose", value: "118 mg/dL", pos: 78, flag: "high" as const },
    { name: "Vitamin D", value: "21 ng/mL", pos: 22, flag: "low" as const },
    { name: "TSH", value: "2.1 µIU/mL", pos: 46, flag: "normal" as const },
  ];
  const dotColor = { normal: "bg-teal-700", high: "bg-danger", low: "bg-amber-600" };

  return (
    <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-line bg-paper-raised p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Sample Report</p>
          <p className="font-display text-lg font-semibold text-ink">Full Body Checkup</p>
        </div>
        <span className="rounded-full bg-teal-100 px-2.5 py-1 text-[10px] font-semibold uppercase text-teal-700">
          Demo
        </span>
      </div>
      <ul className="mt-4 space-y-4">
        {rows.map((r) => (
          <li key={r.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">{r.name}</span>
              <span className="font-data font-semibold text-ink">{r.value}</span>
            </div>
            <div className="range-meter mt-1.5">
              <div
                className={`range-meter-marker ${dotColor[r.flag]}`}
                style={{ left: `${r.pos}%` }}
                aria-hidden="true"
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[11px] leading-snug text-ink-soft/80">
        Illustrative sample data for demonstration only — not an actual patient report.
      </p>
    </div>
  );
}
