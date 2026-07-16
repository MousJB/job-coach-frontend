import Link from "next/link";

export const metadata = {
  title: "Mentions légales — Job Coach AI",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mt-6 mb-8">Mentions légales</h1>

        <section className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 className="font-bold text-slate-900 mb-2">Éditeur du site</h2>
            <p>
              Job Coach AI est un projet individuel indépendant, actuellement en phase de test,
              édité et exploité par une personne physique (particulier), sans structure juridique
              enregistrée à ce jour.
            </p>
            <p className="mt-2">
              Contact : <strong>[à compléter — email dédié au projet]</strong>
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">Directeur de la publication</h2>
            <p>L&apos;éditeur mentionné ci-dessus.</p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">Hébergement</h2>
            <p>
              <strong>Frontend (application web)</strong> :<br />
              Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              <br />
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                vercel.com
              </a>
            </p>
            <p className="mt-3">
              <strong>Backend (traitement des données)</strong> :<br />
              Render Services, Inc. — 525 Brannan St, Suite 300, San Francisco, CA 94107, États-Unis
              <br />
              <a
                href="https://render.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                render.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">Nature du service</h2>
            <p>
              Job Coach AI est un outil gratuit, actuellement en phase de test (bêta), qui permet de
              générer un CV réécrit et une lettre de motivation adaptés à une offre d&apos;emploi, à
              partir de textes fournis par l&apos;utilisateur. Voir les{" "}
              <Link href="/cgu" className="text-blue-600 hover:underline">
                conditions générales d&apos;utilisation
              </Link>{" "}
              et la{" "}
              <Link href="/confidentialite" className="text-blue-600 hover:underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
