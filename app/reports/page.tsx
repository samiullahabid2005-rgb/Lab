import { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import ReportLookup from "@/components/reports/ReportLookup";

export const metadata: Metadata = {
  title: "View Reports",
  description: "Look up and download your lab report using your Patient ID and Report ID.",
};

export default function ReportsPage() {
  return (
    <Section className="pt-10">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Reports"
          title="View / Download Report"
          description="Enter your Patient ID and Report ID to view your report. This demo uses sample data only."
        />
        <div className="mt-8">
          <ReportLookup />
        </div>
      </Container>
    </Section>
  );
}
