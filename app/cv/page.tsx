"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

import { ApiError, exportCvPdf } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";
import { safeGet, safeSet } from "@/lib/storage";
import type { CV, Experience } from "@/lib/types";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], display: "swap" });

const getLanguageDots = (level: string | null) => {
  const l = level?.toLowerCase() || "";
  let score = 3;
  if (l.includes("c2") || l.includes("maternel") || l.includes("native")) score = 5;
  else if (l.includes("c1") || l.includes("bilingue") || l.includes("fluent")) score = 4;
  else if (l.includes("b2") || l.includes("courant")) score = 3;
  else if (l.includes("b1") || l.includes("intermédiaire")) score = 2;
  else if (l.includes("a1") || l.includes("a2") || l.includes("débutant")) score = 1;

  return "●".repeat(score) + "○".repeat(5 - score);
};

export default function CVPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [cv, setCv] = useState<CV | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedCv, setEditedCv] = useState<CV | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    // localStorage est une API navigateur : indisponible au rendu serveur, elle
    // ne peut être lue que côté client après le montage, d'où l'effet.
    const stored = safeGet<CV>("cv_result");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCv(stored);
      setEditedCv(JSON.parse(JSON.stringify(stored)));
    }
  }, []);

  const handleSave = () => {
    if (!editedCv) return;
    setCv(JSON.parse(JSON.stringify(editedCv)));
    safeSet("cv_result", editedCv);
    setEditing(false);
  };

  const handleCancel = () => {
    if (cv) setEditedCv(JSON.parse(JSON.stringify(cv)));
    setEditing(false);
  };

  const handleDownload = async () => {
    if (!cv) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await exportCvPdf(cv);
    } catch (err) {
      setDownloadError(err instanceof ApiError ? err.message : t("doc.downloadError"));
    } finally {
      setDownloading(false);
    }
  };

  const updateSummary = (val: string) => editedCv && setEditedCv({ ...editedCv, summary: val });

  const updateExpDesc = (i: number, val: string) => {
    if (!editedCv) return;
    const exps = [...editedCv.experiences];
    exps[i] = { ...exps[i], description: val };
    setEditedCv({ ...editedCv, experiences: exps });
  };

  const updateSkill = (i: number, val: string) => {
    if (!editedCv) return;
    const skills = [...editedCv.skills];
    skills[i] = val;
    setEditedCv({ ...editedCv, skills });
  };

  const removeSkill = (i: number) => {
    if (!editedCv) return;
    setEditedCv({ ...editedCv, skills: editedCv.skills.filter((_, idx) => idx !== i) });
  };

  if (!cv || !editedCv) {
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-400 text-center px-6">
        {t("doc.noCv")}
      </div>
    );
  }

  const display = editing ? editedCv : cv;
  const initials = `${display.first_name?.[0] || ""}${display.last_name?.[0] || ""}`.toUpperCase();

  const renderDescriptionAsPoints = (desc: string | null) => {
    if (!desc) return null;
    const lines = desc
      .split(/[\n•-]/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length <= 1) return <p className="job-desc">{desc}</p>;
    return (
      <ul className="job-points">
        {lines.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className={inter.className}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; background: #f3f4f6; }

        .cv-wrapper { min-height: 100vh; padding-bottom: 40px; }

        .cv-toolbar { background: white; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 50; }
        .cv-toolbar-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .toolbar-brand { font-weight: 700; font-size: 16px; color: #1e3a8a; display: flex; align-items: center; gap: 8px; }
        .toolbar-actions { display: flex; align-items: center; gap: 12px; }

        .btn-print { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #1e3a8a; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; }
        .btn-print:hover { background: #172554; }
        .btn-print:disabled { background: #94a3b8; cursor: not-allowed; }
        .btn-edit { display: flex; align-items: center; gap: 6px; padding: 10px 20px; background: white; color: #1e3a8a; border: 1.5px solid #1e3a8a; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; }
        .btn-save { padding: 10px 20px; background: #16a34a; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; }
        .btn-cancel { padding: 10px 16px; background: white; color: #4b5563; border: 1.5px solid #d1d5db; border-radius: 8px; font-weight: 500; font-size: 14px; cursor: pointer; }
        .btn-back { background: none; border: none; color: #6b7280; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 4px; }

        .edit-banner { max-width: 1200px; margin: 16px auto 0; padding: 12px 24px; background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; font-size: 14px; color: #1e40af; }
        .download-error { max-width: 1200px; margin: 12px auto 0; padding: 12px 24px; background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 8px; font-size: 14px; color: #b91c1c; }

        .cv-container { display: flex; justify-content: center; padding: 30px; }

        .cv-card { width: 210mm; min-height: 297mm; height: auto; background: white; box-shadow: 0 10px 35px rgba(0,0,0,.1); display: flex; flex-direction: column; max-width: 100%; }

        .cv-head { background: #0f172a !important; padding: 32px 40px; color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        .cv-head-content { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }

        .cv-avatar-box { width: 90px; height: 90px; border-radius: 8px; background: #1e293b !important; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; color: #f8fafc !important; flex-shrink: 0; overflow: hidden; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        .cv-avatar-img { width: 100%; height: 100%; object-fit: cover; }

        .cv-head-info { flex: 1; min-width: 200px; }
        .cv-head-name { font-size: 38px; font-weight: 800; color: #ffffff !important; margin-bottom: 4px; letter-spacing: -0.02em; }
        .cv-head-title { font-size: 18px; font-weight: 500; color: #94a3b8 !important; margin-bottom: 16px; }

        .cv-head-contacts { display: flex; flex-wrap: wrap; gap: 16px; }
        .cv-head-contact { font-size: 13px; color: #cbd5e1 !important; display: flex; align-items: center; gap: 6px; }
        .cv-head-contact svg { width: 14px; height: 14px; stroke: #94a3b8; }
        .cv-head-contact a { color: inherit; text-decoration: none; }

        .cv-body { display: flex; flex-direction: row; padding: 40px; gap: 40px; flex: 1; }
        .cv-main { flex: 2; min-width: 0; }
        .cv-sidebar { flex: 1; min-width: 0; }

        .section { margin-bottom: 28px; }
        .section-head { font-size: 15px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #0f172a !important; margin-bottom: 16px; padding-bottom: 4px; border-bottom: 2px solid #e2e8f0 !important; }

        .cv-summary { font-size: 14px; line-height: 1.6; color: #334155 !important; }

        .job-item { margin-bottom: 24px; }
        .job-item:last-child { margin-bottom: 0; }
        .job-header { display: grid; grid-template-columns: 1fr auto; align-items: baseline; margin-bottom: 4px; gap: 8px; }
        .job-title { font-size: 16px; font-weight: 700; color: #0f172a !important; }
        .job-date { font-size: 13px; font-weight: 500; color: #64748b !important; white-space: nowrap; }
        .job-company { font-size: 14px; font-weight: 600; color: #3b82f6 !important; margin-bottom: 8px; }
        .job-desc { font-size: 13.5px; line-height: 1.6; color: #334155 !important; }
        .job-points { margin-top: 6px; padding-left: 18px; list-style-type: square; color: #334155 !important; }
        .job-points li { font-size: 13.5px; line-height: 1.5; margin-bottom: 4px; }

        .capsule-container { display: flex; flex-wrap: wrap; gap: 8px; }
        .capsule { background: #f3f4f6 !important; color: #374151 !important; border: 1px solid #d1d5db !important; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; }
        .job-tags { margin-top: 10px; }

        .edu-item { margin-bottom: 16px; }
        .edu-degree { font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1.4; }
        .edu-school { font-size: 12px; color: #3b82f6 !important; margin-top: 2px; }
        .edu-year { font-size: 12px; color: #64748b; margin-top: 2px; }

        .lang-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 13.5px; font-weight: 500; color: #334155; }
        .lang-dots { color: #0f172a; font-size: 10px; letter-spacing: 2px; }

        .editable-textarea { width: 100%; font-size: 13.5px; line-height: 1.6; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px; font-family: inherit; resize: vertical; background: #f8fafc; }
        .editable-input { font-size: 13px; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; font-family: inherit; background: #f8fafc; width: calc(100% - 24px); }
        .skill-edit-row { display: flex; align-items: center; gap: 4px; margin-bottom: 6px; }
        .btn-remove-skill { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 16px; }

        /* Responsive écran (hors impression) : le format A4 fixe déborde sur mobile */
        @media (max-width: 850px) {
          .cv-container { padding: 12px; }
          .cv-card { width: 100%; min-height: auto; }
          .cv-body { flex-direction: column; padding: 24px; gap: 24px; }
          .cv-head { padding: 24px; }
          .cv-head-name { font-size: 28px; }
        }

        @media print {
          @page { size: A4; margin: 0; }
          html, body { background: white; }
          .cv-toolbar, .edit-banner, .download-error { display: none !important; }
          .cv-wrapper { padding: 0 !important; }
          .cv-container { padding: 0; margin: 0; }
          .cv-card { width: 100%; max-width: 210mm; min-height: 297mm; height: auto; box-shadow: none; border-radius: 0; }
          .cv-body { padding: 30px; gap: 30px; flex-direction: row; }
          .section, .job-item, .capsule-container { page-break-inside: avoid; break-inside: avoid; }
        }
      `}</style>

      <div className="cv-wrapper">
        <div className="cv-toolbar">
          <div className="cv-toolbar-inner">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button className="btn-back" onClick={() => router.push("/app")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {t("doc.back")}
              </button>
              <span className="toolbar-brand">{t("doc.toolbarBrand")}</span>
            </div>
            <div className="toolbar-actions">
              {editing ? (
                <>
                  <button className="btn-cancel" onClick={handleCancel}>
                    {t("doc.cancel")}
                  </button>
                  <button className="btn-save" onClick={handleSave}>
                    {t("doc.save")}
                  </button>
                </>
              ) : (
                <>
                  <button className="btn-edit" onClick={() => setEditing(true)}>
                    {t("doc.edit")}
                  </button>
                  <button className="btn-print" onClick={handleDownload} disabled={downloading}>
                    {downloading ? t("doc.downloading") : t("doc.download")}
                  </button>
                </>
              )}
            </div>
          </div>
          {editing && <div className="edit-banner">{t("doc.editBanner")}</div>}
        </div>

        {downloadError && (
          <div className="download-error" role="alert">
            {downloadError}
          </div>
        )}

        <div className="cv-container">
          <div className="cv-card">
            <div className="cv-head">
              <div className="cv-head-content">
                <div className="cv-avatar-box">{initials || "?"}</div>
                <div className="cv-head-info">
                  <div className="cv-head-name">
                    {display.first_name || ""} {display.last_name || ""}
                  </div>
                  <div className="cv-head-title">
                    {display.experiences?.[0]?.position || t("doc.professionalProfileFallback")}
                  </div>
                  <div className="cv-head-contacts">
                    {display.email && <span className="cv-head-contact">{display.email}</span>}
                    {display.phone && <span className="cv-head-contact">{display.phone}</span>}
                    {display.city && <span className="cv-head-contact">{display.city}</span>}
                    {display.linkedin && (
                      <span className="cv-head-contact">
                        <a href={display.linkedin} target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="cv-body">
              <div className="cv-main">
                {display.summary && (
                  <div className="section">
                    <div className="section-head">{t("doc.profile")}</div>
                    {editing ? (
                      <textarea
                        className="editable-textarea"
                        value={editedCv.summary ?? ""}
                        onChange={(e) => updateSummary(e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <p className="cv-summary">{display.summary}</p>
                    )}
                  </div>
                )}

                {display.experiences?.length > 0 && (
                  <div className="section">
                    <div className="section-head">{t("doc.experience")}</div>
                    <div>
                      {display.experiences.map((exp: Experience, i: number) => (
                        <div className="job-item" key={i}>
                          <div className="job-header">
                            <div className="job-title">{exp.position}</div>
                            <div className="job-date">
                              {exp.start_date} — {exp.end_date || t("doc.present")}
                            </div>
                          </div>
                          <div className="job-company">{exp.company}</div>

                          {editing ? (
                            <textarea
                              className="editable-textarea"
                              value={editedCv.experiences[i]?.description || ""}
                              onChange={(e) => updateExpDesc(i, e.target.value)}
                              rows={3}
                            />
                          ) : (
                            renderDescriptionAsPoints(exp.description)
                          )}

                          {exp.technologies?.length > 0 && (
                            <div className="capsule-container job-tags">
                              {exp.technologies.map((tech, j) => (
                                <span className="capsule" key={j}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="cv-sidebar">
                {display.skills?.length > 0 && (
                  <div className="section">
                    <div className="section-head">{t("doc.skills")}</div>
                    <div className="capsule-container">
                      {editing
                        ? editedCv.skills.map((skill, i) => (
                            <div className="skill-edit-row" key={i} style={{ width: "100%" }}>
                              <input
                                className="editable-input"
                                value={skill}
                                onChange={(e) => updateSkill(i, e.target.value)}
                              />
                              <button
                                className="btn-remove-skill"
                                onClick={() => removeSkill(i)}
                                aria-label={`${t("doc.removeSkill")} ${skill}`}
                              >
                                ×
                              </button>
                            </div>
                          ))
                        : display.skills.map((skill, i) => (
                            <span className="capsule" key={i}>
                              {skill}
                            </span>
                          ))}
                    </div>
                  </div>
                )}

                {display.languages?.length > 0 && (
                  <div className="section">
                    <div className="section-head">{t("doc.languages")}</div>
                    {display.languages.map((lang, i) => (
                      <div className="lang-item" key={i}>
                        <span>{lang.name}</span>
                        <span className="lang-dots">{getLanguageDots(lang.level)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {display.education?.length > 0 && (
                  <div className="section">
                    <div className="section-head">{t("doc.education")}</div>
                    {display.education.map((edu, i) => (
                      <div className="edu-item" key={i}>
                        <div className="edu-degree">{edu.degree}</div>
                        <div className="edu-school">{edu.school}</div>
                        <div className="edu-year">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
