import { Card, Badge } from "@/components/ui/Layout";
import { mockReports } from "@/data/admin-mock";

export default function AdminReportsTab() {
  return (
    <div>
      <h2 className="text-base font-semibold text-ink">Reports</h2>
      <Card className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Report ID</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Reported Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {mockReports.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3 font-data text-xs text-ink-soft">{r.id}</td>
                <td className="px-4 py-3 font-medium text-ink">{r.patient}</td>
                <td className="px-4 py-3 text-ink-soft">{r.test}</td>
                <td className="px-4 py-3 font-data text-ink-soft">{r.reportedDate}</td>
                <td className="px-4 py-3">
                  <Badge tone={r.status === "Ready" ? "success" : "neutral"}>{r.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
