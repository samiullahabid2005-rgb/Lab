"use client";

import { useState } from "react";
import { LayoutDashboard, CalendarCheck, Users, FlaskConical, Package, FileText, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "bookings", label: "Bookings", icon: CalendarCheck },
  { key: "patients", label: "Patients", icon: Users },
  { key: "tests", label: "Tests", icon: FlaskConical },
  { key: "packages", label: "Packages", icon: Package },
  { key: "reports", label: "Reports", icon: FileText },
] as const;

export type AdminTab = (typeof tabs)[number]["key"];

export default function AdminShell({
  children,
  onLogout,
}: {
  children: (tab: AdminTab) => React.ReactNode;
  onLogout: () => void;
}) {
  const [tab, setTab] = useState<AdminTab>("dashboard");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <nav className="flex gap-1.5 overflow-x-auto rounded-2xl border border-line bg-paper-raised p-2 lg:flex-col lg:overflow-visible">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium",
                tab === t.key ? "bg-teal-100 text-teal-700" : "text-ink-soft hover:bg-teal-50"
              )}
              aria-current={tab === t.key ? "page" : undefined}
            >
              <t.icon className="h-4 w-4 shrink-0" />
              {t.label}
            </button>
          ))}
          <button
            onClick={onLogout}
            className="mt-1 flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-danger hover:bg-danger-100 lg:mt-3 lg:border-t lg:border-line lg:pt-3.5"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Log out
          </button>
        </nav>
      </aside>

      <div>{children(tab)}</div>
    </div>
  );
}
