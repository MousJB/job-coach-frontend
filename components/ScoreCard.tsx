"use client";

import type { Report } from "@/lib/types";

function matchLabel(score: number | null): { text: string; className: string } {
  if (score === null) return { text: "", className: "" };
  if (score >= 70) return { text: "✅ Bon match", className: "text-green-600" };
  if (score >= 50) return { text: "⚠️ Match partiel", className: "text-orange-500" };
  return { text: "❌ Offre peu adaptée à votre profil", className: "text-red-500" };
}

interface ScoreCardProps {
  report: Report;
}

export default function ScoreCard({ report }: ScoreCardProps) {
  const label = matchLabel(report.score_before);
  const approved = report.quality?.approved ?? true;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">Rapport d&apos;optimisation</h2>
        <p className={`mt-2 font-medium ${approved ? "text-green-600" : "text-orange-600"}`}>
          {report.summary_for_user}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">Score ATS</p>
        <div className="flex items-baseline justify-center gap-2">
          <p className="text-3xl font-bold text-slate-400 line-through decoration-2">{report.score_before}%</p>
          <span className="text-slate-300">→</span>
          <p className="text-5xl font-extrabold text-green-600">{report.score_after ?? report.score_before}%</p>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {report.matched_skills.length} compétence{report.matched_skills.length > 1 ? "s" : ""} matchée
          {report.matched_skills.length > 1 ? "s" : ""}
        </p>
        {label.text && <p className={`text-sm font-semibold mt-2 ${label.className}`}>{label.text}</p>}
      </div>
    </div>
  );
}
