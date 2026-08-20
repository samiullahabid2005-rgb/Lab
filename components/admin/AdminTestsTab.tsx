import { Card, Badge } from "@/components/ui/Layout";
import { tests } from "@/data/tests";
import { formatINR } from "@/lib/utils";

export default function AdminTestsTab() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Test Catalog ({tests.length})</h2>
        <p className="text-xs text-ink-soft">Edit in <code className="font-data">data/tests.ts</code></p>
      </div>
      <Card className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Sample</th>
              <th className="px-4 py-3">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tests.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-3 font-medium text-ink">{t.name}</td>
                <td className="px-4 py-3">
                  <Badge tone="teal">{t.category}</Badge>
                </td>
                <td className="px-4 py-3 text-ink-soft">{t.sampleType}</td>
                <td className="px-4 py-3 font-data text-ink">{formatINR(t.discountPrice ?? t.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
