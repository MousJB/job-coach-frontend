"use client";

import { useEffect, useRef, useState } from "react";

import OptimizeForm from "@/components/OptimizeForm";
import ResultsPanel from "@/components/ResultsPanel";
import { ApiError, streamOptimize } from "@/lib/api";
import { safeGet, safeRemove, safeSet } from "@/lib/storage";
import { PIPELINE_STEPS, type PipelineEvent, type PipelineStepKey, type Report } from "@/lib/types";

interface DraftTexts {
  cvText: string;
  jobText: string;
}

export default function Home() {
  const [cvText, setCvText] = useState("");
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<PipelineStepKey[]>([]);
  const [errorStep, setErrorStep] = useState<PipelineStepKey | null>(null);

  const isSubmittingRef = useRef(false);

  // Restaure les derniers résultats / textes saisis : évite de perdre le
  // travail en cours quand on revient depuis /cv ou /letter (le composant
  // est remonté à neuf par la navigation, l'état React seul ne suffit pas).
  useEffect(() => {
    const lastReport = safeGet<Report>("last_report");
    if (lastReport) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReport(lastReport);
      return;
    }
    const draft = safeGet<DraftTexts>("draft_texts");
    if (draft) {
      setCvText(draft.cvText);
      setJobText(draft.jobText);
    }
  }, []);

  useEffect(() => {
    if (report) return;
    safeSet("draft_texts", { cvText, jobText });
  }, [cvText, jobText, report]);

  const handleOptimize = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    setLoading(true);
    setError(null);
    setErrorStep(null);
    setCompletedSteps([]);
    setReport(null);

    const doneSteps: PipelineStepKey[] = [];

    try {
      const finalReport = await streamOptimize(cvText, jobText, {
        onEvent: (event: PipelineEvent) => {
          if (event.step === "error") {
            // L'étape qui a échoué est la suivante après la dernière terminée avec succès.
            setErrorStep(PIPELINE_STEPS[doneSteps.length] ?? null);
            return;
          }
          if (event.step !== "complete") {
            doneSteps.push(event.step as PipelineStepKey);
            setCompletedSteps([...doneSteps]);
          }
        },
      });
      setReport(finalReport);
      safeSet("last_report", finalReport);
      safeRemove("draft_texts");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Erreur lors de l'optimisation.";
      setError(message);
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
    setCompletedSteps([]);
    setErrorStep(null);
    setCvText("");
    setJobText("");
    safeRemove("last_report");
    safeRemove("draft_texts");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Job Coach <span className="text-blue-600">AI</span> 🚀
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Adaptez votre candidature en quelques instants.</p>
        </header>

        {!report && (
          <OptimizeForm
            cvText={cvText}
            jobText={jobText}
            onCvTextChange={setCvText}
            onJobTextChange={setJobText}
            onSubmit={handleOptimize}
            loading={loading}
            error={error}
            onRetry={handleOptimize}
            completedSteps={completedSteps}
            errorStep={errorStep}
          />
        )}

        {report && <ResultsPanel report={report} onReset={handleReset} />}
      </div>
    </main>
  );
}
