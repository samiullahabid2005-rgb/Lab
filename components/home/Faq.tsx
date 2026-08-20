"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { faqs } from "@/data/doctors";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <Section>
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" align="center" />
        <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-paper-raised">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                >
                  <span className="text-sm font-medium text-ink">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div id={`faq-panel-${faq.id}`} className="px-5 pb-4 text-sm text-ink-soft">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
