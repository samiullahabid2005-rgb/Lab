import { SearchX } from "lucide-react";
import { Container, Section } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="pt-16">
      <Container className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <SearchX className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-3xl font-semibold text-ink">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-6 flex gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/tests" variant="outline">
            Browse Tests
          </Button>
        </div>
      </Container>
    </Section>
  );
}
