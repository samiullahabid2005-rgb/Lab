import { Container } from "@/components/ui/Layout";
import { siteConfig } from "@/data/site-config";

export default function Stats() {
  return (
    <div className="border-y border-teal-800 bg-teal-900 py-12 text-teal-50">
      <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {siteConfig.stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-data text-3xl font-semibold sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-teal-200 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </Container>
    </div>
  );
}
