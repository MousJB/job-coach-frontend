// Types miroir des modèles Pydantic du backend (job-coach-ai).
// Toute évolution de app/models/*.py côté backend doit être répercutée ici.

export interface Experience {
  company: string | null;
  position: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  technologies: string[];
  achievements: string[];
}

export interface Education {
  school: string | null;
  degree: string | null;
  field: string | null;
  year: string | null;
}

export interface Language {
  name: string;
  level: string | null;
}

export interface Certification {
  name: string;
  issuer: string | null;
  year: string | null;
}

export interface CV {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  linkedin: string | null;
  github: string | null;
  website: string | null;
  summary: string | null;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  languages: Language[];
  certifications: Certification[];
}

export interface Job {
  title: string | null;
  company: string | null;
  location: string | null;
  contract: string | null;
  description: string | null;
  required_skills: string[];
  preferred_skills: string[];
  responsibilities: string[];
  keywords: string[];
}

export interface Matching {
  ats_score: number;
  matched_skills: string[];
  missing_skills: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface Strategy {
  skills_to_highlight: string[];
  experiences_to_highlight: number[];
  keywords_to_add: string[];
  projects_to_mention: string[];
  writing_style: string | null;
}

export interface Letter {
  subject: string | null;
  body: string;
  word_count: number | null;
}

export interface QualityCheck {
  approved: boolean;
  score_after: number | null;
  hallucinations_detected: string[];
  inconsistencies: string[];
  improvements_made: string[];
  warnings: string[];
  final_recommendation: string | null;
}

export interface Report {
  score_before: number | null;
  score_after: number | null;
  matched_skills: string[];
  missing_skills: string[];
  cv_rewritten: CV | null;
  letter: Letter | null;
  strategy: Strategy | null;
  quality: QualityCheck | null;
  summary_for_user: string | null;
  next_steps: string[];
}

// Clés d'étape du pipeline, dans leur ordre canonique d'émission par le backend
// (voir app/pipeline/pipeline.py::STEP_LABELS).
export const PIPELINE_STEPS = [
  "extract_cv",
  "cv_analysis",
  "analyze_job",
  "matching",
  "strategy",
  "cv_rewrite",
  "cover_letter",
  "quality_check",
] as const;

export type PipelineStepKey = (typeof PIPELINE_STEPS)[number];

export const STEP_LABELS: Record<PipelineStepKey, string> = {
  extract_cv: "Analyse du CV",
  cv_analysis: "Évaluation du profil",
  analyze_job: "Analyse de l'offre d'emploi",
  matching: "Calcul du score de compatibilité",
  strategy: "Définition de la stratégie",
  cv_rewrite: "Réécriture du CV",
  cover_letter: "Rédaction de la lettre de motivation",
  quality_check: "Contrôle qualité",
};

export interface PipelineEvent {
  step: PipelineStepKey | "complete" | "error";
  label: string;
  status: "done" | "error";
  cached?: boolean;
  report?: Report;
  detail?: string;
  error_code?: string;
}

export interface LetterSender {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  linkedin?: string | null;
}
