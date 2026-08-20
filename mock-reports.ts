import { DemoReport, ReportResultRow } from "@/types";
import { getTestById } from "@/data/tests";
import { calcFlag } from "@/lib/utils";

function buildRow(testId: string, result: number, groupIndex = 0): ReportResultRow {
  const test = getTestById(testId);
  if (!test) throw new Error(`Unknown demo test id: ${testId}`);
  const band = test.referenceRanges[groupIndex] ?? test.referenceRanges[0];
  return {
    testId,
    testName: `${test.name} (${test.abbreviation})`,
    result,
    unit: test.unit,
    referenceLow: band.low,
    referenceHigh: band.high,
    referenceText: band.text,
    flag: calcFlag(result, band),
  };
}

// Demo credentials: Patient ID + Report ID pairs mapped to a canned report.
const DEMO_REPORTS: Record<string, DemoReport> = {
  "PT1001|RPT5001": {
    reportId: "RPT5001",
    patientId: "PT1001",
    patientName: "Demo Patient — Aarav Singh",
    age: 34,
    gender: "Male",
    collectedDate: "2026-08-10",
    reportedDate: "2026-08-10",
    panelName: "Full Body Checkup",
    doctorName: "Dr. Rohan Kapoor, MD (Biochemistry)",
    results: [
      buildRow("hemoglobin", 14.6),
      buildRow("wbc-count", 7200),
      buildRow("platelet-count", 2.6),
      buildRow("fasting-glucose", 118),
      buildRow("hba1c", 5.9),
      buildRow("alt-sgpt", 61),
      buildRow("creatinine", 1.1),
      buildRow("total-cholesterol", 214),
      buildRow("ldl", 138),
      buildRow("tsh", 2.1),
      buildRow("vitamin-d", 21),
    ],
  },
  "PT1002|RPT5002": {
    reportId: "RPT5002",
    patientId: "PT1002",
    patientName: "Demo Patient — Meera Iyer",
    age: 41,
    gender: "Female",
    collectedDate: "2026-08-14",
    reportedDate: "2026-08-14",
    panelName: "Diabetes Care Package",
    doctorName: "Dr. Vikram Rao, DM (Endocrinology)",
    results: [
      buildRow("fasting-glucose", 96),
      buildRow("pp-glucose", 132),
      buildRow("hba1c", 5.4),
      buildRow("creatinine", 0.8, 1),
      buildRow("urea-bun", 15),
    ],
  },
};

export function getDemoReport(patientId: string, reportId: string): DemoReport | null {
  const key = `${patientId.trim().toUpperCase()}|${reportId.trim().toUpperCase()}`;
  return DEMO_REPORTS[key] ?? null;
}

export const DEMO_REPORT_CREDENTIALS = [
  { patientId: "PT1001", reportId: "RPT5001" },
  { patientId: "PT1002", reportId: "RPT5002" },
];
