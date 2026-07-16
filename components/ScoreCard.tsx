"use client";

import { useLanguage } from "@/lib/i18n";
import type { Report } from "@/lib/types";

function matchLabel(
  score: number | null,
  t: (key: "score.goodMatch" | "score.partialMatch" | "score.poorMatch") => string
): { text: string; className: string } {
  if (score === null) return { text: "", className: "" };
  if (score >= 70) return { text: t("score.goodMatch"), className: "text-green-600" };
  if (score >= 50) return { text: t("score.partialMatch"), className: "text-orange-500" };
  return { text: t("score.poorMatch"), className: "text-red-500" };
}

interface ScoreCardProps {
  report: Report;
}

export default function ScoreCard({ report }: ScoreCardProps) {
  const { t } = useLanguage();
  const label = matchLabel(report.score_before, t);
  const approved = report.quality?.approved ?? true;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-800">{t("score.reportTitle")}</h2>
        <p className={`mt-2 font-medium ${approved ? "text-green-600" : "text-orange-600"}`}>
          {report.summary_for_user}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">{t("score.atsLabel")}</p>
        <div className="flex items-baseline justify-center gap-2">
          <p className="text-3xl font-bold text-slate-400 line-through decoration-2">{report.score_before}%</p>
          <span className="text-slate-300">→</span>
          <p className="text-5xl font-extrabold text-green-600">{report.score_after ?? report.score_before}%</p>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {report.matched_skills.length} {t("score.matchedSkills")}
        </p>
        {label.text && <p className={`text-sm font-semibold mt-2 ${label.className}`}>{label.text}</p>}
      </div>
    </div>
  );
}
