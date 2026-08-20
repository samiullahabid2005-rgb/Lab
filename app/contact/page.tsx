import { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Container, Section, SectionHeading, Card } from "@/components/ui/Layout";
import ContactForm from "@/components/home/ContactForm";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with HealthPath Diagnostics — address, phone, email, and working hours.",
};

export default function ContactPage() {
  return (
    <Section className="pt-10">
      <Container>
        <SectionHeading eyebrow="Get in touch" title="Contact Us" />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <Card className="flex items-start gap-3 p-5">
              <MapPin className="h-5 w-5 shrink-0 text-teal-600" />
              <div>
                <p className="text-sm font-semibold text-ink">Address</p>
                <p className="text-sm text-ink-soft">
                  {siteConfig.contact.addressLine1}, {siteConfig.contact.addressLine2}
                </p>
              </div>
            </Card>
            <Card className="flex items-start gap-3 p-5">
              <Phone className="h-5 w-5 shrink-0 text-teal-600" />
              <div>
                <p className="text-sm font-semibold text-ink">Phone</p>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-sm text-ink-soft hover:text-teal-700">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </Card>
            <Card className="flex items-start gap-3 p-5">
              <Mail className="h-5 w-5 shrink-0 text-teal-600" />
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-ink-soft hover:text-teal-700">
                  {siteConfig.contact.email}
                </a>
              </div>
            </Card>
            <Card className="flex items-start gap-3 p-5">
              <Clock className="h-5 w-5 shrink-0 text-teal-600" />
              <div>
                <p className="text-sm font-semibold text-ink">Working Hours</p>
                {siteConfig.contact.workingHours.map((w) => (
                  <p key={w.days} className="text-sm text-ink-soft">
                    {w.days}: {w.hours}
                  </p>
                ))}
              </div>
            </Card>

            <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-line bg-teal-50 text-sm text-ink-soft">
              Map placeholder — embed your map provider here
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
