import Link from "next/link";

export const metadata = {
  title: "Conditions générales d'utilisation — Job Coach AI",
};

export default function CGU() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mt-6 mb-8">
          Conditions générales d&apos;utilisation
        </h1>

        <section className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 className="font-bold text-slate-900 mb-2">1. Objet</h2>
            <p>
              Job Coach AI est un service gratuit, actuellement en phase de test (bêta), qui génère un
              CV réécrit et une lettre de motivation adaptés à une offre d&apos;emploi, à partir des
              textes fournis par l&apos;utilisateur. L&apos;utilisation du service implique
              l&apos;acceptation pleine et entière des présentes conditions.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">2. Description et limites du service</h2>
            <p>
              Le contenu généré (CV, lettre, score de compatibilité) est produit par un système
              d&apos;intelligence artificielle. Bien qu&apos;un contrôle automatique tente de détecter
              les informations inventées, ce contrôle n&apos;est pas infaillible. Il est de la
              responsabilité de l&apos;utilisateur de relire attentivement et de valider tout contenu
              généré avant de l&apos;envoyer à un tiers (recruteur, entreprise). Job Coach AI ne
              garantit ni l&apos;exactitude, ni la complétude, ni un quelconque résultat (obtention
              d&apos;un entretien ou d&apos;un emploi) lié à l&apos;utilisation du service.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">3. Disponibilité du service</h2>
            <p>
              Le service étant en phase de test, sa disponibilité n&apos;est pas garantie de manière
              continue. Ses fonctionnalités, son fonctionnement et les présentes conditions sont
              susceptibles d&apos;évoluer à tout moment.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">4. Propriété intellectuelle</h2>
            <p>
              Vous restez propriétaire du contenu de votre CV et de toute information que vous
              fournissez. Le contenu généré (CV réécrit, lettre de motivation) vous appartient et peut
              être utilisé librement pour vos candidatures.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">5. Responsabilité</h2>
            <p>
              L&apos;éditeur ne pourra être tenu responsable des conséquences directes ou indirectes
              résultant de l&apos;utilisation du contenu généré par le service, ni d&apos;une
              interruption temporaire ou définitive du service.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">6. Données personnelles</h2>
            <p>
              Le traitement des données fournies est décrit dans notre{" "}
              <Link href="/confidentialite" className="text-blue-600 hover:underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">7. Contact</h2>
            <p>
              Pour toute question relative à ces conditions :{" "}
              <strong>[à compléter — email dédié au projet]</strong>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
