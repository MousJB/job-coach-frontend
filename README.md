# Job Coach AI — Frontend

Next.js frontend for [Job Coach AI](https://github.com/MousJB/job-coach-ai): a tool that generates a tailored, rewritten CV and cover letter for a given job posting.

Live: https://job-coach-frontend-theta.vercel.app

## What it does

- Users submit their CV and a target job offer.
- The [job-coach-ai](https://github.com/MousJB/job-coach-ai) FastAPI backend runs a 9-step pipeline (extraction, analysis, ATS matching, strategy, rewriting, quality control) and returns an optimized CV and cover letter.
- This app renders the flow: CV upload/edit (`/cv`), generated cover letter (`/letter`), plus legal pages (terms, privacy, mentions légales) and an English locale (`/en`).

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Configure the backend API URL in `.env` (see `.env.example`).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm run start` — production build and serve
- `npm run lint` — run ESLint
