import { CalendarCheck, Users, FlaskConical, Clock3 } from "lucide-react";
import { Card, Badge } from "@/components/ui/Layout";
import { formatINR } from "@/lib/utils";
import { dashboardStats, mockBookings, mockReports } from "@/data/admin-mock";

const statusTone = {
  Pending: "neutral",
  "Sample Collected": "amber",
  "In Progress": "teal",
  "Report Ready": "success",
  Ready: "success",
} as const;

export default function DashboardTab() {
  const stats = dashboardStats();

  const cards = [
    { label: "Total Bookings", value: stats.totalBookings, icon: CalendarCheck },
    { label: "Today's Bookings", value: stats.todaysBookings, icon: Clock3 },
    { label: "Total Patients", value: stats.totalPatients, icon: Users },
    { label: "Pending Reports", value: stats.pendingReports, icon: FlaskConical },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <c.icon className="h-4 w-4" />
            </span>
            <p className="mt-3 font-data text-2xl font-semibold text-ink">{c.value}</p>
            <p className="text-xs text-ink-soft">{c.label}</p>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-base font-semibold text-ink">Recent Bookings</h2>
        <Card className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {mockBookings.slice(0, 5).map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 font-data text-xs text-ink-soft">{b.id}</td>
                  <td className="px-4 py-3 font-medium text-ink">{b.patient}</td>
                  <td className="px-4 py-3 text-ink-soft">{b.item}</td>
                  <td className="px-4 py-3 font-data text-ink">{formatINR(b.amount)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone[b.status]}>{b.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div>
        <h2 className="text-base font-semibold text-ink">Recent Reports</h2>
        <Card className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3">Report ID</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Test</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {mockReports.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-data text-xs text-ink-soft">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-ink">{r.patient}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.test}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone[r.status]}>{r.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
