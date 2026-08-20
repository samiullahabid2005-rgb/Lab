export type SampleType =
  | "Blood"
  | "Urine"
  | "Stool"
  | "Saliva"
  | "Swab";

export type TestCategory =
  | "Blood Tests"
  | "Diabetes"
  | "Thyroid"
  | "Liver"
  | "Kidney"
  | "Vitamins"
  | "Hormones"
  | "Lipid Profile"
  | "Full Body Checkup";

export interface ReferenceBand {
  /** e.g. "Adult Male", "Adult Female", "Child (1-12y)", "General" */
  group: string;
  low: number | null;
  high: number | null;
  text: string; // human readable range, e.g. "13.5 - 17.5 g/dL"
}

export interface LabTest {
  id: string;
  name: string;
  abbreviation: string;
  category: TestCategory;
  panel?: string; // e.g. "Complete Blood Count (CBC)"
  unit: string;
  referenceRanges: ReferenceBand[];
  sampleType: SampleType;
  fasting: boolean;
  preparation: string;
  whyDone: string;
  description: string;
  reportTimeHours: number; // e.g. 6, 24, 48
  price: number; // INR
  discountPrice?: number;
  popular?: boolean;
}

export interface HealthPackage {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  testIds: string[];
  price: number;
  originalPrice: number;
  reportTimeHours: number;
  recommendedFor: string;
  popular?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  registrationPlaceholder: string; // clearly a placeholder, not real registration
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type BookingMode = "home" | "lab";

export interface PatientDetails {
  name: string;
  age: string;
  gender: "Male" | "Female" | "Other" | "";
  phone: string;
  email: string;
  address: string;
}

export interface Booking {
  bookingId: string;
  itemType: "test" | "package";
  itemId: string;
  itemName: string;
  price: number;
  patient: PatientDetails;
  mode: BookingMode;
  date: string;
  timeSlot: string;
  status: "Pending" | "Sample Collected" | "In Progress" | "Report Ready";
  createdAt: string;
}

export type ResultFlag = "low" | "normal" | "high";

export interface ReportResultRow {
  testId: string;
  testName: string;
  result: number;
  unit: string;
  referenceLow: number | null;
  referenceHigh: number | null;
  referenceText: string;
  flag: ResultFlag;
}

export interface DemoReport {
  reportId: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  collectedDate: string;
  reportedDate: string;
  panelName: string;
  doctorName: string;
  results: ReportResultRow[];
}
