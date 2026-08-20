import { Container, Section, SectionHeading, Card } from "@/components/ui/Layout";
import { Clock3, HomeIcon, ShieldCheck, Stethoscope } from "lucide-react";

const points = [
  {
    icon: HomeIcon,
    title: "Home Sample Collection",
    description: "A trained phlebotomist visits your home at a time slot you choose — no queues, no waiting rooms.",
  },
  {
    icon: Clock3,
    title: "Fast, Reliable Reporting",
    description: "Most reports are ready within hours, with digital access as soon as they're verified.",
  },
  {
    icon: ShieldCheck,
    title: "Quality-Checked Results",
    description: "Every report passes through standardized quality checks before it reaches you.",
  },
  {
    icon: Stethoscope,
    title: "Pathologist-Reviewed",
    description: "Reports are reviewed by our panel of pathologists and specialists before release.",
  },
];

export default function WhyChooseUs() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Why HealthPath" title="Built around your convenience" align="center" />
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <Card key={p.title} className="p-6 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{p.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
