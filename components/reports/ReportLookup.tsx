"use client";

import { FormEvent, useState } from "react";
import { FileSearch } from "lucide-react";
import { InputField } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";
import DemoReportView from "@/components/reports/DemoReportView";
import { getDemoReport, DEMO_REPORT_CREDENTIALS } from "@/lib/mock-reports";
import { DemoReport } from "@/types";

export default function ReportLookup() {
  const [patientId, setPatientId] = useState("");
  const [reportId, setReportId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "not-found">("idle");
  const [report, setReport] = useState<DemoReport | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      const result = getDemoReport(patientId, reportId);
      if (result) {
        setReport(result);
        setStatus("found");
      } else {
        setReport(null);
        setStatus("not-found");
      }
    }, 500);
  }

  function fillDemo(pid: string, rid: string) {
    setPatientId(pid);
    setReportId(rid);
  }

  return (
    <div>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <InputField
            label="Patient ID"
            id="patient-id"
            required
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="e.g. PT1001"
          />
          <InputField
            label="Report ID"
            id="report-id"
            required
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            placeholder="e.g. RPT5001"
          />
          <Button type="submit" className="h-fit">
            <FileSearch className="h-4 w-4" /> View Report
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-soft">
          <span>Try demo credentials:</span>
          {DEMO_REPORT_CREDENTIALS.map((c) => (
            <button
              key={c.reportId}
              onClick={() => fillDemo(c.patientId, c.reportId)}
              className="rounded-full bg-teal-50 px-2.5 py-1 font-data font-medium text-teal-700 hover:bg-teal-100"
            >
              {c.patientId} / {c.reportId}
            </button>
          ))}
        </div>
      </Card>

      <div className="mt-8">
        {status === "loading" && <LoadingState label="Looking up your report…" />}
        {status === "not-found" && (
          <ErrorState
            title="No report found"
            description="Double-check the Patient ID and Report ID, or try one of the demo credentials above."
          />
        )}
        {status === "found" && report && <DemoReportView report={report} />}
      </div>
    </div>
  );
}
