import { DemoReport } from "@/types";
import { Card } from "@/components/ui/Layout";
import { Download, FlaskConical, UserRound } from "lucide-react";
import Button from "@/components/ui/Button";
import RangeMeter, { FlagBadge, ReferenceDisclaimer } from "@/components/reports/RangeMeter";

export default function DemoReportView({ report }: { report: DemoReport }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-2xl border border-b-0 border-line bg-teal-50 px-5 py-3">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-700">
          <FlaskConical className="h-3.5 w-3.5" /> Demo Data
        </span>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      <Card className="rounded-t-none p-6">
        <div className="grid grid-cols-1 gap-4 border-b border-line pb-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <UserRound className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{report.patientName}</p>
              <p className="text-xs text-ink-soft">
                {report.age} yrs · {report.gender} · Patient ID: {report.patientId}
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-ink-soft sm:text-right">
            <Row label="Report ID" value={report.reportId} />
            <Row label="Panel" value={report.panelName} />
            <Row label="Collected" value={report.collectedDate} />
            <Row label="Reported" value={report.reportedDate} />
          </dl>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="py-2 pr-3">Test</th>
                <th className="py-2 pr-3">Result</th>
                <th className="py-2 pr-3">Unit</th>
                <th className="py-2 pr-3">Reference Range</th>
                <th className="py-2 pr-3">Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {report.results.map((r) => (
                <tr key={r.testId}>
                  <td className="py-3 pr-3 font-medium text-ink">{r.testName}</td>
                  <td className="py-3 pr-3 font-data font-semibold text-ink">{r.result}</td>
                  <td className="py-3 pr-3 font-data text-ink-soft">{r.unit}</td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-3">
                      <span className="font-data text-xs text-ink-soft">{r.referenceText}</span>
                      <RangeMeter
                        value={r.result}
                        band={{ group: "", low: r.referenceLow, high: r.referenceHigh, text: r.referenceText }}
                        flag={r.flag}
                      />
                    </div>
                  </td>
                  <td className="py-3 pr-3">
                    <FlagBadge flag={r.flag} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
          <FlaskConical className="h-3.5 w-3.5" /> Reviewed by {report.doctorName}
        </div>

        <ReferenceDisclaimer className="mt-5" />
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-left sm:text-right">{label}</dt>
      <dd className="text-left font-medium text-ink sm:text-right">{value}</dd>
    </>
  );
}
