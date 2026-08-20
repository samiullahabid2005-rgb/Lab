import { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { ReferenceDisclaimer } from "@/components/reports/RangeMeter";
import ReferenceValuesTable from "@/components/tests/ReferenceValuesTable";

export const metadata: Metadata = {
  title: "Test Reference Values",
  description: "Search laboratory test reference ranges, units, and sample types — educational demo data.",
};

export default function ReferenceValuesPage() {
  return (
    <Section className="pt-10">
      <Container>
        <SectionHeading
          eyebrow="Reference values"
          title="Test Reference Values"
          description="Search any test to see its typical reference range, unit, and sample type."
        />
        <ReferenceDisclaimer className="mt-6" />
        <div className="mt-8">
          <ReferenceValuesTable />
        </div>
      </Container>
    </Section>
  );
}
