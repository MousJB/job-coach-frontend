"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ScoreCard from "./ScoreCard";
import { useLanguage } from "@/lib/i18n";
import { safeSet } from "@/lib/storage";
import type { Report } from "@/lib/types";

interface ResultsPanelProps {
  report: Report;
  onReset: () => void;
}

export default function ResultsPanel({ report, onReset }: ResultsPanelProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string>("");

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const openCv = () => {
    if (report.cv_rewritten) safeSet("cv_result", report.cv_rewritten);
    router.push("/cv");
  };

  const openLetter = () => {
    if (report.letter) safeSet("letter_result", report.letter);
    if (report.cv_rewritten) safeSet("cv_result", report.cv_rewritten);
    router.push("/letter");
  };

  const quality = report.quality;
  const cv = report.cv_rewritten;
  const letter = report.letter;

  return (
    <div className="space-y-8">
      <div className="text-right">
        <button
          onClick={onReset}
          className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors"
        >
          {t("results.newOptimization")}
        </button>
      </div>

      <ScoreCard report={report} />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-800">{t("results.cvTitle")}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => cv && handleCopy(`${cv.summary ?? ""}\n\n${cv.skills.join(", ")}`, "cv")}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-lg transition-colors"
              >
                {copied === "cv" ? t("results.copied") : t("results.copy")}
              </button>
              <button
                onClick={openCv}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
              >
                {t("results.viewDownload")}
              </button>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 space-y-4 h-96 overflow-y-auto">
            {cv?.summary && (
              <p className="font-medium text-slate-900 border-l-4 border-blue-500 pl-3 italic">{cv.summary}</p>
            )}
            {cv && cv.skills.length > 0 && (
              <div>
                <p className="font-semibold text-slate-800 mb-2">{t("results.keySkills")}</p>
                <div className="flex flex-wrap gap-2">
                  {cv.skills.map((skill, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-800">{t("results.letterTitle")}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => letter && handleCopy(letter.body, "letter")}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-lg transition-colors"
              >
                {copied === "letter" ? t("results.copied") : t("results.copy")}
              </button>
              <button
                onClick={openLetter}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
              >
                {t("results.viewDownload")}
              </button>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 whitespace-pre-wrap h-96 overflow-y-auto font-serif leading-relaxed">
            {letter?.body}
          </div>
        </div>
      </div>

      {quality && !quality.approved && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl" aria-hidden="true">
              ⚠️
            </span>
            <h3 className="font-bold text-orange-800 text-lg">{t("results.warningsTitle")}</h3>
          </div>
          <p className="text-orange-700 text-sm mb-4">{t("results.warningsIntro")}</p>
          <ul className="list-disc list-inside space-y-2 text-orange-700 text-sm font-medium bg-white/50 p-4 rounded-lg">
            {quality.hallucinations_detected.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {report.missing_skills.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-3">{t("results.missingSkillsTitle")}</h3>
          <div className="flex flex-wrap gap-2">
            {report.missing_skills.map((skill, i) => (
              <span key={i} className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
