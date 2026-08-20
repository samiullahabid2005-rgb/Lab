import { Card } from "@/components/ui/Layout";
import { packages } from "@/data/packages";
import { formatINR } from "@/lib/utils";

export default function AdminPackagesTab() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Package Catalog ({packages.length})</h2>
        <p className="text-xs text-ink-soft">Edit in <code className="font-data">data/packages.ts</code></p>
      </div>
      <Card className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Tests Included</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Original</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {packages.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                <td className="px-4 py-3 text-ink-soft">{p.testIds.length}</td>
                <td className="px-4 py-3 font-data text-ink">{formatINR(p.price)}</td>
                <td className="px-4 py-3 font-data text-ink-soft line-through">{formatINR(p.originalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
