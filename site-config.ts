// ---------------------------------------------------------------------------
// SITE CONFIG — edit everything about the lab's identity & contact info here.
// This is the single source of truth referenced across the whole app.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "HealthPath Diagnostics",
  shortName: "HealthPath",
  tagline: "Accurate Testing. Better Health.",
  description:
    "HealthPath Diagnostics is a modern diagnostic laboratory offering blood tests, health checkup packages, and home sample collection with fast, reliable reporting.",
  url: "https://healthpath-diagnostics.example.com",

  contact: {
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "care@healthpathdiagnostics.example",
    addressLine1: "204, Wellness Arcade, Sector 18",
    addressLine2: "Near Metro Station, Delhi, 110018",
    workingHours: [
      { days: "Monday – Saturday", hours: "6:00 AM – 9:00 PM" },
      { days: "Sunday", hours: "7:00 AM – 1:00 PM" },
    ],
    mapQuery: "Sector 18, Delhi",
  },

  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
    linkedin: "https://linkedin.com/",
  },

  stats: [
    { label: "Tests Performed", value: "12L+" },
    { label: "Cities Served", value: "40+" },
    { label: "Partner Doctors", value: "180+" },
    { label: "Avg. Report Time", value: "6 hrs" },
  ],

  admin: {
    demoUsername: "admin",
    demoPassword: "demo1234",
  },
} as const;
