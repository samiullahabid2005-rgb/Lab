"use client";

import { useEffect, useState } from "react";
import { Card, Badge } from "@/components/ui/Layout";

type ReportStatus = "Draft" | "Ready";

type ResultRow = {
  test: string;
  result: string;
  unit: string;
  referenceRange: string;
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

const STORAGE_KEY = "mahi_janch_ghar_reports";

const emptyResult = (): ResultRow => ({
  test: "",
  result: "",
  unit: "",
  referenceRange: "",
  remarks: "",
});

const defaultTests = [
  "Hemoglobin",
  "RBC Count",
  "WBC Count",
  "Platelet Count",
  "Hematocrit / PCV",
  "MCV",
  "MCH",
  "MCHC",
  "RDW",
  "Neutrophils",
  "Lymphocytes",
  "Monocytes",
  "Eosinophils",
  "Basophils",
];

export default function AdminReportsTab() {
  const [reports, setReports] = useState<Report[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [viewReport, setViewReport] = useState<Report | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");
  const [sampleDate, setSampleDate] = useState("");
  const [testName, setTestName] = useState("CPC / CBC");
  const [results, setResults] = useState<ResultRow[]>([emptyResult()]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch {
        setReports([]);
      }
    }
  }, []);

  function saveReports(next: Report[]) {
    setReports(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function resetForm() {
    setPatientId("");
    setPatient("");
    setAge("");
    setGender("");
    setDoctor("");
    setSampleDate("");
    setTestName("CPC / CBC");
    setResults([emptyResult()]);
    setEditingId(null);
  }

  function openNewReport() {
    resetForm();
    setShowForm(true);
  }

  function addResultRow() {
    setResults((current) => [...current, emptyResult()]);
  }

  function removeResultRow(index: number) {
    setResults((current) => current.filter((_, i) => i !== index));
  }

  function updateResult(
    index: number,
    field: keyof ResultRow,
    value: string
  ) {
    setResults((current) =>
      current.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  }

  function loadCpcTemplate() {
    setResults(
      defaultTests.map((test) => ({
        test,
        result: "",
        unit: "",
        referenceRange: "",
        remarks: "",
      }))
    );
    setTestName("CPC / CBC");
  }

  function editReport(report: Report) {
    setEditingId(report.id);
    setPatientId(report.patientId);
    setPatient(report.patient);
    setAge(report.age);
    setGender(report.gender);
    setDoctor(report.doctor);
    setSampleDate(report.sampleDate);
    setTestName(report.test);
    setResults(report.results.length ? report.results : [emptyResult()]);
    setViewReport(null);
    setShowForm(true);
  }

  function handleSave(status: ReportStatus) {
    if (!patient.trim()) {
      alert("Patient name is required.");
      return;
    }

    if (!patientId.trim()) {
      alert("Patient ID is required.");
      return;
    }

    const now = new Date().toLocaleDateString("en-IN");

    const existing = editingId
      ? reports.find((r) => r.id === editingId)
      : undefined;

    const report: Report = {
      id: editingId || `RPT-${Date.now().toString().slice(-8)}`,
      patientId: patientId.trim(),
      patient: patient.trim(),
      age: age.trim(),
      gender,
      doctor: doctor.trim(),
      sampleDate,
      reportedDate: now,
      test: testName,
      status,
      results,
    };

    const next = editingId
      ? reports.map((r) => (r.id === editingId ? report : r))
      : [report, ...reports];

    saveReports(next);

    setShowForm(false);
    setEditingId(null);

    alert(
      status === "Ready"
        ? "Report saved and marked Ready."
        : "Report saved as Draft."
    );
  }

  function printReport(report: Report) {
    setViewReport(report);

    setTimeout(() => {
      window.print();
    }, 200);
  }

  function deleteReport(id: string) {
    if (!window.confirm("Delete this report?")) return;

    const next = reports.filter((r) => r.id !== id);
    saveReports(next);

    if (viewReport?.id === id) {
      setViewReport(null);
    }
  }

  if (viewReport) {
    return (
      <div>
        <div className="mb-5 flex flex-wrap gap-2 print:hidden">
          <button
            onClick={() => setViewReport(null)}
            className="rounded-lg border border-line px-4 py-2 text-sm font-medium"
          >
            ← Back
          </button>

          <button
            onClick={() => editReport(viewReport)}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white"
          >
            Edit Report
          </button>

          <button
            onClick={() => printReport(viewReport)}
            className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white"
          >
            Download / Print PDF
          </button>
        </div>

        <Card className="mx-auto max-w-4xl p-6 print:max-w-none print:border-0 print:shadow-none">
          <div className="border-b border-line pb-5 text-center">
            <h1 className="text-2xl font-bold text-ink">
              MAHI JANCH GHAR
            </h1>
            <p className="text-sm text-ink-soft">AZAD CHOWK, DHAKA</p>
            <p className="mt-1 text-xs text-ink-soft">
              +91 91429 56853 · +91 99348 09413
            </p>
            <p className="text-xs text-ink-soft">
              samiullahabid2005@gmail.com
            </p>

            <h2 className="mt-5 text-lg font-semibold">
              LABORATORY REPORT
            </h2>
          </div>

          <div className="grid gap-3 border-b border-line py-5 sm:grid-cols-2">
            <div>
              <b>Report ID:</b> {viewReport.id}
            </div>
            <div>
              <b>Patient ID:</b> {viewReport.patientId}
            </div>
            <div>
              <b>Patient:</b> {viewReport.patient}
            </div>
            <div>
              <b>Age / Gender:</b> {viewReport.age || "-"} /{" "}
              {viewReport.gender || "-"}
            </div>
            <div>
              <b>Referring Doctor:</b> {viewReport.doctor || "-"}
            </div>
            <div>
              <b>Sample Date:</b> {viewReport.sampleDate || "-"}
            </div>
          </div>

          <div className="py-5">
            <h3 className="mb-3 font-semibold">{viewReport.test}</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="border border-line p-2 text-left">
                      Investigation
                    </th>
                    <th className="border border-line p-2 text-left">
                      Result
                    </th>
                    <th className="border border-line p-2 text-left">
                      Unit
                    </th>
                    <th className="border border-line p-2 text-left">
                      Reference Range
                    </th>
                    <th className="border border-line p-2 text-left">
                      Remarks
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {viewReport.results.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-line p-2">
                        {row.test || "-"}
                      </td>
                      <td className="border border-line p-2 font-semibold">
                        {row.result || "-"}
                      </td>
                      <td className="border border-line p-2">
                        {row.unit || "-"}
                      </td>
                      <td className="border border-line p-2">
                        {row.referenceRange || "-"}
                      </td>
                      <td className="border border-line p-2">
                        {row.remarks || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-line pt-5 text-xs text-ink-soft">
            <p>
              Status: <b>{viewReport.status}</b>
            </p>
            <p className="mt-1">
              Reported Date: {viewReport.reportedDate}
            </p>
            <p className="mt-6">
              This report contains laboratory results entered by authorized
              laboratory personnel.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (showForm) {
    return (
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              {editingId ? "Edit Report" : "Create New Report"}
            </h2>
            <p className="text-sm text-ink-soft">
              Enter patient and laboratory results.
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(false);
              setEditingId(null);
            }}
            className="rounded-lg border border-line px-4 py-2 text-sm"
          >
            Cancel
          </button>
        </div>

        <Card className="p-5">
          <h3 className="font-semibold text-ink">Patient Details</h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium">Patient ID *</span>
              <input
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="PAT-1001"
                className="w-full rounded-lg border border-line px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium">Patient Name *</span>
              <input
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                placeholder="Patient name"
                className="w-full rounded-lg border border-line px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium">Age</span>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="w-full rounded-lg border border-line px-3 py-2"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium">Gender</span>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border border-line px-3 py-2"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium">
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
              <span className="mb-1 block font-medium">Sample Date</span>
              <input
                type="date"
                value={sampleDate}
                onChange={(e) => setSampleDate(e.target.value)}
                className="w-full rounded-lg border border-line px-3 py-2"
              />
            </label>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold text-ink">Investigation</h3>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={loadCpcTemplate}
                type="button"
                className="rounded-lg border border-teal-600 px-3 py-2 text-xs font-medium text-teal-700"
              >
                Load CPC / CBC Template
              </button>

              <button
                onClick={addResultRow}
                type="button"
                className="rounded-lg bg-teal-600 px-3 py-2 text-xs font-medium text-white"
              >
                + Add Test
              </button>
            </div>
          </div>

          <label className="mt-4 block text-sm">
            <span className="mb-1 block font-medium">Test / Package Name</span>
            <input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="CPC / CBC"
              className="w-full rounded-lg border border-line px-3 py-2"
            />
          </label>

          <div className="mt-5 space-y-4">
            {results.map((row, index) => (
              <div
                key={index}
                className="rounded-xl border border-line p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink-soft">
                    TEST {index + 1}
                  </span>

                  {results.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResultRow(index)}
                      className="text-xs font-medium text-danger"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <label className="text-sm">
                    <span className="mb-1 block">Test Name</span>
                    <input
                      value={row.test}
                      onChange={(e) =>
                        updateResult(index, "test", e.target.value)
                      }
                      placeholder="Investigation"
                      className="w-full rounded-lg border border-line px-3 py-2"
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-1 block">Result</span>
                    <input
                      value={row.result}
                      onChange={(e) =>
                        updateResult(index, "result", e.target.value)
                      }
                      placeholder="Enter result"
                      className="w-full rounded-lg border border-line px-3 py-2"
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-1 block">Unit</span>
                    <input
                      value={row.unit}
                      onChange={(e) =>
                        updateResult(index, "unit", e.target.value)
                      }
                      placeholder="Unit"
                      className="w-full rounded-lg border border-line px-3 py-2"
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-1 block">Reference Range</span>
                    <input
                      value={row.referenceRange}
                      onChange={(e) =>
                        updateResult(
                          index,
                          "referenceRange",
                          e.target.value
                        )
                      }
                      placeholder="Lab validated range"
                      className="w-full rounded-lg border border-line px-3 py-2"
                    />
                  </label>

                  <label className="text-sm sm:col-span-2">
                    <span className="mb-1 block">Remarks</span>
                    <input
                      value={row.remarks}
                      onChange={(e) =>
                        updateResult(index, "remarks", e.target.value)
                      }
                      placeholder="Optional"
                      className="w-full rounded-lg border border-line px-3 py-2"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-line pt-5">
            <button
              type="button"
              onClick={() => handleSave("Draft")}
              className="rounded-lg border border-line px-5 py-2 text-sm font-medium"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => handleSave("Ready")}
              className="rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white"
            >
              Save & Mark Ready
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink">Reports</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Create, edit, preview and print laboratory reports.
          </p>
        </div>

        <button
          onClick={openNewReport}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white"
        >
          + New Report
        </button>
      </div>

      <Card className="mt-4 overflow-x-auto">
        {reports.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-medium text-ink">No reports yet</p>
            <p className="mt-1 text-sm text-ink-soft">
              Click “New Report” to create the first report.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-teal-50 text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3">Report ID</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Patient ID</th>
                <th className="px-4 py-3">Test</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {reports.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-data text-xs text-ink-soft">
                    {r.id}
                  </td>

                  <td className="px-4 py-3 font-medium text-ink">
                    {r.patient}
                  </td>

                  <td className="px-4 py-3 text-ink-soft">
                    {r.patientId}
                  </td>

                  <td className="px-4 py-3 text-ink-soft">
                    {r.test}
                  </td>

                  <td className="px-4 py-3 text-ink-soft">
                    {r.reportedDate}
                  </td>

                  <td className="px-4 py-3">
                    <Badge
                      tone={
                        r.status === "Ready" ? "success" : "neutral"
                      }
                    >
                      {r.status}
                    </Badge>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setViewReport(r)}
                        className="rounded-md border border-line px-2 py-1 text-xs"
                      >
                        View
                      </button>

                      <button
                        onClick={() => editReport(r)}
                        className="rounded-md border border-line px-2 py-1 text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => printReport(r)}
                        className="rounded-md bg-ink px-2 py-1 text-xs text-white"
                      >
                        PDF
                      </button>

                      <button
                        onClick={() => deleteReport(r.id)}
                        className="rounded-md px-2 py-1 text-xs text-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <p className="mt-3 text-xs text-ink-soft">
        Reports are currently saved in this browser only. Database storage
        and secure doctor authentication should be added before using real
        patient data.
      </p>
    </div>
  );
}
