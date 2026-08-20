import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import { ReactNode } from "react";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-soft" role="status" aria-live="polite">
      <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line py-16 text-center ${className ?? ""}`}>
      <span className="rounded-full bg-teal-50 p-3 text-teal-600">{icon ?? <Inbox className="h-6 w-6" />}</span>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-soft">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ title, description }: { title: string; description?: string }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-danger/30 bg-danger-100 py-16 text-center"
    >
      <span className="rounded-full bg-white p-3 text-danger">
        <AlertCircle className="h-6 w-6" />
      </span>
      <h3 className="text-base font-semibold text-danger">{title}</h3>
      {description && <p className="max-w-sm text-sm text-danger/80">{description}</p>}
    </div>
  );
}
