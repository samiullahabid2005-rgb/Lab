import { Doctor, Testimonial, FaqItem } from "@/types";

// All names below are fictional demo profiles created for this project.
export const doctors: Doctor[] = [
  {
    id: "dr-anjali-mehra",
    name: "Dr. Anjali Mehra",
    qualification: "MD (Pathology)",
    specialization: "Clinical Pathology & Hematology",
    experienceYears: 14,
    bio: "Oversees hematology and clinical chemistry reporting, with a focus on quality control across the panel.",
    registrationPlaceholder: "Registration No. [PLACEHOLDER — add real registration]",
  },
  {
    id: "dr-rohan-kapoor",
    name: "Dr. Rohan Kapoor",
    qualification: "MD (Biochemistry)",
    specialization: "Clinical Biochemistry",
    experienceYears: 11,
    bio: "Leads biochemistry reporting for liver, kidney, and lipid panels, with an interest in metabolic health.",
    registrationPlaceholder: "Registration No. [PLACEHOLDER — add real registration]",
  },
  {
    id: "dr-neha-sharma",
    name: "Dr. Neha Sharma",
    qualification: "MD (Microbiology)",
    specialization: "Microbiology & Infectious Disease Testing",
    experienceYears: 9,
    bio: "Supervises culture and infection-marker testing with an emphasis on rapid, accurate turnaround.",
    registrationPlaceholder: "Registration No. [PLACEHOLDER — add real registration]",
  },
  {
    id: "dr-vikram-rao",
    name: "Dr. Vikram Rao",
    qualification: "DM (Endocrinology)",
    specialization: "Endocrinology & Hormone Testing",
    experienceYears: 16,
    bio: "Advises on thyroid and hormone panel design, and reviews complex endocrine test results.",
    registrationPlaceholder: "Registration No. [PLACEHOLDER — add real registration]",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya S.",
    location: "Delhi",
    rating: 5,
    quote:
      "Booked a home collection in under two minutes and had my report the same evening. Very smooth experience.",
  },
  {
    id: "t2",
    name: "Arjun M.",
    location: "Mumbai",
    rating: 5,
    quote: "The full body checkup package was well organized and the phlebotomist arrived right on time.",
  },
  {
    id: "t3",
    name: "Fatima K.",
    location: "Hyderabad",
    rating: 4,
    quote: "Clear reports with reference ranges explained. Made it easy to discuss results with my doctor.",
  },
  {
    id: "t4",
    name: "Suresh N.",
    location: "Bengaluru",
    rating: 5,
    quote: "Booked my father's senior citizen package — the staff was patient and the process was hassle-free.",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "How do I book a test or health package?",
    answer:
      "Choose a test or package, click Book Now, fill in patient details, pick home collection or a lab visit, then select a date and time slot. You'll get a confirmation with a booking ID.",
  },
  {
    id: "f2",
    question: "Is home sample collection available everywhere?",
    answer:
      "Home collection is available across most serviceable areas. You can choose between home collection or visiting the laboratory directly during booking.",
  },
  {
    id: "f3",
    question: "How long does it take to get my report?",
    answer:
      "Report time varies by test, typically between 4 and 48 hours. The expected time is shown on every test and package page before you book.",
  },
  {
    id: "f4",
    question: "Do I need to fast before my test?",
    answer:
      "Some tests, like fasting blood glucose or a lipid profile, require 8–12 hours of fasting. Preparation instructions are listed on each test's detail page.",
  },
  {
    id: "f5",
    question: "How do I view or download my report?",
    answer:
      "Go to the Reports page and enter your Patient ID and Report ID to view a demo report. A PDF download option is available once your report is ready.",
  },
  {
    id: "f6",
    question: "Can I reschedule or cancel a booking?",
    answer:
      "Yes. Contact our support team using the number or email on the Contact page with your booking ID to reschedule or cancel.",
  },
];
