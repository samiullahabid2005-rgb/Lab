import { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import PackageCard from "@/components/packages/PackageCard";
import { packages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Health Packages",
  description: "Diagnostic health packages bundled for common health goals, priced lower than individual tests.",
};

export default function PackagesPage() {
  return (
    <Section className="pt-10">
      <Container>
        <SectionHeading
          eyebrow="Bundled & discounted"
          title="Health Packages"
          description="Choose a curated bundle of tests designed around a specific health goal."
        />
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
