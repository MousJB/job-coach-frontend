"use client";

import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white font-sans">

      <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-100">
        <div className="text-xl font-extrabold text-slate-900">
          Job Coach <span className="text-blue-600">AI</span>
        </div>
        <button
          onClick={() => router.push("/app")}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Essayer gratuitement
        </button>
      </nav>

      <section className="max-w-4xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          ✨ Optimisé par IA — Résultat en 30 secondes
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
          Votre candidature,<br />
          <span className="text-blue-600">adaptée à chaque offre.</span>
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto">
          Collez votre CV et l&apos;offre d&apos;emploi. Notre IA analyse, optimise et génère
          une candidature personnalisée avec score ATS, CV réécrit et lettre de motivation — en moins de 30 secondes.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
         <button
            onClick={() => router.push("/app")}
            className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-lg"
          >
            Optimiser ma candidature ✨
          </button>

          <a
            href="#how-it-works"
            className="bg-slate-100 text-slate-700 font-semibold py-4 px-8 rounded-xl hover:bg-slate-200 transition-colors text-lg"
          >
            Comment ça marche ?
          </a>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Avant / Après en un coup d&apos;œil
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">😓</span>
                <span className="font-bold text-slate-700">Avant</span>
                <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">Score ATS : 42%</span>
              </div>
              <p className="text-sm text-slate-500 italic leading-relaxed">
                &quot;Développeur web avec 5 ans d&apos;expérience. Maîtrise de JavaScript, React et Node.js. Passionné par les nouvelles technologies...&quot;
              </p>
              <div className="mt-4 text-xs text-slate-400">❌ Lettre générique · ❌ Mots-clés manquants · ❌ Non adapté à l&apos;offre</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🚀</span>
                <span className="font-bold text-slate-700">Après</span>
                <span className="ml-auto bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Score ATS : 91%</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                &quot;Développeur Full Stack Senior avec 5 ans d&apos;expérience en React, TypeScript et FastAPI. Expert en déploiement Docker et CI/CD GitHub Actions. Intégration OpenAI sur plateforme SaaS...&quot;
              </p>
              <div className="mt-4 text-xs text-green-600">✅ Lettre personnalisée · ✅ 11 mots-clés ATS · ✅ Adapté à l&apos;offre</div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 max-w-4xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">📋</div>
            <h3 className="font-bold text-slate-800 mb-2">1. Collez votre CV</h3>
            <p className="text-sm text-slate-500">Copiez-collez le texte de votre CV. Pas besoin d&apos;upload.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">🎯</div>
            <h3 className="font-bold text-slate-800 mb-2">2. Collez l&apos;offre</h3>
            <p className="text-sm text-slate-500">Ajoutez le texte de l&apos;offre d&apos;emploi ciblée.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">✨</div>
            <h3 className="font-bold text-slate-800 mb-2">3. Obtenez votre candidature</h3>
            <p className="text-sm text-slate-500">Score ATS, CV optimisé, lettre personnalisée — en 30 secondes.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Pourquoi pas ChatGPT ?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🎯", title: "Score ATS précis", desc: "Analyse les mots-clés de l'offre et calcule votre taux de compatibilité réel." },
              { icon: "✍️", title: "CV réécrit intelligemment", desc: "Réorganise et enrichit vos expériences selon les priorités de l'offre." },
              { icon: "💌", title: "Lettre 100% personnalisée", desc: "Générée spécifiquement pour l'entreprise et le poste ciblé." },
              { icon: "🛡️", title: "Détection d'hallucinations", desc: "Vérifie que rien n'a été inventé. Votre candidature reste honnête." },
              { icon: "✏️", title: "Mode édition", desc: "Modifiez le CV et la lettre directement avant de télécharger." },
              { icon: "📄", title: "Export PDF propre", desc: "Téléchargez un CV et une lettre prêts à envoyer en un clic." },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 flex gap-4">
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Tarifs simples</h2>
        <p className="text-slate-500 mb-12">Commencez gratuitement. Passez pro quand vous êtes convaincu.</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <div className="text-lg font-bold text-slate-700 mb-2">Gratuit</div>
            <div className="text-4xl font-extrabold text-slate-900 mb-1">€0</div>
            <div className="text-slate-400 text-sm mb-6">pour toujours</div>
            <ul className="text-sm text-slate-600 space-y-2 text-left mb-8">
              <li>✓ 3 optimisations/mois</li>
              <li>✓ Score ATS</li>
              <li>✓ CV optimisé</li>
              <li>✓ Lettre de motivation</li>
            </ul>
            <button
              onClick={() => router.push("/app")}
              className="w-full bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Commencer gratuitement
            </button>
          </div>
          <div className="bg-blue-600 rounded-2xl p-8 border border-blue-600 text-white relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
              Le plus populaire
            </div>
            <div className="text-lg font-bold mb-2 opacity-90">Pro</div>
            <div className="text-4xl font-extrabold mb-1">€14.90</div>
            <div className="opacity-70 text-sm mb-6">par mois</div>
            <ul className="text-sm space-y-2 text-left mb-8 opacity-90">
              <li>✓ Optimisations illimitées</li>
              <li>✓ Export PDF premium</li>
              <li>✓ Mode édition</li>
              <li>✓ Détection d&apos;hallucinations</li>
              <li>✓ Historique des candidatures</li>
            </ul>
            <button
              onClick={() => router.push("/app")}
              className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Essayer gratuitement
            </button>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Prêt à décrocher plus d&apos;entretiens ?</h2>
        <p className="text-blue-100 mb-8 text-lg">Rejoignez les candidats qui optimisent leur candidature en 30 secondes.</p>
        <button
          onClick={() => router.push("/app")}
          className="bg-white text-blue-600 font-bold py-4 px-10 rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg"
        >
          Optimiser ma candidature gratuitement ✨
        </button>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-slate-400 text-sm">
        <div className="font-bold text-slate-600 mb-1">Job Coach AI</div>
        Optimisez votre candidature avec l&apos;intelligence artificielle.
      </footer>

    </main>
  );
}