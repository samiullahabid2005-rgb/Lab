import { Container, Section, SectionHeading } from "@/components/ui/Layout";

const steps = [
  { title: "Choose a test or package", description: "Search or browse, and pick what you need." },
  { title: "Enter patient details", description: "Tell us who the test is for and how to reach you." },
  { title: "Pick collection mode", description: "Home sample collection or visit the laboratory." },
  { title: "Select date & time", description: "Choose a slot that works for you." },
  { title: "Get your report", description: "View or download your report once it's ready." },
];

export default function HowItWorks() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Simple process" title="How It Works" align="center" />
        <ol className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="font-data text-3xl font-semibold text-teal-600/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
