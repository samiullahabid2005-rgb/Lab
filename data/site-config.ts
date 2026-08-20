// SITE CONFIG — edit everything about the lab's identity & contact info here.
// ---------------------------------------------------------------------------
export const siteConfig = {
  name: "MAHI JANCH GHAR",
  shortName: "MAHI JANCH GHAR",
  tagline: "Accurate Testing. Better Health.",
  description:
    "MAHI JANCH GHAR is a diagnostic laboratory offering blood tests, health checkup packages, and reliable reporting.",
  url: "https://lab-kappa-rose.vercel.app",

  contact: {
    phone: "+91 91429 56853",
    phone2: "+91 99348 09413",
    whatsapp: "+91 99348 09413",
    email: "samiullahabid2005@gmail.com",
    addressLine1: "AZAD CHOWK, DHAKA",
    addressLine2: "",
    workingHours: [
      { days: "Monday – Saturday", hours: "6:00 AM – 9:00 PM" },
      { days: "Sunday", hours: "7:00 AM – 1:00 PM" },
    ],
    mapQuery: "AZAD CHOWK, DHAKA",
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
    demoUsername: "doctor",
    demoPassword: "ChangeMe123!",
  },
} as const;
