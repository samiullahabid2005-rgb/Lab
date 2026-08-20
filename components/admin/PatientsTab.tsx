import { Card } from "@/components/ui/Layout";
import { mockPatients } from "@/data/admin-mock";

export default function PatientsTab() {
  return (
    <div>
      <h2 className="text-base font-semibold text-ink">All Patients</h2>
      <Card className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Patient ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Last Visit</th>
              <th className="px-4 py-3">Total Bookings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {mockPatients.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-data text-xs text-ink-soft">{p.id}</td>
                <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                <td className="px-4 py-3 text-ink-soft">{p.age}</td>
                <td className="px-4 py-3 text-ink-soft">{p.gender}</td>
                <td className="px-4 py-3 font-data text-ink-soft">{p.lastVisit}</td>
                <td className="px-4 py-3 text-ink-soft">{p.totalBookings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
