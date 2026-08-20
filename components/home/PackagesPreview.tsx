import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import PackageCard from "@/components/packages/PackageCard";
import { packages } from "@/data/packages";

export default function PackagesPreview() {
  const featured = packages.slice(0, 3);
  return (
    <Section className="bg-teal-50/60">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Bundled & discounted"
            title="Health Packages"
            description="Curated test bundles designed around common health goals — priced lower than booking individually."
          />
          <Button href="/packages" variant="outline">
            View all packages
          </Button>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
