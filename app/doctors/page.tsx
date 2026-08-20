import { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import DoctorCard from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctors";

export const metadata: Metadata = {
  title: "Our Doctors",
  description: "Meet the pathologists and specialists behind HealthPath Diagnostics reports.",
};

export default function DoctorsPage() {
  return (
    <Section className="pt-10">
      <Container>
        <SectionHeading
          eyebrow="Our team"
          title="Doctors & Pathologists"
          description="Demo profiles representing the specialists who review reports at HealthPath Diagnostics."
        />
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
