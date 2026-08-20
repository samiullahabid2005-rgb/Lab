import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-teal-600 text-white hover:bg-teal-700 shadow-sm",
  secondary: "bg-amber-500 text-ink hover:bg-amber-600 shadow-sm",
  outline: "border border-line bg-paper-raised text-ink hover:border-teal-600 hover:text-teal-700",
  ghost: "text-ink hover:bg-teal-50",
  danger: "bg-danger text-white hover:opacity-90",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-6 py-3.5 gap-2",
};

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type NativeButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & { href?: undefined };

type NativeLinkProps = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps | "href"> & { href: string };

export default function Button(props: NativeButtonProps | NativeLinkProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (props.href) {
    const linkProps = props as NativeLinkProps;
    const rest: Record<string, unknown> = {};
    for (const key in linkProps) {
      if (!["variant", "size", "className", "children", "href"].includes(key)) {
        rest[key] = (linkProps as unknown as Record<string, unknown>)[key];
      }
    }
    return (
      <Link href={linkProps.href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;
  const rest: Record<string, unknown> = {};
  for (const key in buttonProps) {
    if (!["variant", "size", "className", "children", "href"].includes(key)) {
      rest[key] = (buttonProps as unknown as Record<string, unknown>)[key];
    }
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
