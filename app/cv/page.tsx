"use client";

import { useEffect, useState } from "react";

export default function CVPage() {
  const [cv, setCv] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [editedCv, setEditedCv] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cv_result");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCv(parsed);
      setEditedCv(JSON.parse(JSON.stringify(parsed)));
    }
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleSave = () => {
    setCv(JSON.parse(JSON.stringify(editedCv)));
    localStorage.setItem("cv_result", JSON.stringify(editedCv));
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedCv(JSON.parse(JSON.stringify(cv)));
    setEditing(false);
  };

  const updateSummary = (val: string) => setEditedCv({ ...editedCv, summary: val });

  const updateExpDesc = (i: number, val: string) => {
    const exps = [...editedCv.experiences];
    exps[i] = { ...exps[i], description: val };
    setEditedCv({ ...editedCv, experiences: exps });
  };

  const updateSkill = (i: number, val: string) => {
    const skills = [...editedCv.skills];
    skills[i] = val;
    setEditedCv({ ...editedCv, skills });
  };

  const removeSkill = (i: number) => {
    const skills = editedCv.skills.filter((_: string, idx: number) => idx !== i);
    setEditedCv({ ...editedCv, skills });
  };

  if (!cv) return (
    <div className="flex items-center justify-center min-h-screen text-slate-400">
      Aucun CV à afficher. Retournez à l'accueil.
    </div>
  );

  const display = editing ? editedCv : cv;
  const initials = `${display.first_name?.[0] || ""}${display.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div className={darkMode ? "dark" : ""}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }

        .cv-wrapper {
          background: #f1f5f9;
          min-height: 100vh;
          transition: background 0.2s;
        }
        .dark .cv-wrapper { background: #0f172a; }

        /* TOOLBAR */
        .cv-toolbar {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 50;
          transition: background 0.2s;
        }
        .dark .cv-toolbar { background: #1e293b; border-color: #334155; }

        .cv-toolbar-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 16px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .toolbar-brand {
          font-weight: 700;
          font-size: 16px;
          color: #0369a1;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dark .toolbar-brand { color: #e0f2fe; }

        .toolbar-actions { display: flex; align-items: center; gap: 10px; }

        .btn-dark {
          padding: 8px;
          border-radius: 8px;
          background: #f1f5f9;
          border: none;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.2s;
        }
        .dark .btn-dark { background: #334155; }

        .btn-print {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: #0284c7;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-print:hover { background: #0369a1; }

        .btn-edit {
          padding: 8px 18px;
          background: white;
          color: #0284c7;
          border: 1.5px solid #0284c7;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        }
        .dark .btn-edit { background: #1e293b; color: #7dd3fc; border-color: #7dd3fc; }

        .btn-save {
          padding: 8px 18px;
          background: #16a34a;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        }

        .btn-cancel {
          padding: 8px 14px;
          background: white;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-weight: 500;
          font-size: 13px;
          cursor: pointer;
        }

        .btn-back {
          background: none;
          border: none;
          color: #64748b;
          font-size: 13px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }

        .edit-banner {
          max-width: 900px;
          margin: 16px auto 0;
          padding: 10px 16px;
          background: #eff6ff;
          border: 1.5px solid #bfdbfe;
          border-radius: 8px;
          font-size: 13px;
          color: #1e40af;
        }

        /* CV CONTAINER */
        .cv-container {
          max-width: 900px;
          margin: 32px auto;
          padding: 0 16px 48px;
        }

        .cv-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          border: 1px solid #f1f5f9;
          overflow: hidden;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .dark .cv-card { background: #1e293b; border-color: #334155; }

        /* HEADER */
        .cv-head {
          background: linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #1e293b 100%);
          padding: 40px 48px;
          color: white;
          position: relative;
          overflow: hidden;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .cv-head-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image: radial-gradient(#fff 1px, transparent 1px);
          background-size: 16px 16px;
        }

        .cv-head-content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .cv-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 3px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .cv-head-info { flex: 1; }

        .cv-head-badge {
          display: inline-block;
          padding: 3px 12px;
          background: rgba(255,255,255,0.12);
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #bae6fd;
          margin-bottom: 8px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .cv-head-name {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .cv-head-contacts {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 8px;
        }

        .cv-head-contact {
          font-size: 12px;
          color: #bae6fd;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .cv-head-contact a { color: #7dd3fc; text-decoration: none; }

        /* GRID */
        .cv-grid {
          display: grid;
          grid-template-columns: 1fr 220px;
          border-top: 1px solid #e2e8f0;
        }
        .dark .cv-grid { border-color: #334155; }

        /* MAIN */
        .cv-main {
          padding: 28px 32px;
          border-right: 1px solid #e2e8f0;
        }
        .dark .cv-main { border-color: #334155; }

        /* SIDEBAR */
        .cv-sidebar {
          padding: 28px 20px;
          background: #f8fafc;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .dark .cv-sidebar { background: #162032; }

        /* SECTIONS */
        .section { margin-bottom: 24px; }

        .section-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0369a1;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e0f2fe;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .dark .section-head { color: #38bdf8; border-color: #1e3a5f; }

        .section-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0284c7;
          flex-shrink: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        /* SUMMARY */
        .cv-summary {
          font-size: 13px;
          line-height: 1.7;
          color: #475569;
        }
        .dark .cv-summary { color: #94a3b8; }

        /* TIMELINE */
        .timeline { border-left: 2px solid #e2e8f0; margin-left: 8px; }
        .dark .timeline { border-color: #334155; }

        .timeline-item {
          position: relative;
          padding: 0 0 20px 20px;
        }

        .timeline-dot {
          position: absolute;
          left: -6px;
          top: 4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0284c7;
          border: 2px solid white;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .dark .timeline-dot { border-color: #1e293b; }

        .timeline-dot.past { background: #94a3b8; }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2px;
          flex-wrap: wrap;
          gap: 4px;
        }

        .timeline-title {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }
        .dark .timeline-title { color: #f1f5f9; }

        .timeline-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 20px;
          background: #e0f2fe;
          color: #0369a1;
          white-space: nowrap;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .timeline-badge.past {
          background: #f1f5f9;
          color: #64748b;
        }
        .dark .timeline-badge { background: #1e3a5f; color: #38bdf8; }
        .dark .timeline-badge.past { background: #1e293b; color: #94a3b8; }

        .timeline-company {
          font-size: 12px;
          font-weight: 500;
          color: #0284c7;
          margin-bottom: 6px;
        }
        .dark .timeline-company { color: #38bdf8; }

        .timeline-desc {
          font-size: 12px;
          line-height: 1.6;
          color: #475569;
        }
        .dark .timeline-desc { color: #94a3b8; }

        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 8px;
        }

        .exp-tag {
          font-size: 10px;
          background: #eff6ff;
          color: #1d4ed8;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 500;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .dark .exp-tag { background: #1e3a5f; color: #7dd3fc; }

        /* SIDEBAR ITEMS */
        .skill-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 12px;
          color: #334155;
        }
        .dark .skill-item { color: #cbd5e1; }

        .skill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0284c7;
          flex-shrink: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .edu-item { margin-bottom: 14px; }

        .edu-degree {
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
        }
        .dark .edu-degree { color: #f1f5f9; }

        .edu-school {
          font-size: 11px;
          color: #0284c7;
          margin-top: 1px;
        }

        .edu-year {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 1px;
        }

        .lang-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #334155;
        }
        .dark .lang-item { color: #cbd5e1; }

        .lang-badge {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 4px;
          background: #e0f2fe;
          color: #0369a1;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .dark .lang-badge { background: #1e3a5f; color: #38bdf8; }

        /* EDIT */
        .editable-textarea {
          width: 100%;
          font-size: 12px;
          line-height: 1.6;
          color: #334155;
          border: 1.5px solid #7dd3fc;
          border-radius: 6px;
          padding: 8px 10px;
          font-family: 'Inter', sans-serif;
          resize: vertical;
          outline: none;
          background: #f0f9ff;
          min-height: 70px;
        }

        .editable-input {
          font-size: 12px;
          color: #334155;
          border: 1.5px solid #7dd3fc;
          border-radius: 4px;
          padding: 4px 8px;
          font-family: 'Inter', sans-serif;
          outline: none;
          background: #f0f9ff;
          width: calc(100% - 28px);
        }

        .skill-edit-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
        }

        .btn-remove-skill {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 16px;
          padding: 0;
          line-height: 1;
          flex-shrink: 0;
        }

        /* FOOTER */
        .cv-footer {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          padding: 16px;
          font-size: 11px;
          color: #94a3b8;
        }
        .dark .cv-footer { background: #162032; border-color: #334155; }

        /* PRINT */
        @media print {
          @page { size: A4; margin: 8mm; }
          html, body { width: 210mm; background: white; }
          .cv-toolbar { display: none; }
          .edit-banner { display: none; }
          .cv-wrapper { background: white; }
          .cv-container { margin: 0; padding: 0; max-width: 100%; }
          .cv-card { box-shadow: none; border-radius: 0; border: none; }
          .cv-head { padding: 24px 32px; }
          .cv-main { padding: 16px 20px; }
          .cv-sidebar { padding: 16px 14px; }
          .cv-head-name { font-size: 22px; }
          .cv-summary, .timeline-desc, .skill-item, .edu-degree, .lang-item { font-size: 10px; line-height: 1.3; }
          .timeline-title { font-size: 12px; }
          .section { margin-bottom: 16px; }
          .timeline-item { padding-bottom: 12px; }
          .editable-textarea, .editable-input { border: none; background: transparent; padding: 0; resize: none; }
          .btn-remove-skill { display: none; }
        }
      `}</style>

      <div className="cv-wrapper">
        {/* TOOLBAR */}
        <div className="cv-toolbar">
          <div className="cv-toolbar-inner">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button className="btn-back" onClick={() => window.history.back()}>← Retour</button>
              <span className="toolbar-brand">📄 CV Professionnel</span>
            </div>
            <div className="toolbar-actions">
              <button className="btn-dark" onClick={toggleDarkMode}>
                {darkMode ? "☀️" : "🌙"}
              </button>
              {editing ? (
                <>
                  <button className="btn-cancel" onClick={handleCancel}>Annuler</button>
                  <button className="btn-save" onClick={handleSave}>✓ Sauvegarder</button>
                </>
              ) : (
                <>
                  <button className="btn-edit" onClick={() => setEditing(true)}>✏️ Modifier</button>
                  <button className="btn-print" onClick={() => window.print()}>🖨️ Télécharger PDF</button>
                </>
              )}
            </div>
          </div>
          {editing && (
            <div className="edit-banner">
              ✏️ Mode édition actif — modifiez les champs surlignés en bleu, puis cliquez sur "Sauvegarder".
            </div>
          )}
        </div>

        {/* CV */}
        <div className="cv-container">
          <div className="cv-card">

            {/* HEADER */}
            <div className="cv-head">
              <div className="cv-head-pattern" />
              <div className="cv-head-content">
                <div className="cv-avatar">{initials || "?"}</div>
                <div className="cv-head-info">
                  <div className="cv-head-badge">
                    {display.experiences?.[0]?.position || "Candidat"}
                  </div>
                  <div className="cv-head-name">
                    {display.first_name || "Prénom"} {display.last_name || "Nom"}
                  </div>
                  <div className="cv-head-contacts">
                    {display.email && <span className="cv-head-contact">✉ {display.email}</span>}
                    {display.phone && <span className="cv-head-contact">✆ {display.phone}</span>}
                    {display.city && <span className="cv-head-contact">◎ {display.city}</span>}
                    {display.linkedin && (
                      <span className="cv-head-contact">
                        <a href={display.linkedin} target="_blank">LinkedIn</a>
                      </span>
                    )}
                    {display.github && (
                      <span className="cv-head-contact">
                        <a href={display.github} target="_blank">GitHub</a>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="cv-grid">

              {/* MAIN */}
              <div className="cv-main">

                {/* Profil */}
                {display.summary && (
                  <div className="section">
                    <div className="section-head">
                      <span className="section-dot" />
                      À propos
                    </div>
                    {editing ? (
                      <textarea
                        className="editable-textarea"
                        value={editedCv.summary}
                        onChange={(e) => updateSummary(e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <p className="cv-summary">{display.summary}</p>
                    )}
                  </div>
                )}

                {/* Expériences */}
                {display.experiences?.length > 0 && (
                  <div className="section">
                    <div className="section-head">
                      <span className="section-dot" />
                      Expériences Professionnelles
                    </div>
                    <div className="timeline">
                      {display.experiences.map((exp: any, i: number) => (
                        <div className="timeline-item" key={i}>
                          <span className={`timeline-dot ${i > 0 ? "past" : ""}`} />
                          <div className="timeline-header">
                            <div className="timeline-title">{exp.position}</div>
                            <span className={`timeline-badge ${i > 0 ? "past" : ""}`}>
                              {exp.start_date} — {exp.end_date || "présent"}
                            </span>
                          </div>
                          <div className="timeline-company">{exp.company}</div>
                          {editing ? (
                            <textarea
                              className="editable-textarea"
                              value={editedCv.experiences[i].description || ""}
                              onChange={(e) => updateExpDesc(i, e.target.value)}
                              rows={3}
                            />
                          ) : (
                            exp.description && (
                              <div className="timeline-desc">{exp.description}</div>
                            )
                          )}
                          {exp.technologies?.length > 0 && (
                            <div className="exp-tags">
                              {exp.technologies.map((tech: string, j: number) => (
                                <span className="exp-tag" key={j}>{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SIDEBAR */}
              <div className="cv-sidebar">

                {/* Compétences */}
                {display.skills?.length > 0 && (
                  <div className="section">
                    <div className="section-head">
                      <span className="section-dot" />
                      Compétences
                    </div>
                    {editing ? (
                      editedCv.skills.map((skill: string, i: number) => (
                        <div className="skill-edit-row" key={i}>
                          <input
                            className="editable-input"
                            value={skill}
                            onChange={(e) => updateSkill(i, e.target.value)}
                          />
                          <button className="btn-remove-skill" onClick={() => removeSkill(i)}>×</button>
                        </div>
                      ))
                    ) : (
                      display.skills.map((skill: string, i: number) => (
                        <div className="skill-item" key={i}>
                          <span className="skill-dot" />
                          {skill}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Formation */}
                {display.education?.length > 0 && (
                  <div className="section">
                    <div className="section-head">
                      <span className="section-dot" />
                      Formation
                    </div>
                    {display.education.map((edu: any, i: number) => (
                      <div className="edu-item" key={i}>
                        <div className="edu-degree">{edu.degree}</div>
                        <div className="edu-school">{edu.school}</div>
                        <div className="edu-year">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Langues */}
                {display.languages?.length > 0 && (
                  <div className="section">
                    <div className="section-head">
                      <span className="section-dot" />
                      Langues
                    </div>
                    {display.languages.map((lang: any, i: number) => (
                      <div className="lang-item" key={i}>
                        <span>{lang.name}</span>
                        <span className="lang-badge">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications */}
                {display.certifications?.length > 0 && (
                  <div className="section">
                    <div className="section-head">
                      <span className="section-dot" />
                      Certifications
                    </div>
                    {display.certifications.map((cert: any, i: number) => (
                      <div className="edu-item" key={i}>
                        <div className="edu-degree">{cert.name}</div>
                        {cert.issuer && <div className="edu-school">{cert.issuer}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="cv-footer">
              Généré par Job Coach AI — {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}