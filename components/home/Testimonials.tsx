import { Star } from "lucide-react";
import { Container, Section, SectionHeading, Card } from "@/components/ui/Layout";
import { testimonials } from "@/data/doctors";

export default function Testimonials() {
  return (
    <Section className="bg-teal-50/60">
      <Container>
        <SectionHeading eyebrow="Patient stories" title="What patients say" align="center" />
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.id} className="p-6">
              <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? "fill-amber-500 text-amber-500" : "text-line"}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-ink">
                {t.name} <span className="font-normal text-ink-soft">· {t.location}</span>
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
