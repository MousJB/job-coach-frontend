"use client";

import { useState } from "react";

export default function Home() {
  const [cvText, setCvText] = useState("");
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const handleOptimize = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv_text: cvText, job_text: jobText }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'optimisation");

      const data = await response.json();
      setResult(data);
      localStorage.setItem("cv_result", JSON.stringify(data.cv_rewritten));
      localStorage.setItem("letter_result", JSON.stringify(data.letter));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Job Coach <span className="text-blue-600">AI</span> 🚀
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Adaptez votre candidature en moins de 30 secondes.
          </p>
        </header>

        {/* Formulaire */}
        {!result && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                1. Collez votre CV
              </label>
              <textarea
                className="w-full h-72 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-800 bg-slate-50"
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Copiez-collez le texte intégral de votre CV ici..."
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                2. Collez l'offre d'emploi
              </label>
              <textarea
                className="w-full h-72 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-slate-800 bg-slate-50"
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Copiez-collez le texte de l'offre d'emploi ici..."
              />
            </div>
            <div className="md:col-span-2 text-center">
              <button
                onClick={handleOptimize}
                disabled={loading || !cvText || !jobText}
                className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Optimisation en cours...
                  </span>
                ) : (
                  "Optimiser ma candidature ✨"
                )}
              </button>
              {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
            </div>
          </div>
        )}

        {/* Résultats */}
        {result && (
          <div className="space-y-8">

            <div className="text-right">
              <button
                onClick={() => setResult(null)}
                className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors"
              >
                ← Faire une nouvelle optimisation
              </button>
            </div>

            {/* Score */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-slate-800">Rapport d'optimisation</h2>
                <p className={`mt-2 font-medium ${result.quality.approved ? "text-green-600" : "text-orange-600"}`}>
                  {result.summary_for_user}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">Score ATS</p>
                <p className="text-5xl font-extrabold text-green-600">{result.score_before}%</p>
                <p className="text-xs text-slate-400 mt-1">{result.matched_skills.length} compétences matchées</p>
              </div>
            </div>

            {/* CV & Lettre */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* CV Optimisé */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-slate-800">CV Optimisé</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(result.cv_rewritten.summary + "\n\n" + result.cv_rewritten.skills.join(", "), "cv")}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-lg transition-colors"
                    >
                      {copied === "cv" ? "✓ Copié !" : "Copier"}
                    </button>
                    <button
                      onClick={() => window.open("/cv", "_blank")}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
                    >
                      Télécharger PDF
                    </button>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 space-y-4 h-96 overflow-y-auto">
                  <p className="font-medium text-slate-900 border-l-4 border-blue-500 pl-3 italic">
                    {result.cv_rewritten.summary}
                  </p>
                  <div>
                    <p className="font-semibold text-slate-800 mb-2">Compétences clés :</p>
                    <div className="flex flex-wrap gap-2">
                      {result.cv_rewritten.skills.map((skill: string, i: number) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lettre */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-slate-800">Lettre de Motivation</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(result.letter.body, "letter")}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-lg transition-colors"
                    >
                      {copied === "letter" ? "✓ Copié !" : "Copier"}
                    </button>
                    <button
                      onClick={() => window.open("/letter", "_blank")}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
                    >
                      Télécharger PDF
                    </button>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 whitespace-pre-wrap h-96 overflow-y-auto font-serif leading-relaxed">
                  {result.letter.body}
                </div>
              </div>
            </div>

            {/* Alerte Qualité */}
            {!result.quality.approved && (
              <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="font-bold text-orange-800 text-lg">Points à vérifier</h3>
                </div>
                <p className="text-orange-700 text-sm mb-4">
                  L'IA a repéré ces éléments. Vérifiez qu'ils correspondent bien à votre réalité professionnelle :
                </p>
                <ul className="list-disc list-inside space-y-2 text-orange-700 text-sm font-medium bg-white/50 p-4 rounded-lg">
                  {result.quality.hallucinations_detected.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}
      </div>
    </main>
  );
}