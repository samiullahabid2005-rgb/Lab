import { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import TestsExplorer from "@/components/tests/TestsExplorer";

export const metadata: Metadata = {
  title: "Lab Tests",
  description: "Browse and search laboratory tests by category, price, and report time.",
};

export default async function TestsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return (
    <Section className="pt-10">
      <Container>
        <SectionHeading eyebrow="Catalog" title="Laboratory Tests" description="Search or filter to find the right test." />
        <div className="mt-8">
          <TestsExplorer initialQuery={params.q ?? ""} />
        </div>
      </Container>
    </Section>
  );
}
