import type { Lang } from "./i18n";
import type { CV, Letter, LetterSender, PipelineEvent, Report } from "./types";

export class ApiError extends Error {
  status?: number;
  errorCode?: string;

  constructor(message: string, opts?: { status?: number; errorCode?: string }) {
    super(message);
    this.name = "ApiError";
    this.status = opts?.status;
    this.errorCode = opts?.errorCode;
  }
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://job-coach-ai-ncv3.onrender.com").replace(
  /\/$/,
  ""
);

// Le pipeline complet enchaîne plusieurs appels LLM (jusqu'à 8, dont certains
// avec un modèle "thinking" lent) : la durée totale peut légitimement dépasser
// 3-4 minutes. On utilise donc un timeout d'INACTIVITÉ (réinitialisé à chaque
// octet reçu du flux) plutôt qu'un délai fixe sur la requête entière — tant que
// le serveur envoie des données, on sait que le pipeline progresse encore.
const INACTIVITY_TIMEOUT_MS = 90_000;
// Filet de sécurité absolu, au cas où le flux resterait actif sans jamais finir.
const HARD_CEILING_MS = 10 * 60_000;

interface StreamOptimizeOptions {
  onEvent?: (event: PipelineEvent) => void;
  signal?: AbortSignal;
  timeoutMs?: number;
  language?: Lang;
}

function buildFileName(...parts: (string | null | undefined)[]): string {
  const safe = parts
    .filter(Boolean)
    .join("_")
    .replace(/[^A-Za-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `${safe || "document"}.pdf`;
}

async function parseErrorResponse(response: Response, fallback: string): Promise<ApiError> {
  try {
    const data = await response.json();
    return new ApiError(data.detail || fallback, { status: response.status, errorCode: data.error_code });
  } catch {
    return new ApiError(fallback, { status: response.status });
  }
}

/**
 * Lance l'optimisation et consomme le flux SSE du backend (/optimize/stream),
 * en notifiant `onEvent` à chaque étape terminée. Résout avec le rapport final.
 */
export async function streamOptimize(
  cvText: string,
  jobText: string,
  options: StreamOptimizeOptions = {}
): Promise<Report> {
  const controller = new AbortController();
  let timedOut = false;

  const hardCeilingId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, HARD_CEILING_MS);

  let inactivityId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, options.timeoutMs ?? INACTIVITY_TIMEOUT_MS);

  const resetInactivityTimer = () => {
    clearTimeout(inactivityId);
    inactivityId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, options.timeoutMs ?? INACTIVITY_TIMEOUT_MS);
  };

  const clearAllTimers = () => {
    clearTimeout(hardCeilingId);
    clearTimeout(inactivityId);
  };

  const externalSignal = options.signal;
  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    else externalSignal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/optimize/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv_text: cvText, job_text: jobText, language: options.language ?? "fr" }),
      signal: controller.signal,
    });
  } catch {
    clearAllTimers();
    if (timedOut) {
      throw new ApiError(
        "Le service met plus de temps que prévu à répondre (cela peut arriver au premier appel). Réessayez dans un instant.",
        { errorCode: "timeout" }
      );
    }
    throw new ApiError("Impossible de contacter le serveur. Vérifiez votre connexion.", {
      errorCode: "network_error",
    });
  }

  if (!response.ok || !response.body) {
    clearAllTimers();
    throw await parseErrorResponse(response, "Erreur lors de l'optimisation.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finalReport: Report | null = null;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      resetInactivityTimer();
      buffer += decoder.decode(value, { stream: true });

      let separatorIndex = buffer.indexOf("\n\n");
      while (separatorIndex !== -1) {
        const rawEvent = buffer.slice(0, separatorIndex);
        buffer = buffer.slice(separatorIndex + 2);

        const dataLine = rawEvent.split("\n").find((line) => line.startsWith("data:"));
        separatorIndex = buffer.indexOf("\n\n");
        if (!dataLine) continue;

        const jsonPart = dataLine.slice("data:".length).trim();
        if (!jsonPart) continue;

        const event = JSON.parse(jsonPart) as PipelineEvent;
        options.onEvent?.(event);

        if (event.step === "error") {
          throw new ApiError(event.detail || "Erreur pendant la génération.", { errorCode: event.error_code });
        }
        if (event.step === "complete" && event.report) {
          finalReport = event.report;
        }
      }
    }
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (timedOut) {
      throw new ApiError(
        "Le serveur n'a plus répondu pendant trop longtemps. Réessayez — si le problème persiste, l'offre ou le CV est peut-être trop long.",
        { errorCode: "timeout" }
      );
    }
    throw new ApiError("La connexion a été interrompue avant la fin de la génération.", {
      errorCode: "stream_interrupted",
    });
  } finally {
    clearAllTimers();
    reader.releaseLock();
  }

  if (!finalReport) {
    throw new ApiError("Le flux s'est interrompu avant la fin de la génération.", {
      errorCode: "stream_incomplete",
    });
  }

  return finalReport;
}

async function downloadPdf(url: string, body: unknown, filename: string): Promise<void> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError("Impossible de contacter le serveur pour générer le PDF.", {
      errorCode: "network_error",
    });
  }

  if (!response.ok) {
    throw await parseErrorResponse(response, "Erreur lors de la génération du PDF.");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

export function exportCvPdf(cv: CV): Promise<void> {
  return downloadPdf(`${API_BASE_URL}/export/cv-pdf`, cv, buildFileName("CV", cv.first_name, cv.last_name));
}

export function exportLetterPdf(letter: Letter, sender: LetterSender): Promise<void> {
  return downloadPdf(
    `${API_BASE_URL}/export/letter-pdf`,
    { letter, sender },
    buildFileName("Lettre_motivation", sender.first_name, sender.last_name)
  );
}
