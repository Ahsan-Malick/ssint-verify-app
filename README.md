# SSINT Registry

**Verified. Secured. Trusted.**

SSINT Registry is a full-stack web application for **trading card grading, certification, and authenticity verification** — built as an independent, PSA/BGS-style grading registry. It lets collectors submit cards for AI-assisted condition grading, generates detailed, downloadable grading reports, and gives anyone a public lookup tool to verify a certificate by its unique SSINT ID.

Live product concept: a collector submits a card → the system (or an internal AI grading pipeline) evaluates front and back condition → a permanent, publicly verifiable certificate and PDF grading report are issued, complete with population (pop) report statistics.

---

## Key Features

### 🔍 Public Certificate Verification
- Lookup any graded card instantly by its **SSINT ID**.
- Displays authenticated card details, images, and grade — protecting buyers/sellers from counterfeit or misrepresented cards.
- Graceful "certificate not found" handling for invalid/unknown IDs.

### 🤖 AI-Assisted Grading Report
- Full **grading report** generated per card, analyzing both the **front and back** independently across four criteria: **Corners, Edges, Surface, and Centering**.
- Deterministic, transparent **grade calculation engine**:
  - Per-side grade = average of the 4 sub-scores.
  - Final grade = **60% front + 40% back**, with a fairness adjustment that rounds a raw `.75` result down to `.5` instead of up to a full point.
- Interactive **"View Grade Calculations"** modal that shows the exact math behind every published grade, for full transparency to the collector.
- Detailed **damage breakdown** per category (major / minor / major-plus damage counts) and **centering ratio** (e.g. `55/45`) for both sides of the card.

### 📄 Downloadable PDF Reports
- One-click **export of the full grading report to PDF** directly from the browser (`html2canvas` + `jsPDF`), preserving layout, images, and branding for sharing or archival.

### 📊 Population (Pop) Report Logic
- Automatically tracks how many copies of the *same card* (same name, set, year, and number) have been graded.
- Calculates **population count** and **"population higher"** (how many graded copies scored higher), mirroring the population reports used by major third-party grading companies — useful for collectors assessing rarity and value.

### 🗂️ Certificate & Media Management (Admin)
- Internal, obfuscated admin route for **adding new certificates**, including card metadata (name, number, set, year, publisher, grade, additional notes) and front/back images.
- Duplicate-safe: prevents re-creating a certificate for an SSINT ID that already exists.
- Separate endpoint to attach/replace front and back images on an existing certificate after creation.
- Image uploads are stored in cloud object storage and served via public view URLs.

### 💬 User Feedback Loop
- Built-in **feedback modal** so collectors can report AI grading discrepancies or general feedback.
- Feedback is persisted to the database for review, closing the loop between AI output and human oversight.

### ✨ Polished, Animated UI/UX
- Smooth scroll-triggered and staggered animations (GSAP + ScrollTrigger/ScrollToPlugin) across the landing page.
- Responsive, modern design system built with Tailwind CSS and a custom component library (cards, badges, inputs, forms, toasts) based on Radix UI primitives and `shadcn/ui` conventions.
- Loading states, toasts, and empty/error states handled throughout the certificate and report flows.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript |
| **Styling / UI** | Tailwind CSS, Radix UI primitives, custom `shadcn/ui`-style component library, Lucide icons |
| **Animation** | GSAP (ScrollTrigger, ScrollToPlugin), Framer Motion |
| **Backend / API** | Next.js Route Handlers (REST-style API routes) |
| **Database & Storage** | [Appwrite](https://appwrite.io) (Databases + Cloud Storage) via `appwrite` (client SDK) and `node-appwrite` (server SDK) |
| **Forms & Validation** | React Hook Form + Zod, `@hookform/resolvers` |
| **PDF / Export** | `jspdf`, `html2canvas-pro` |
| **Data handling** | `formidable` (multipart form parsing), `xlsx` (spreadsheet import/export) |
| **Notifications** | `react-toastify` |
| **Analytics** | Vercel Analytics |
| **Tooling** | ESLint, PostCSS, TypeScript strict config |

> Note: `mongoose` is included as a dependency for potential MongoDB-backed extensions, though the current data layer is powered by Appwrite.

---

## Architecture Overview

```
app/
├── page.tsx                     # Root entry → renders the landing/home experience
├── new/page.tsx                 # Landing page: hero, certificate lookup, report lookup, feedback CTA
├── certificate/page.tsx         # Public certificate viewer (reads cert data from query params)
├── final-report/[ssintId]/      # Full AI grading report for a given SSINT ID
│   ├── layout.tsx                #   Fetches report data, PDF export, provider wiring
│   ├── components/                #   CardDetails, CenteringDetails, DamageBreakDown, GradeCalculationsModal, Header
│   ├── context/                   #   React context for the loaded trading-card report
│   └── util/                      #   Grade color coding, severity labels, image → base64 helpers
├── addCertDetailsxs191x/         # Internal admin route for registering new certificates
├── allpages/                     # Shared page-level components (cert input, image upload, feedback modal, viewer)
├── api/
│   ├── addCertificate/            # Create a new certificate (+ population/pop-higher calculation)
│   ├── add-cert-image/            # Attach/replace front & back images for an existing certificate
│   ├── add-cert-no-image/         # Create/update certificate data without images
│   ├── getCertificate/[ssintId]/  # Public certificate lookup by SSINT ID
│   ├── get-final-data/[ssintId]/  # Fetch full grading report payload for the report page
│   └── submit-feedback/           # Store user feedback on AI grading
├── appwrite/config.ts            # Appwrite client (Databases, Storage, Account) initialization
└── conf/config.ts                # Centralized environment configuration

components/
├── ui/                           # Reusable design-system primitives (button, card, input, form, badge, etc.)
├── FeedbackModal.tsx             # Feedback submission dialog
└── certNotFound.tsx              # Empty-state for invalid certificate lookups
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- An [Appwrite](https://appwrite.io) project with a database, two collections (certificates + customer feedback), and a storage bucket configured.

### Environment Variables
Create a `.env` file in the project root:

```bash
NEXT_PUBLIC_APPWRITE_URL=
NEXT_PUBLIC_APPWRITE_PROJECTID=
NEXT_DATABASE_ID=
NEXT_COLLECTION_ID=
NEXT_COLLECTION_ID_CERT=
NEXT_BUCKET_ID=
NEXT_APPWRITE_API_KEY=
```

### Installation & Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Other Scripts

```bash
npm run build   # Production build
npm run start   # Start the production server
npm run lint    # Run ESLint
```

---

## Deployment

Built for seamless deployment on [Vercel](https://vercel.com), with Vercel Analytics already integrated.

---

## About This Project

SSINT Registry was built end-to-end — architecture, database schema, API design, grading logic, PDF report generation, and UI/UX — as a demonstration of shipping a production-style SaaS product with Next.js: real-world CRUD flows, cloud storage integration, computed business logic (grading & population statistics), and a polished, animated front end.
