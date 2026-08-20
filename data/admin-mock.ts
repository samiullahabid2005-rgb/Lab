export interface MockBookingRow {
  id: string;
  patient: string;
  item: string;
  mode: "Home" | "Lab";
  date: string;
  status: "Pending" | "Sample Collected" | "In Progress" | "Report Ready";
  amount: number;
}

export interface MockPatientRow {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  totalBookings: number;
}

export interface MockReportRow {
  id: string;
  patient: string;
  test: string;
  status: "Pending" | "Ready";
  reportedDate: string;
}

export const mockBookings: MockBookingRow[] = [
  { id: "HP-2026-A1B2C3", patient: "Aarav Singh", item: "Full Body Checkup", mode: "Home", date: "2026-08-20", status: "Report Ready", amount: 1499 },
  { id: "HP-2026-D4E5F6", patient: "Meera Iyer", item: "Diabetes Care Package", mode: "Lab", date: "2026-08-20", status: "In Progress", amount: 799 },
  { id: "HP-2026-G7H8I9", patient: "Rohit Verma", item: "Vitamin D", mode: "Home", date: "2026-08-19", status: "Sample Collected", amount: 900 },
  { id: "HP-2026-J1K2L3", patient: "Sana Sheikh", item: "Thyroid Profile (TSH)", mode: "Home", date: "2026-08-19", status: "Pending", amount: 300 },
  { id: "HP-2026-M4N5O6", patient: "Karan Malhotra", item: "Senior Citizen Package", mode: "Home", date: "2026-08-18", status: "Report Ready", amount: 2199 },
  { id: "HP-2026-P7Q8R9", patient: "Divya Nair", item: "Basic Health Checkup", mode: "Lab", date: "2026-08-18", status: "Report Ready", amount: 499 },
  { id: "HP-2026-S1T2U3", patient: "Farhan Ali", item: "Lipid Profile", mode: "Home", date: "2026-08-17", status: "In Progress", amount: 450 },
  { id: "HP-2026-V4W5X6", patient: "Priya Patel", item: "Women's Health Package", mode: "Home", date: "2026-08-17", status: "Report Ready", amount: 1299 },
];

export const mockPatients: MockPatientRow[] = [
  { id: "PT1001", name: "Aarav Singh", age: 34, gender: "Male", lastVisit: "2026-08-20", totalBookings: 4 },
  { id: "PT1002", name: "Meera Iyer", age: 41, gender: "Female", lastVisit: "2026-08-20", totalBookings: 2 },
  { id: "PT1003", name: "Rohit Verma", age: 28, gender: "Male", lastVisit: "2026-08-19", totalBookings: 1 },
  { id: "PT1004", name: "Sana Sheikh", age: 36, gender: "Female", lastVisit: "2026-08-19", totalBookings: 3 },
  { id: "PT1005", name: "Karan Malhotra", age: 67, gender: "Male", lastVisit: "2026-08-18", totalBookings: 6 },
  { id: "PT1006", name: "Divya Nair", age: 25, gender: "Female", lastVisit: "2026-08-18", totalBookings: 1 },
];

export const mockReports: MockReportRow[] = [
  { id: "RPT5001", patient: "Aarav Singh", test: "Full Body Checkup", status: "Ready", reportedDate: "2026-08-20" },
  { id: "RPT5002", patient: "Meera Iyer", test: "Diabetes Care Package", status: "Ready", reportedDate: "2026-08-14" },
  { id: "RPT5003", patient: "Rohit Verma", test: "Vitamin D", status: "Pending", reportedDate: "—" },
  { id: "RPT5004", patient: "Sana Sheikh", test: "Thyroid Profile", status: "Pending", reportedDate: "—" },
  { id: "RPT5005", patient: "Karan Malhotra", test: "Senior Citizen Package", status: "Ready", reportedDate: "2026-08-18" },
];

export function dashboardStats() {
  const today = "2026-08-20";
  return {
    totalBookings: mockBookings.length + 142,
    todaysBookings: mockBookings.filter((b) => b.date === today).length,
    totalPatients: mockPatients.length + 58,
    pendingReports: mockReports.filter((r) => r.status === "Pending").length + 3,
  };
}
