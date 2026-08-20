import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-data text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base text-ink-soft">{description}</p>}
    </div>
  );
}

type BadgeTone = "teal" | "amber" | "danger" | "success" | "neutral";

const badgeTones: Record<BadgeTone, string> = {
  teal: "bg-teal-100 text-teal-700",
  amber: "bg-amber-100 text-amber-600",
  danger: "bg-danger-100 text-danger",
  success: "bg-success-100 text-success",
  neutral: "bg-black/5 text-ink-soft",
};

export function Badge({ children, tone = "teal", className }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", badgeTones[tone], className)}>
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-line bg-paper-raised shadow-[0_1px_2px_rgba(11,32,39,0.04)]", className)}>
      {children}
    </div>
  );
}
