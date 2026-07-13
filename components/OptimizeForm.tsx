"use client";

import ProgressSteps from "./ProgressSteps";
import type { PipelineStepKey } from "@/lib/types";

const MAX_LENGTH = 20000;
const MIN_LENGTH = 50;

interface OptimizeFormProps {
  cvText: string;
  jobText: string;
  onCvTextChange: (value: string) => void;
  onJobTextChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  completedSteps: PipelineStepKey[];
  errorStep: PipelineStepKey | null;
}

export default function OptimizeForm({
  cvText,
  jobText,
  onCvTextChange,
  onJobTextChange,
  onSubmit,
  loading,
  error,
  onRetry,
  completedSteps,
  errorStep,
}: OptimizeFormProps) {
  const tooShort = cvText.length > 0 && cvText.length < MIN_LENGTH;
  const jobTooShort = jobText.length > 0 && jobText.length < MIN_LENGTH;
  const canSubmit = !loading && cvText.length >= MIN_LENGTH && jobText.length >= MIN_LENGTH;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <label htmlFor="cv-text" className="block text-sm font-semibold text-slate-700 mb-2">
          1. Collez votre CV
        </label>
        <textarea
          id="cv-text"
          className="w-full h-72 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-800 bg-slate-50"
          value={cvText}
          onChange={(e) => onCvTextChange(e.target.value)}
          maxLength={MAX_LENGTH}
          disabled={loading}
          placeholder="Copiez-collez le texte intégral de votre CV ici..."
        />
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-orange-500">{tooShort ? "Encore un peu court pour une bonne analyse." : ""}</span>
          <span className="text-slate-400">
            {cvText.length} / {MAX_LENGTH}
          </span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <label htmlFor="job-text" className="block text-sm font-semibold text-slate-700 mb-2">
          2. Collez l&apos;offre d&apos;emploi
        </label>
        <textarea
          id="job-text"
          className="w-full h-72 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-800 bg-slate-50"
          value={jobText}
          onChange={(e) => onJobTextChange(e.target.value)}
          maxLength={MAX_LENGTH}
          disabled={loading}
          placeholder="Copiez-collez le texte de l'offre d'emploi ici..."
        />
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-orange-500">{jobTooShort ? "Encore un peu court pour une bonne analyse." : ""}</span>
          <span className="text-slate-400">
            {jobText.length} / {MAX_LENGTH}
          </span>
        </div>
      </div>

      <div className="md:col-span-2 text-center">
        {!loading && (
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
          >
            Optimiser ma candidature ✨
          </button>
        )}

        {loading && (
          <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-left">
            <p className="text-center text-sm font-semibold text-slate-700 mb-4">Optimisation en cours...</p>
            <ProgressSteps completedSteps={completedSteps} errorStep={errorStep} />
          </div>
        )}

        {error && (
          <div className="mt-4" role="alert">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={onRetry}
              className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
