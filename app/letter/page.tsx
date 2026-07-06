"use client";

import { useEffect, useState } from "react";

export default function LetterPage() {
  const [letter, setLetter] = useState<any>(null);
  const [cv, setCv] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [editedBody, setEditedBody] = useState("");

  useEffect(() => {
    const storedLetter = localStorage.getItem("letter_result");
    const storedCv = localStorage.getItem("cv_result");
    if (storedLetter) {
      const parsed = JSON.parse(storedLetter);
      setLetter(parsed);
      setEditedBody(parsed.body);
    }
    if (storedCv) setCv(JSON.parse(storedCv));
  }, []);

  const handleSave = () => {
    const updated = { ...letter, body: editedBody };
    setLetter(updated);
    localStorage.setItem("letter_result", JSON.stringify(updated));
    setEditing(false);
  };

  if (!letter) return (
    <div className="flex items-center justify-center min-h-screen text-slate-400">
      Aucune lettre à afficher. Retournez à l'accueil.
    </div>
  );

  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f1f5f9; font-family: 'Lora', Georgia, serif; }

        .page-wrapper {
          min-height: 100vh;
          padding: 40px 20px;
          background: #f1f5f9;
        }

        .toolbar {
          max-width: 720px;
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

        .letter-page {
          width: 720px;
          max-width: 100%;
          margin: 0 auto;
          background: white;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          border-radius: 4px;
          padding: 64px 72px;
        }

        .letter-accent {
          width: 40px;
          height: 3px;
          background: #1e40af;
          margin-bottom: 40px;
        }

        .letter-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 48px;
          align-items: flex-start;
        }

        .letter-sender {
          font-family: 'Inter', sans-serif;
        }

        .sender-name {
          font-size: 17px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 5px;
        }

        .sender-info {
          font-size: 12px;
          color: #64748b;
          line-height: 1.7;
        }

        .letter-date {
          font-size: 13px;
          color: #64748b;
          font-family: 'Inter', sans-serif;
          text-align: right;
        }

        .letter-subject {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 28px;
          padding-bottom: 14px;
          border-bottom: 1px solid #e2e8f0;
        }

        .letter-subject span {
          color: #1e40af;
        }

        .letter-body {
          font-size: 14px;
          line-height: 1.85;
          color: #1e293b;
          white-space: pre-wrap;
        }

        .letter-body-edit {
          font-size: 14px;
          line-height: 1.85;
          color: #1e293b;
          width: 100%;
          min-height: 400px;
          border: 1.5px solid #3b82f6;
          border-radius: 8px;
          padding: 16px;
          font-family: 'Lora', Georgia, serif;
          resize: vertical;
          outline: none;
          background: #f8fafc;
        }

        .edit-hint {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #3b82f6;
          margin-bottom: 12px;
          font-style: italic;
        }

        @media print {
          body { background: white; }
          .page-wrapper { padding: 0; background: white; }
          .toolbar { display: none; }
          .letter-page {
            box-shadow: none;
            border-radius: 0;
            width: 100%;
            padding: 56px 64px;
          }
          @page {
            margin: 0;
            size: A4;
          }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="toolbar">
          <button className="btn-back" onClick={() => window.history.back()}>← Retour</button>
          <div className="toolbar-right">
            {editing ? (
              <>
                <button className="btn-cancel" onClick={() => { setEditedBody(letter.body); setEditing(false); }}>
                  Annuler
                </button>
                <button className="btn-save" onClick={handleSave}>
                  ✓ Sauvegarder
                </button>
              </>
            ) : (
              <>
                <button className="btn-edit" onClick={() => setEditing(true)}>
                  ✏️ Modifier
                </button>
                <button className="btn-print" onClick={() => window.print()}>
                  Télécharger en PDF
                </button>
              </>
            )}
          </div>
        </div>

        <div className="letter-page">
          <div className="letter-accent"></div>

          <div className="letter-header">
            <div className="letter-sender">
              <div className="sender-name">
                {cv?.first_name || ""} {cv?.last_name || ""}
              </div>
              <div className="sender-info">
                {cv?.email && <>{cv.email}<br /></>}
                {cv?.phone && <>{cv.phone}<br /></>}
                {cv?.city && <>{cv.city}<br /></>}
                {cv?.linkedin && <>{cv.linkedin}</>}
              </div>
            </div>
            <div className="letter-date">{today}</div>
          </div>

          {letter.subject && (
            <div className="letter-subject">
              Objet : <span>{letter.subject}</span>
            </div>
          )}

          {editing ? (
            <>
              <p className="edit-hint">Modifiez le texte directement ci-dessous, puis cliquez sur "Sauvegarder".</p>
              <textarea
                className="letter-body-edit"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
            </>
          ) : (
            <div className="letter-body">{letter.body}</div>
          )}
        </div>
      </div>
    </>
  );
}