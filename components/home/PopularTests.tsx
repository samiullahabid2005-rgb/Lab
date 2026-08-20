import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import TestCard from "@/components/tests/TestCard";
import { getPopularTests } from "@/data/tests";

export default function PopularTests() {
  const popular = getPopularTests().slice(0, 8);
  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Most booked"
            title="Popular Tests"
            description="The tests our patients book most often, from routine screening to targeted panels."
          />
          <Button href="/tests" variant="outline">
            View all tests
          </Button>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((t) => (
            <TestCard key={t.id} test={t} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
