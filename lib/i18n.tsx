"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { safeGet, safeSet } from "./storage";

export type Lang = "fr" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof translations.fr) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = safeGet<Lang>("ui_language");
    if (stored === "fr" || stored === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    safeSet("ui_language", next);
  };

  const t = (key: keyof typeof translations.fr) => translations[lang][key] ?? translations.fr[key];

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export const translations = {
  fr: {
    // OptimizeForm
    "form.cvLabel": "1. Collez votre CV",
    "form.cvPlaceholder": "Copiez-collez le texte intégral de votre CV ici...",
    "form.jobLabel": "2. Collez l'offre d'emploi",
    "form.jobPlaceholder": "Copiez-collez le texte de l'offre d'emploi ici...",
    "form.tooShort": "Encore un peu court pour une bonne analyse.",
    "form.submit": "Optimiser ma candidature ✨",
    "form.loading": "Optimisation en cours...",
    "form.retry": "Réessayer",

    // ResultsPanel
    "results.newOptimization": "← Faire une nouvelle optimisation",
    "results.cvTitle": "CV Optimisé",
    "results.letterTitle": "Lettre de Motivation",
    "results.copy": "Copier",
    "results.copied": "✓ Copié !",
    "results.viewDownload": "Voir et télécharger",
    "results.keySkills": "Compétences clés :",
    "results.warningsTitle": "Points à vérifier",
    "results.warningsIntro": "L'IA a repéré ces éléments. Vérifiez qu'ils correspondent bien à votre réalité professionnelle :",
    "results.missingSkillsTitle": "Compétences manquantes pour ce poste",

    // ScoreCard
    "score.reportTitle": "Rapport d'optimisation",
    "score.atsLabel": "Score ATS",
    "score.matchedSkills": "compétence(s) matchée(s)",
    "score.goodMatch": "✅ Bon match",
    "score.partialMatch": "⚠️ Match partiel",
    "score.poorMatch": "❌ Offre peu adaptée à votre profil",

    // Header
    "header.tagline": "Adaptez votre candidature en quelques instants.",

    // cv/letter pages
    "doc.back": "Retour",
    "doc.toolbarBrand": "Espace Candidature",
    "doc.professionalProfileFallback": "Profil Professionnel",
    "doc.removeSkill": "Retirer",
    "doc.edit": "Modifier",
    "doc.save": "Enregistrer",
    "doc.cancel": "Annuler",
    "doc.download": "Télécharger PDF",
    "doc.downloading": "Génération...",
    "doc.editBanner": "Mode modification activé. Vos changements seront répercutés directement sur le PDF téléchargé.",
    "doc.noCv": "Aucun CV à afficher. Retournez à l'accueil pour lancer une optimisation.",
    "doc.noLetter": "Aucune lettre à afficher. Retournez à l'accueil pour lancer une optimisation.",
    "doc.profile": "Profil",
    "doc.experience": "Expériences Professionnelles",
    "doc.skills": "Compétences",
    "doc.languages": "Langues",
    "doc.education": "Formation",
    "doc.present": "Présent",
    "doc.subjectLabel": "Objet :",
    "doc.editHint": "Modifiez le texte directement ci-dessous, puis cliquez sur \"Sauvegarder\".",
    "doc.downloadError": "Erreur lors du téléchargement du PDF.",
  },
  en: {
    "form.cvLabel": "1. Paste your resume",
    "form.cvPlaceholder": "Paste the full text of your resume here...",
    "form.jobLabel": "2. Paste the job posting",
    "form.jobPlaceholder": "Paste the job posting text here...",
    "form.tooShort": "A bit short for a good analysis.",
    "form.submit": "Optimize my application ✨",
    "form.loading": "Optimizing...",
    "form.retry": "Retry",

    "results.newOptimization": "← Start a new optimization",
    "results.cvTitle": "Optimized Resume",
    "results.letterTitle": "Cover Letter",
    "results.copy": "Copy",
    "results.copied": "✓ Copied!",
    "results.viewDownload": "View & download",
    "results.keySkills": "Key skills:",
    "results.warningsTitle": "Points to check",
    "results.warningsIntro": "The AI flagged these items. Double-check they match your actual professional background:",
    "results.missingSkillsTitle": "Missing skills for this role",

    "score.reportTitle": "Optimization report",
    "score.atsLabel": "ATS Score",
    "score.matchedSkills": "skill(s) matched",
    "score.goodMatch": "✅ Good match",
    "score.partialMatch": "⚠️ Partial match",
    "score.poorMatch": "❌ Not a great fit for this role",

    "header.tagline": "Tailor your application in seconds.",

    "doc.back": "Back",
    "doc.toolbarBrand": "Application Workspace",
    "doc.professionalProfileFallback": "Professional Profile",
    "doc.removeSkill": "Remove",
    "doc.edit": "Edit",
    "doc.save": "Save",
    "doc.cancel": "Cancel",
    "doc.download": "Download PDF",
    "doc.downloading": "Generating...",
    "doc.editBanner": "Edit mode is on. Your changes will apply directly to the downloaded PDF.",
    "doc.noCv": "No resume to display. Go back home to run an optimization.",
    "doc.noLetter": "No letter to display. Go back home to run an optimization.",
    "doc.profile": "Profile",
    "doc.experience": "Professional Experience",
    "doc.skills": "Skills",
    "doc.languages": "Languages",
    "doc.education": "Education",
    "doc.present": "Present",
    "doc.subjectLabel": "Subject:",
    "doc.editHint": "Edit the text directly below, then click \"Save\".",
    "doc.downloadError": "Error downloading the PDF.",
  },
} as const;
