import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Coach AI — Optimize your job application",
  description:
    "Tailor your resume and generate a personalized cover letter for every job posting, in seconds.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
