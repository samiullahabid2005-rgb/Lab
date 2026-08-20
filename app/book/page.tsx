import { Suspense } from "react";
import { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { LoadingState } from "@/components/ui/States";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book a Test",
  description: "Book a lab test or health package in a few simple steps.",
};

export default function BookPage() {
  return (
    <Section className="pt-10">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Booking" title="Book a Test or Package" />
        <div className="mt-8">
          <Suspense fallback={<LoadingState label="Loading booking form…" />}>
            <BookingFlow />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
