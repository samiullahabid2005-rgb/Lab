# HealthPath Diagnostics

A modern, responsive diagnostic laboratory website demo — built with Next.js, TypeScript, and Tailwind CSS.
100% free to run: no paid APIs, no paid database, all data is local/mock.

> **This is a demo project.** All patient data, doctors, bookings, and reports are fictional sample data
> for demonstration purposes only. It is not a real laboratory and must not be used to provide actual
> medical services or diagnoses without substantial further work (real backend, real authentication,
> real compliance review, etc).

## 1. Installation

```bash
npm install
```

## 2. Development

```bash
npm run dev
```

Visit http://localhost:3000

## 3. Build

```bash
npm run build
```

## 4. Deploying to Vercel (free)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Next.js** (auto-detected). No environment variables are required.
4. Click **Deploy**. That's it — no paid add-ons needed.

You can deploy the same way to Netlify (`Next.js` build preset) or any Node-compatible static host.

## 5. Admin demo login

Go to `/admin`.

- **Username:** `admin`
- **Password:** `demo1234`

This is a front-end-only demo login (stored in `sessionStorage`, no real backend authentication). Do not
reuse these credentials for anything real. Edit them in `data/site-config.ts` under `admin`.

## 6. Where to edit content

Everything is centralized in the `data/` folder so you can rebrand or restock the catalog without touching
component code:

| What you want to change | File |
|---|---|
| Lab name, tagline, phone, email, address, working hours, social links, stats, admin demo credentials | `data/site-config.ts` |
| Tests, prices, reference ranges, categories, sample types, preparation instructions | `data/tests.ts` |
| Health packages, included tests, pricing/discounts | `data/packages.ts` |
| Doctors, testimonials, FAQs | `data/doctors.ts` |
| Demo report data used by the Reports lookup page | `lib/mock-reports.ts` |
| Mock admin dashboard numbers (bookings/patients/reports) | `data/admin-mock.ts` |

Prices are in INR (₹) and formatted via `lib/utils.ts` (`formatINR`) — change the locale/currency there if
you need a different currency.

## 7. Project structure

```
app/                  Next.js App Router pages
  tests/              Tests listing + [id] detail pages
  packages/            Packages listing + [slug] detail pages
  book/                Multi-step booking flow
  reports/             Report lookup (demo data)
  reference-values/    Searchable reference-range table
  doctors/, about/, contact/, admin/
components/
  ui/                  Button, Field, Modal, Toast, States, Layout primitives
  layout/              Navbar, Footer
  home/                Homepage sections
  tests/, packages/, doctors/, booking/, reports/, admin/
data/                  All editable content (see table above)
lib/                   Utilities, mock storage, mock report data
types/                 Shared TypeScript types
```

## 8. Notes on scope

- Bookings made through `/book` are stored in the browser's `localStorage` only (see
  `lib/mock-storage.ts`) — there is no real backend, database, or payment processor.
- The Reports page only recognizes the two demo Patient ID / Report ID pairs shown on the page itself.
- Certifications and doctor registration numbers are explicitly labeled as placeholders — replace them
  with real credentials before using this for an actual laboratory.
- Reference ranges throughout the site are example/educational values and are labeled as such; they are
  not the official ranges of any real laboratory and should not be used for self-diagnosis.
