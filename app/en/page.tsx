"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/lib/i18n";

export default function LandingEn() {
  const router = useRouter();
  const { setLang } = useLanguage();

  useEffect(() => {
    setLang("en");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans">
      <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-100">
        <div className="text-xl font-extrabold text-slate-900">
          Job Coach <span className="text-blue-600">AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 border border-slate-200 rounded-full px-2.5 py-1"
          >
            FR
          </Link>
          <button
            onClick={() => router.push("/app")}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Try it free
          </button>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          ✨ AI-powered — Results in seconds
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
          Your application,
          <br />
          <span className="text-blue-600">tailored to every job.</span>
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto">
          Paste your resume and the job posting. Our AI analyzes, optimizes, and generates a
          personalized application with ATS score, rewritten resume, and cover letter — in under a
          minute.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => router.push("/app")}
            className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-lg"
          >
            Optimize my application ✨
          </button>

          <a
            href="#how-it-works"
            className="bg-slate-100 text-slate-700 font-semibold py-4 px-8 rounded-xl hover:bg-slate-200 transition-colors text-lg"
          >
            How it works
          </a>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Before / After at a glance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">😓</span>
                <span className="font-bold text-slate-700">Before</span>
                <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
                  ATS Score: 42%
                </span>
              </div>
              <p className="text-sm text-slate-500 italic leading-relaxed">
                &quot;Web developer with 5 years of experience. Proficient in JavaScript, React and
                Node.js. Passionate about new technologies...&quot;
              </p>
              <div className="mt-4 text-xs text-slate-400">
                ❌ Generic letter · ❌ Missing keywords · ❌ Not tailored to the role
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🚀</span>
                <span className="font-bold text-slate-700">After</span>
                <span className="ml-auto bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                  ATS Score: 91%
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                &quot;Senior Full Stack Developer with 5 years of experience in React, TypeScript and
                FastAPI. Skilled in Docker deployment and GitHub Actions CI/CD. Integrated OpenAI on a
                production SaaS platform...&quot;
              </p>
              <div className="mt-4 text-xs text-green-600">
                ✅ Personalized letter · ✅ 11 ATS keywords · ✅ Tailored to the role
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 max-w-4xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              📋
            </div>
            <h3 className="font-bold text-slate-800 mb-2">1. Paste your resume</h3>
            <p className="text-sm text-slate-500">Paste the text of your resume. No upload needed.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🎯
            </div>
            <h3 className="font-bold text-slate-800 mb-2">2. Paste the job posting</h3>
            <p className="text-sm text-slate-500">Add the text of the job you&apos;re targeting.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              ✨
            </div>
            <h3 className="font-bold text-slate-800 mb-2">3. Get your application</h3>
            <p className="text-sm text-slate-500">ATS score, optimized resume, personalized letter — in seconds.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why not just ChatGPT?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🎯",
                title: "Accurate ATS score",
                desc: "Analyzes the posting's keywords and computes your real compatibility rate.",
              },
              {
                icon: "✍️",
                title: "Intelligently rewritten resume",
                desc: "Reorganizes and enriches your experience based on the posting's priorities.",
              },
              {
                icon: "💌",
                title: "100% personalized letter",
                desc: "Generated specifically for the targeted company and role.",
              },
              {
                icon: "🛡️",
                title: "Hallucination detection",
                desc: "Checks that nothing was made up. Your application stays honest.",
              },
              {
                icon: "✏️",
                title: "Edit mode",
                desc: "Edit the resume and letter directly before downloading.",
              },
              {
                icon: "📄",
                title: "Clean PDF export",
                desc: "Download a resume and letter ready to send in one click.",
              },
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
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple pricing</h2>
        <p className="text-slate-500 mb-12">Start for free. Go pro once you&apos;re convinced.</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <div className="text-lg font-bold text-slate-700 mb-2">Free</div>
            <div className="text-4xl font-extrabold text-slate-900 mb-1">$0</div>
            <div className="text-slate-400 text-sm mb-6">forever</div>
            <ul className="text-sm text-slate-600 space-y-2 text-left mb-8">
              <li>✓ 3 optimizations/month</li>
              <li>✓ ATS score</li>
              <li>✓ Optimized resume</li>
              <li>✓ Cover letter</li>
            </ul>
            <button
              onClick={() => router.push("/app")}
              className="w-full bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Start for free
            </button>
          </div>
          <div className="bg-blue-600 rounded-2xl p-8 border border-blue-600 text-white relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
              Most popular
            </div>
            <div className="text-lg font-bold mb-2 opacity-90">Pro</div>
            <div className="text-4xl font-extrabold mb-1">$14.90</div>
            <div className="opacity-70 text-sm mb-6">per month</div>
            <ul className="text-sm space-y-2 text-left mb-8 opacity-90">
              <li>✓ Unlimited optimizations</li>
              <li>✓ Premium PDF export</li>
              <li>✓ Edit mode</li>
              <li>✓ Hallucination detection</li>
              <li>✓ Application history</li>
            </ul>
            <button
              onClick={() => router.push("/app")}
              className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Try it free
            </button>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to land more interviews?</h2>
        <p className="text-blue-100 mb-8 text-lg">Join candidates optimizing their application in seconds.</p>
        <button
          onClick={() => router.push("/app")}
          className="bg-white text-blue-600 font-bold py-4 px-10 rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg"
        >
          Optimize my application for free ✨
        </button>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-slate-400 text-sm">
        <div className="font-bold text-slate-600 mb-1">Job Coach AI</div>
        Optimize your job application with artificial intelligence.
        <div className="mt-3 flex justify-center gap-4 text-xs">
          <Link href="/mentions-legales" className="hover:text-slate-600">
            Legal notice
          </Link>
          <Link href="/confidentialite" className="hover:text-slate-600">
            Privacy
          </Link>
          <Link href="/cgu" className="hover:text-slate-600">
            Terms
          </Link>
        </div>
      </footer>
    </main>
  );
}
