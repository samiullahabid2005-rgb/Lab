import { PhoneCall } from "lucide-react";
import { Container, Section } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export default function ContactCta() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-teal-600 px-6 py-12 text-center text-white sm:px-12">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <PhoneCall className="h-5 w-5" />
          </span>
          <h2 className="max-w-xl text-2xl font-semibold sm:text-3xl">
            Have questions before booking? Talk to our care team.
          </h2>
          <p className="max-w-md text-sm text-teal-50/90">
            Call {siteConfig.contact.phone} or reach out online — we&apos;re happy to help you choose the right test.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="secondary" size="lg">
              Contact Us
            </Button>
            <Button href="/book" variant="outline" size="lg" className="border-white/40 bg-transparent text-white hover:bg-white/10">
              Book a Test
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
