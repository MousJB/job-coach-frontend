"use client";

import { useEffect, useState } from "react";

export default function CVPage() {
  const [cv, setCv] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [editedCv, setEditedCv] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cv_result");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCv(parsed);
      setEditedCv(JSON.parse(JSON.stringify(parsed)));
    }
  }, []);

  const handleSave = () => {
    setCv(JSON.parse(JSON.stringify(editedCv)));
    localStorage.setItem("cv_result", JSON.stringify(editedCv));
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedCv(JSON.parse(JSON.stringify(cv)));
    setEditing(false);
  };

  const updateSummary = (val: string) => {
    setEditedCv({ ...editedCv, summary: val });
  };

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #f1f5f9;
          font-family: 'Inter', sans-serif;
        }

        .page-wrapper {
          min-height: 100vh;
          padding: 40px 20px;
          background: #f1f5f9;
        }

        .toolbar {
          width: 210mm;
          max-width: 100%;
          margin: 0 auto 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .toolbar-right {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .btn-print {
          background: #1e40af;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }

        .btn-edit {
          background: white;
          color: #1e40af;
          border: 1.5px solid #1e40af;
          padding: 9px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }

        .btn-save {
          background: #16a34a;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }

        .btn-cancel {
          background: white;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
          padding: 9px 16px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }

        .btn-back {
          color: #64748b;
          font-size: 14px;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Inter', sans-serif;
        }

        .edit-mode-banner {
          width: 210mm;
          max-width: 100%;
          margin: 0 auto 16px;
          background: #eff6ff;
          border: 1.5px solid #bfdbfe;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 13px;
          color: #1e40af;
          font-family: 'Inter', sans-serif;
        }

        .cv-page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: white;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          overflow: hidden;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .cv-header {
          background: #0f172a;
          color: white;
          padding: 20px 30px 16px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .cv-name {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 3px;
        }

        .cv-title {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .cv-contacts {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .cv-contact-item {
          font-size: 11px;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cv-contact-item a {
          color: #93c5fd;
          text-decoration: none;
        }

        .cv-body {
          display: grid;
          grid-template-columns: 1fr 200px;
        }

        .cv-main {
          padding: 18px 22px 18px 28px;
          border-right: 1px solid #e2e8f0;
        }

        .cv-sidebar {
          padding: 18px;
          background: #f8fafc;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .section {
          margin-bottom: 14px;
          break-inside: avoid;
          page-break-inside: avoid;
        }

        .section-title {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1e40af;
          margin-bottom: 8px;
          padding-bottom: 5px;
          border-bottom: 2px solid #dbeafe;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .cv-summary {
          font-size: 11px;
          line-height: 1.5;
          color: #334155;
        }

        .exp-item {
          margin-bottom: 10px;
          break-inside: avoid;
          page-break-inside: avoid;
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2px;
        }

        .exp-title {
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
        }

        .exp-dates {
          font-size: 10px;
          color: #64748b;
          white-space: nowrap;
          margin-left: 8px;
          font-weight: 500;
        }

        .exp-company {
          font-size: 11px;
          color: #1e40af;
          font-weight: 500;
          margin-bottom: 4px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .exp-desc {
          font-size: 11px;
          line-height: 1.35;
          color: #475569;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 6px;
        }

        .exp-tag {
          font-size: 9px;
          background: #eff6ff;
          color: #1d4ed8;
          padding: 2px 5px;
          border-radius: 3px;
          font-weight: 500;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .skill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #1e40af;
          flex-shrink: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .skill-name {
          font-size: 11px;
          color: #334155;
        }

        .edu-item {
          margin-bottom: 10px;
          break-inside: avoid;
          page-break-inside: avoid;
        }

        .edu-degree {
          font-size: 11px;
          font-weight: 600;
          color: #0f172a;
        }

        .edu-school {
          font-size: 10px;
          color: #64748b;
          margin-top: 1px;
        }

        .edu-year {
          font-size: 10px;
          color: #94a3b8;
          margin-top: 1px;
        }

        .lang-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .lang-name {
          font-size: 11px;
          color: #334155;
          font-weight: 500;
        }

        .lang-level {
          font-size: 10px;
          color: #64748b;
        }

        /* EDIT STYLES */
        .editable-textarea {
          width: 100%;
          font-size: 11px;
          line-height: 1.5;
          color: #334155;
          border: 1.5px solid #93c5fd;
          border-radius: 4px;
          padding: 6px 8px;
          font-family: 'Inter', sans-serif;
          resize: vertical;
          outline: none;
          background: #f0f9ff;
          min-height: 60px;
        }

        .editable-input {
          font-size: 11px;
          color: #334155;
          border: 1.5px solid #93c5fd;
          border-radius: 4px;
          padding: 3px 6px;
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
          font-size: 14px;
          padding: 0;
          line-height: 1;
          flex-shrink: 0;
        }

        @media print {
          @page { size: A4; margin: 8mm; }
          html, body { width: 210mm; height: 297mm; background: white; }
          .toolbar { display: none; }
          .edit-mode-banner { display: none; }
          .page-wrapper { padding: 0; margin: 0; background: white; }
          .cv-page { width: 194mm; min-height: auto; box-shadow: none; border-radius: 0; }
          .cv-header { padding: 16px 22px; }
          .cv-main { padding: 14px 18px; }
          .cv-sidebar { padding: 14px; }
          .cv-name { font-size: 20px; }
          .cv-summary, .exp-desc, .skill-name, .edu-degree, .edu-school, .lang-name {
            font-size: 10px;
            line-height: 1.3;
          }
          .exp-title { font-size: 11px; }
          .section { margin-bottom: 12px; }
          .exp-item { margin-bottom: 8px; }
          .exp-item, .section, .edu-item { break-inside: avoid; page-break-inside: avoid; }
          .editable-textarea, .editable-input { border: none; background: transparent; padding: 0; resize: none; }
          .btn-remove-skill { display: none; }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="toolbar">
          <button className="btn-back" onClick={() => window.history.back()}>← Retour</button>
          <div className="toolbar-right">
            {editing ? (
              <>
                <button className="btn-cancel" onClick={handleCancel}>Annuler</button>
                <button className="btn-save" onClick={handleSave}>✓ Sauvegarder</button>
              </>
            ) : (
              <>
                <button className="btn-edit" onClick={() => setEditing(true)}>✏️ Modifier</button>
                <button className="btn-print" onClick={() => window.print()}>Télécharger en PDF</button>
              </>
            )}
          </div>
        </div>

        {editing && (
          <div className="edit-mode-banner">
            ✏️ Mode édition actif — modifiez directement les champs surlignés en bleu, puis cliquez sur "Sauvegarder".
          </div>
        )}

        <div className="cv-page">
          <div className="cv-header">
            <div className="cv-name">
              {display.first_name || "Prénom"} {display.last_name || "Nom"}
            </div>
            <div className="cv-title">
              {display.experiences?.[0]?.position || "Développeur Full Stack"}
            </div>
            <div className="cv-contacts">
              {display.email && <span className="cv-contact-item">✉ {display.email}</span>}
              {display.phone && <span className="cv-contact-item">✆ {display.phone}</span>}
              {display.city && <span className="cv-contact-item">◎ {display.city}</span>}
              {display.linkedin && (
                <span className="cv-contact-item">
                  <a href={display.linkedin} target="_blank">LinkedIn</a>
                </span>
              )}
              {display.github && (
                <span className="cv-contact-item">
                  <a href={display.github} target="_blank">GitHub</a>
                </span>
              )}
            </div>
          </div>

          <div className="cv-body">
            <div className="cv-main">
              {/* Résumé */}
              {display.summary && (
                <div className="section">
                  <div className="section-title">Profil</div>
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
                  <div className="section-title">Expériences</div>
                  {display.experiences.map((exp: any, i: number) => (
                    <div className="exp-item" key={i}>
                      <div className="exp-header">
                        <div className="exp-title">{exp.position}</div>
                        <div className="exp-dates">
                          {exp.start_date} — {exp.end_date || "présent"}
                        </div>
                      </div>
                      <div className="exp-company">{exp.company}</div>
                      {editing ? (
                        <textarea
                          className="editable-textarea"
                          value={editedCv.experiences[i].description || ""}
                          onChange={(e) => updateExpDesc(i, e.target.value)}
                          rows={3}
                        />
                      ) : (
                        exp.description && (
                          <div className="exp-desc">{exp.description}</div>
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
              )}
            </div>

            <div className="cv-sidebar">
              {/* Compétences */}
              {display.skills?.length > 0 && (
                <div className="section">
                  <div className="section-title">Compétences</div>
                  {editing ? (
                    editedCv.skills.map((skill: string, i: number) => (
                      <div className="skill-edit-row" key={i}>
                        <input
                          className="editable-input"
                          value={skill}
                          onChange={(e) => updateSkill(i, e.target.value)}
                        />
                        <button
                          className="btn-remove-skill"
                          onClick={() => removeSkill(i)}
                        >×</button>
                      </div>
                    ))
                  ) : (
                    display.skills.map((skill: string, i: number) => (
                      <div className="skill-item" key={i}>
                        <div className="skill-dot"></div>
                        <div className="skill-name">{skill}</div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Formation */}
              {display.education?.length > 0 && (
                <div className="section">
                  <div className="section-title">Formation</div>
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
                  <div className="section-title">Langues</div>
                  {display.languages.map((lang: any, i: number) => (
                    <div className="lang-item" key={i}>
                      <span className="lang-name">{lang.name}</span>
                      <span className="lang-level">{lang.level}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {display.certifications?.length > 0 && (
                <div className="section">
                  <div className="section-title">Certifications</div>
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
        </div>
      </div>
    </>
  );
}