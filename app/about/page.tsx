import { Metadata } from "next";
import { Award, Building2, Target, Users, Eye } from "lucide-react";
import { Container, Section, SectionHeading, Card, Badge } from "@/components/ui/Layout";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about HealthPath Diagnostics — our mission, quality standards, and laboratory facilities.",
};

const facilities = [
  "Sample processing area with standardized workflows",
  "Temperature-controlled sample storage",
  "Digital report generation and verification",
  "Dedicated home-collection phlebotomy team",
];

export default function AboutPage() {
  return (
    <Section className="pt-10">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow="About us" title={`About ${siteConfig.name}`} />
        <p className="mt-4 text-base text-ink-soft">
          {siteConfig.name} is a demo diagnostic laboratory website built to showcase a modern, patient-friendly
          testing experience — from browsing tests and packages to booking a home collection and reading a report
          with reference ranges explained.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Card className="p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <Target className="h-5 w-5" />
            </span>
            <h2 className="mt-3 text-lg font-semibold text-ink">Our Mission</h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              To make accurate, understandable diagnostic testing accessible — whether at home or in the lab.
            </p>
          </Card>
          <Card className="p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <Eye className="h-5 w-5" />
            </span>
            <h2 className="mt-3 text-lg font-semibold text-ink">Our Vision</h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              A future where every patient understands their lab results and can discuss them confidently with
              their doctor.
            </p>
          </Card>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-ink">Quality Standards</h2>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            We follow structured quality-control checks across sample collection, processing, and reporting.
          </p>
          <Badge tone="amber" className="mt-3">
            Certification badges shown elsewhere on this site are placeholders — replace with your lab&apos;s real
            accreditation before going live.
          </Badge>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-ink">Laboratory Facilities</h2>
          </div>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {facilities.map((f) => (
              <li key={f} className="rounded-xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-ink">Professional Team</h2>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            Our reports are reviewed by a panel of pathologists and specialists — see the{" "}
            <a href="/doctors" className="font-medium text-teal-700 hover:underline">
              Doctors
            </a>{" "}
            page for demo profiles.
          </p>
        </div>
      </Container>
    </Section>
  );
}
