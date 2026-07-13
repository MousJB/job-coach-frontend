"use client";

import { PIPELINE_STEPS, STEP_LABELS, type PipelineStepKey } from "@/lib/types";

interface ProgressStepsProps {
  completedSteps: PipelineStepKey[];
  errorStep?: PipelineStepKey | null;
}

export default function ProgressSteps({ completedSteps, errorStep }: ProgressStepsProps) {
  const completedSet = new Set(completedSteps);
  const currentIndex = completedSteps.length;

  return (
    <ul className="space-y-3" aria-live="polite" aria-label="Progression de l'optimisation">
      {PIPELINE_STEPS.map((step, index) => {
        const isDone = completedSet.has(step);
        const isError = errorStep === step;
        const isCurrent = !isDone && !errorStep && index === currentIndex;

        const badgeClass = isError
          ? "bg-red-100 text-red-600"
          : isDone
            ? "bg-green-100 text-green-600"
            : isCurrent
              ? "bg-blue-100 text-blue-600 animate-pulse"
              : "bg-slate-100 text-slate-400";

        const labelClass = isError
          ? "text-red-600 font-medium"
          : isDone
            ? "text-slate-700"
            : isCurrent
              ? "text-slate-900 font-medium"
              : "text-slate-400";

        return (
          <li key={step} className="flex items-center gap-3 text-sm">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${badgeClass}`}
              aria-hidden="true"
            >
              {isError ? "!" : isDone ? "✓" : index + 1}
            </span>
            <span className={labelClass}>{STEP_LABELS[step as PipelineStepKey]}</span>
          </li>
        );
      })}
    </ul>
  );
}
