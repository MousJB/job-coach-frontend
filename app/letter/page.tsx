"use client";

import { useEffect, useState } from "react";
import { Inter, Lora } from "next/font/google";
import { useRouter } from "next/navigation";

import { ApiError, exportLetterPdf } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";
import { safeGet, safeSet } from "@/lib/storage";
import type { CV, Letter } from "@/lib/types";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], display: "swap", variable: "--font-lora" });

export default function LetterPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [letter, setLetter] = useState<Letter | null>(null);
  const [cv, setCv] = useState<CV | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedBody, setEditedBody] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    // localStorage est une API navigateur : indisponible au rendu serveur, elle
    // ne peut être lue que côté client après le montage, d'où l'effet.
    const storedLetter = safeGet<Letter>("letter_result");
    const storedCv = safeGet<CV>("cv_result");
    if (storedLetter) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLetter(storedLetter);
      setEditedBody(storedLetter.body);
    }
    if (storedCv) setCv(storedCv);
  }, []);

  const handleSave = () => {
    if (!letter) return;
    const updated = { ...letter, body: editedBody };
    setLetter(updated);
    safeSet("letter_result", updated);
    setEditing(false);
  };

  const handleDownload = async () => {
    if (!letter) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await exportLetterPdf(letter, {
        first_name: cv?.first_name,
        last_name: cv?.last_name,
        email: cv?.email,
        phone: cv?.phone,
        city: cv?.city,
        linkedin: cv?.linkedin,
      });
    } catch (err) {
      setDownloadError(err instanceof ApiError ? err.message : t("doc.downloadError"));
    } finally {
      setDownloading(false);
    }
  };

  if (!letter) {
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-400 text-center px-6">
        {t("doc.noLetter")}
      </div>
    );
  }

  const today = new Date().toLocaleDateString(lang === "en" ? "en-US" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={`${inter.variable} ${lora.variable}`}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f1f5f9; font-family: var(--font-lora), Georgia, serif; }

        .page-wrapper { min-height: 100vh; padding: 40px 20px; background: #f1f5f9; }

        .toolbar { max-width: 720px; margin: 0 auto 24px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; font-family: var(--font-inter), sans-serif; }
        .toolbar-right { display: flex; gap: 10px; }

        .btn-back { background: none; border: none; color: #64748b; font-size: 14px; cursor: pointer; }
        .btn-edit, .btn-print, .btn-save, .btn-cancel { padding: 9px 16px; border-radius: 8px; font-weight: 600; font-size: 13.5px; cursor: pointer; border: none; }
        .btn-edit { background: white; color: #1e3a8a; border: 1.5px solid #1e3a8a; }
        .btn-print { background: #1e3a8a; color: white; }
        .btn-print:disabled { background: #94a3b8; cursor: not-allowed; }
        .btn-save { background: #16a34a; color: white; }
        .btn-cancel { background: white; color: #4b5563; border: 1.5px solid #d1d5db; }

        .download-error { max-width: 720px; margin: 0 auto 16px; padding: 12px 20px; background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 8px; font-size: 14px; color: #b91c1c; font-family: var(--font-inter), sans-serif; }

        .letter-page { max-width: 720px; margin: 0 auto; background: white; box-shadow: 0 10px 35px rgba(0,0,0,.08); padding: 56px 60px; position: relative; }
        .letter-accent { position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: #1e3a8a; }

        .letter-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; gap: 16px; flex-wrap: wrap; font-family: var(--font-inter), sans-serif; }
        .sender-name { font-weight: 700; font-size: 16px; color: #0f172a; margin-bottom: 4px; }
        .sender-info { font-size: 12.5px; color: #64748b; line-height: 1.6; }
        .letter-date { font-size: 13px; color: #64748b; }

        .letter-subject { font-family: var(--font-inter), sans-serif; font-weight: 600; font-size: 14px; color: #0f172a; margin-bottom: 28px; padding-bottom: 14px; border-bottom: 1px solid #e2e8f0; }
        .letter-subject span { font-weight: 400; color: #334155; }

        .letter-body { white-space: pre-wrap; font-size: 15px; line-height: 1.8; color: #1f2937; }
        .letter-body-edit { width: 100%; min-height: 400px; font-family: var(--font-lora), Georgia, serif; font-size: 15px; line-height: 1.8; color: #1f2937; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; resize: vertical; }
        .edit-hint { font-family: var(--font-inter), sans-serif; font-size: 13px; color: #1e40af; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; }

        @media (max-width: 800px) {
          .letter-page { padding: 32px 24px; }
        }

        @media print {
          @page { size: A4; margin: 20mm; }
          html, body { background: white; }
          .toolbar, .download-error { display: none !important; }
          .page-wrapper { padding: 0; background: white; }
          .letter-page { box-shadow: none; max-width: 100%; padding: 0; }
          .letter-accent { display: none; }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="toolbar">
          <button className="btn-back" onClick={() => router.push("/app")}>
            ← {t("doc.back")}
          </button>
          <div className="toolbar-right">
            {editing ? (
              <>
                <button className="btn-cancel" onClick={() => { setEditedBody(letter.body); setEditing(false); }}>
                  {t("doc.cancel")}
                </button>
                <button className="btn-save" onClick={handleSave}>
                  ✓ {t("doc.save")}
                </button>
              </>
            ) : (
              <>
                <button className="btn-edit" onClick={() => setEditing(true)}>
                  ✏️ {t("doc.edit")}
                </button>
                <button className="btn-print" onClick={handleDownload} disabled={downloading}>
                  {downloading ? t("doc.downloading") : t("doc.download")}
                </button>
              </>
            )}
          </div>
        </div>

        {downloadError && (
          <div className="download-error" role="alert">
            {downloadError}
          </div>
        )}

        <div className="letter-page">
          <div className="letter-accent"></div>

          <div className="letter-header">
            <div className="letter-sender">
              <div className="sender-name">
                {cv?.first_name || ""} {cv?.last_name || ""}
              </div>
              <div className="sender-info">
                {cv?.email && (
                  <>
                    {cv.email}
                    <br />
                  </>
                )}
                {cv?.phone && (
                  <>
                    {cv.phone}
                    <br />
                  </>
                )}
                {cv?.city && (
                  <>
                    {cv.city}
                    <br />
                  </>
                )}
                {cv?.linkedin && <>{cv.linkedin}</>}
              </div>
            </div>
            <div className="letter-date">{today}</div>
          </div>

          {letter.subject && (
            <div className="letter-subject">
              {t("doc.subjectLabel")} <span>{letter.subject}</span>
            </div>
          )}

          {editing ? (
            <>
              <p className="edit-hint">{t("doc.editHint")}</p>
              <textarea className="letter-body-edit" value={editedBody} onChange={(e) => setEditedBody(e.target.value)} />
            </>
          ) : (
            <div className="letter-body">{letter.body}</div>
          )}
        </div>
      </div>
    </div>
  );
}
