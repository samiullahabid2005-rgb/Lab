"use client";

import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, Badge } from "@/components/ui/Layout";
import Button from "@/components/ui/Button";

type ReportStatus = "Draft" | "Ready";

type ResultRow = {
  id: string;
  test: string;
  result: string;
  unit: string;
  referenceRange: string;
  flag: "Normal" | "High" | "Low" | "Critical" | "";
  remarks: string;
};

type Report = {
  id: string;
  patientId: string;
  patient: string;
  age: string;
  gender: string;
  doctor: string;
  sampleDate: string;
  reportedDate: string;
  test: string;
  status: ReportStatus;
  results: ResultRow[];
};

type TestTemplate = {
  name: string;
  category: string;
  unit: string;
  referenceRange: string;
};

const STORAGE_KEY = "mahi_janch_ghar_reports";

const testTemplates: TestTemplate[] = [
  {
    name: "Hemoglobin",
    category: "Hematology",
    unit: "g/dL",
    referenceRange: "Male: 13.0–17.0 | Female: 12.0–15.0",
  },
  {
    name: "Total Leukocyte Count",
    category: "Hematology",
    unit: "cells/µL",
    referenceRange: "4,000–11,000",
  },
  {
    name: "Platelet Count",
    category: "Hematology",
    unit: "lakh/µL",
    referenceRange: "1.5–4.5",
  },
  {
    name: "RBC Count",
    category: "Hematology",
    unit: "million/µL",
    referenceRange: "Male: 4.5–5.5 | Female: 4.0–5.0",
  },
  {
    name: "Fasting Blood Glucose",
    category: "Biochemistry",
    unit: "mg/dL",
    referenceRange: "70–99",
  },
  {
    name: "Random Blood Glucose",
    category: "Biochemistry",
    unit: "mg/dL",
    referenceRange: "< 140",
  },
  {
    name: "HbA1c",
    category: "Diabetes",
    unit: "%",
    referenceRange: "4.0–5.6",
  },
  {
    name: "Total Cholesterol",
    category: "Lipid Profile",
    unit: "mg/dL",
    referenceRange: "< 200",
  },
  {
    name: "Triglycerides",
    category: "Lipid Profile",
    unit: "mg/dL",
    referenceRange: "< 150",
  },
  {
    name: "HDL Cholesterol",
    category: "Lipid Profile",
    unit: "mg/dL",
    referenceRange: "> 40",
  },
  {
    name: "LDL Cholesterol",
    category: "Lipid Profile",
    unit: "mg/dL",
    referenceRange: "< 100",
  },
  {
    name: "Serum Creatinine",
    category: "Kidney Function",
    unit: "mg/dL",
    referenceRange: "Male: 0.7–1.3 | Female: 0.6–1.1",
  },
  {
    name: "Urea",
    category: "Kidney Function",
    unit: "mg/dL",
    referenceRange: "15–45",
  },
  {
    name: "Total Bilirubin",
    category: "Liver Function",
    unit: "mg/dL",
    referenceRange: "0.2–1.2",
  },
  {
    name: "ALT / SGPT",
    category: "Liver Function",
    unit: "U/L",
    referenceRange: "7–56",
  },
  {
    name: "AST / SGOT",
    category: "Liver Function",
    unit: "U/L",
    referenceRange: "10–40",
  },
  {
    name: "TSH",
    category: "Thyroid",
    unit: "µIU/mL",
    referenceRange: "0.4–4.0",
  },
  {
    name: "Free T4",
    category: "Thyroid",
    unit: "ng/dL",
    referenceRange: "0.8–1.8",
  },
  {
    name: "Vitamin D",
    category: "Vitamins",
    unit: "ng/mL",
    referenceRange: "30–100",
  },
  {
    name: "Vitamin B12",
    category: "Vitamins",
    unit: "pg/mL",
    referenceRange: "200–900",
  },
];

function makePatientId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);

  return `MJG-${year}-${random}`;
}

function makeReportId() {
  const random = Math.floor(100000 + Math.random() * 900000);

  return `RPT-${random}`;
}

function emptyResult(test = ""): ResultRow {
  const template = testTemplates.find((item) => item.name === test);

  return {
    id: crypto.randomUUID(),
    test,
    result: "",
    unit: template?.unit ?? "",
    referenceRange: template?.referenceRange ?? "",
    flag: "",
    remarks: "",
  };
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function loadReports(): Report[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export default function AdminReportsTab() {
  const [reports, setReports] = useState<Report[]>(loadReports);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewReport, setPreviewReport] = useState<Report | null>(null);

  const [patient, setPatient] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");

  const [sampleDate, setSampleDate] = useState(today());
  const [selectedTest, setSelectedTest] = useState("");
  const [results, setResults] = useState<ResultRow[]>([]);

  const currentReport = useMemo(
    () => reports.find((report) => report.id === editingId) ?? null,
    [reports, editingId]
  );

  function persist(next: Report[]) {
    setReports(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function resetForm() {
    setEditingId(null);
    setPatient("");
    setAge("");
    setGender("");
    setDoctor("");
    setSampleDate(today());
    setSelectedTest("");
    setResults([]);
  }

  function addTest() {
    if (!selectedTest) return;

    const alreadyAdded = results.some(
      (item) => item.test === selectedTest
    );

    if (alreadyAdded) return;

    setResults((previous) => [
      ...previous,
      emptyResult(selectedTest),
    ]);

    setSelectedTest("");
  }

  function updateResult(
    id: string,
    field: keyof ResultRow,
    value: string
  ) {
    setResults((previous) =>
      previous.map((row) => {
        if (row.id !== id) return row;

        if (field === "test") {
          const template = testTemplates.find(
            (item) => item.name === value
          );

          return {
            ...row,
            test: value,
            unit: template?.unit ?? "",
            referenceRange: template?.referenceRange ?? "",
          };
        }

        return {
          ...row,
          [field]: value,
        };
      })
    );
  }

  function removeResult(id: string) {
    setResults((previous) =>
      previous.filter((row) => row.id !== id)
    );
  }

  function saveReport(status: ReportStatus) {
    if (!patient.trim()) {
      alert("Patient name is required.");
      return;
    }

    if (!results.length) {
      alert("Please add at least one test.");
      return;
    }

    if (editingId) {
      const next = reports.map((report) => {
        if (report.id !== editingId) return report;

        return {
          ...report,
          patient,
          age,
          gender,
          doctor,
          sampleDate,
          test: results.map((item) => item.test).join(", "),
          status,
          results,
          reportedDate:
            status === "Ready" ? today() : report.reportedDate,
        };
      });

      persist(next);

      const updated = next.find(
        (report) => report.id === editingId
      );

      if (updated && status === "Ready") {
        setPreviewReport(updated);
      }

      alert(
        status === "Ready"
          ? "Report updated and marked Ready."
          : "Draft updated."
      );

      return;
    }

    const newReport: Report = {
      id: makeReportId(),
      patientId: makePatientId(),
      patient,
      age,
      gender,
      doctor,
      sampleDate,
      reportedDate: status === "Ready" ? today() : "",
      test: results.map((item) => item.test).join(", "),
      status,
      results,
    };

    const next = [newReport, ...reports];

    persist(next);

    if (status === "Ready") {
      setPreviewReport(newReport);
    }

    resetForm();
  }

  function editReport(report: Report) {
    setEditingId(report.id);
    setPatient(report.patient);
    setAge(report.age);
    setGender(report.gender);
    setDoctor(report.doctor);
    setSampleDate(report.sampleDate);
    setResults(report.results);
    setPreviewReport(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function deleteReport(id: string) {
    const confirmed = window.confirm(
      "Delete this demo report?"
    );

    if (!confirmed) return;

    persist(
      reports.filter((report) => report.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }

    if (previewReport?.id === id) {
      setPreviewReport(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-ink">
          Reports
        </h2>

        <p className="mt-1 text-sm text-ink-soft">
          Create, edit, preview and manage laboratory demo reports.
          Patient ID and Report ID are generated automatically.
        </p>
      </div>

      {/* CREATE / EDIT */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-ink">
              {editingId
                ? "Edit Report"
                : "Create New Report"}
            </h3>

            <p className="text-xs text-ink-soft">
              Demo report system for MAHI JANCH GHAR
            </p>
          </div>

          {editingId && (
            <Button
              type="button"
              onClick={resetForm}
              className="bg-slate-100 text-ink hover:bg-slate-200"
            >
              Cancel Edit
            </Button>
          )}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium text-ink">
              Patient Name
            </span>

            <input
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              placeholder="Enter patient name"
              className="w-full rounded-lg border border-line px-3 py-2 outline-none focus:border-teal-500"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-ink">
              Age
            </span>

            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 35"
              className="w-full rounded-lg border border-line px-3 py-2 outline-none focus:border-teal-500"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-ink">
              Gender
            </span>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-lg border border-line px-3 py-2"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-ink">
              Referring Doctor
            </span>

            <input
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              placeholder="Doctor name"
              className="w-full rounded-lg border border-line px-3 py-2"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-ink">
              Sample Date
            </span>

            <input
              type="date"
              value={sampleDate}
              onChange={(e) => setSampleDate(e.target.value)}
              className="w-full rounded-lg border border-line px-3 py-2"
            />
          </label>
        </div>

        {/* TEST SELECTOR */}
        <div className="mt-6 rounded-xl bg-teal-50 p-4">
          <h4 className="font-semibold text-ink">
            Add Laboratory Test
          </h4>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <select
              value={selectedTest}
              onChange={(e) =>
                setSelectedTest(e.target.value)
              }
              className="flex-1 rounded-lg border border-line bg-white px-3 py-2"
            >
              <option value="">
                Select test
              </option>

              {testTemplates.map((test) => (
                <option key={test.name} value={test.name}>
                  {test.category} — {test.name}
                </option>
              ))}
            </select>

            <Button
              type="button"
              onClick={addTest}
            >
              + Add Test
            </Button>
          </div>
        </div>

        {/* RESULT TABLE */}
        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold text-ink">
              Test Results
            </h4>

            {results.map((row) => (
              <div
                key={row.id}
                className="rounded-xl border border-line p-4"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm">
                    <span className="mb-1 block font-medium">
                      Test
                    </span>

                    <select
                      value={row.test}
                      onChange={(e) =>
                        updateResult(
                          row.id,
                          "test",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-line px-3 py-2"
                    >
                      {testTemplates.map((test) => (
                        <option
                          key={test.name}
                          value={test.name}
                        >
                          {test.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm">
                    <span className="mb-1 block font-medium">
                      Result
                    </span>

                    <input
                      value={row.result}
                      onChange={(e) =>
                        updateResult(
                          row.id,
                          "result",
                          e.target.value
                        )
                      }
                      placeholder="Enter result"
                      className="w-full rounded-lg border border-line px-3 py-2"
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-1 block font-medium">
                      Unit
                    </span>

                    <input
                      value={row.unit}
                      readOnly
                      className="w-full rounded-lg border border-line bg-slate-50 px-3 py-2"
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-1 block font-medium">
                      Reference Range
                    </span>

                    <input
                      value={row.referenceRange}
                      readOnly
                      className="w-full rounded-lg border border-line bg-slate-50 px-3 py-2"
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-1 block font-medium">
                      Flag
                    </span>

                    <select
                      value={row.flag}
                      onChange={(e) =>
                        updateResult(
                          row.id,
                          "flag",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-line px-3 py-2"
                    >
                      <option value="">Not specified</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Low">Low</option>
                      <option value="Critical">
                        Critical
                      </option>
                    </select>
                  </label>

                  <label className="text-sm">
                    <span className="mb-1 block font-medium">
                      Remarks
                    </span>

                    <input
                      value={row.remarks}
                      onChange={(e) =>
                        updateResult(
                          row.id,
                          "remarks",
                          e.target.value
                        )
                      }
                      placeholder="Optional"
                      className="w-full rounded-lg border border-line px-3 py-2"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => removeResult(row.id)}
                  className="mt-3 text-xs font-semibold text-danger"
                >
                  Remove Test
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => saveReport("Draft")}
          >
            Save Draft
          </Button>

          <Button
            type="button"
            onClick={() => saveReport("Ready")}
          >
            Mark Ready
          </Button>
        </div>
      </Card>

      {/* REPORT LIST */}
      <Card className="overflow-x-auto">
        <div className="border-b border-line p-4">
          <h3 className="font-semibold text-ink">
            Saved Reports
          </h3>
        </div>

        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-teal-50 text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-3">Report ID</th>
              <th className="px-4 py-3">Patient ID</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-4 py-3 font-data text-xs">
                  {report.id}
                </td>

                <td className="px-4 py-3 font-data text-xs">
                  {report.patientId}
                </td>

                <td className="px-4 py-3 font-medium">
                  {report.patient}
                </td>

                <td className="px-4 py-3">
                  {report.test}
                </td>

                <td className="px-4 py-3">
                  {report.reportedDate || report.sampleDate}
                </td>

                <td className="px-4 py-3">
                  <Badge
                    tone={
                      report.status === "Ready"
                        ? "success"
                        : "neutral"
                    }
                  >
                    {report.status}
                  </Badge>
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewReport(report)
                      }
                      className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        editReport(report)
                      }
                      className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteReport(report.id)
                      }
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-ink-soft"
                >
                  No reports created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* REPORT PREVIEW */}
      {previewReport && (
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4">
            <div>
              <h3 className="font-semibold text-ink">
                Report Preview
              </h3>

              <p className="text-xs text-ink-soft">
                Demo report — not a real medical document
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  window.print()
                }
                className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white"
              >
                Print
              </button>

              <button
                type="button"
                onClick={() =>
                  setPreviewReport(null)
                }
                className="rounded-lg border border-line px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>

          <div
            id="report-preview"
            className="mx-auto max-w-4xl bg-white p-6 text-ink md:p-10"
          >
            {/* HEADER */}
            <div className="flex flex-col justify-between gap-5 border-b-2 border-teal-600 pb-5 sm:flex-row">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-teal-700">
                  MAHI JANCH GHAR
                </h1>

                <p className="mt-1 text-sm text-slate-600">
                  Diagnostic Laboratory
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  AZAD CHOWK, DHAKA
                </p>

                <p className="text-xs text-slate-500">
                  +91 91429 56853 · +91 99348 09413
                </p>
              </div>

              <div className="text-center">
                <QRCodeSVG
                  value={`https://lab-kappa-rose.vercel.app/reports/${previewReport.id}`}
                  size={100}
                  includeMargin
                />

                <p className="mt-1 text-[10px] text-slate-500">
                  Scan to verify demo report
                </p>
              </div>
            </div>

            {/* PATIENT INFO */}
            <div className="mt-6 grid gap-4 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-500">
                  Patient Name
                </p>

                <p className="font-semibold">
                  {previewReport.patient}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Patient ID
                </p>

                <p className="font-mono font-semibold">
                  {previewReport.patientId}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Report ID
                </p>

                <p className="font-mono font-semibold">
                  {previewReport.id}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Age / Gender
                </p>

                <p className="font-semibold">
                  {previewReport.age || "—"} /{" "}
                  {previewReport.gender || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Sample Date
                </p>

                <p className="font-semibold">
                  {previewReport.sampleDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Report Date
                </p>

                <p className="font-semibold">
                  {previewReport.reportedDate || "Draft"}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">
                  Referring Doctor
                </p>

                <p className="font-semibold">
                  {previewReport.doctor || "—"}
                </p>
              </div>
            </div>

            {/* RESULTS */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[650px] border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-700 text-left text-white">
                    <th className="px-3 py-3">
                      Investigation
                    </th>

                    <th className="px-3 py-3">
                      Result
                    </th>

                    <th className="px-3 py-3">
                      Unit
                    </th>

                    <th className="px-3 py-3">
                      Reference Range
                    </th>

                    <th className="px-3 py-3">
                      Flag
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {previewReport.results.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-slate-200"
                    >
                      <td className="px-3 py-3 font-medium">
                        {row.test}
                      </td>

                      <td className="px-3 py-3 font-semibold">
                        {row.result || "—"}
                      </td>

                      <td className="px-3 py-3">
                        {row.unit || "—"}
                      </td>

                      <td className="px-3 py-3 text-xs">
                        {row.referenceRange || "—"}
                      </td>

                      <td className="px-3 py-3">
                        {row.flag || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* REMARKS */}
            {previewReport.results.some(
              (row) => row.remarks
            ) && (
              <div className="mt-6">
                <h4 className="font-semibold">
                  Remarks
                </h4>

                <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
                  {previewReport.results
                    .filter((row) => row.remarks)
                    .map((row) => (
                      <li key={row.id}>
                        <strong>{row.test}:</strong>{" "}
                        {row.remarks}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* FOOTER */}
            <div className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-500">
              <p>
                This is a front-end demo report generated by
                MAHI JANCH GHAR.
              </p>

              <p className="mt-1">
                Results should be interpreted by a qualified
                healthcare professional.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
