import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité — Job Coach AI",
};

export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mt-6 mb-8">Politique de confidentialité</h1>

        <section className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 className="font-bold text-slate-900 mb-2">Quelles données sont traitées ?</h2>
            <p>
              Lorsque vous utilisez Job Coach AI, vous collez le texte de votre CV et celui d&apos;une
              offre d&apos;emploi. Ce texte peut contenir des données personnelles : nom, prénom,
              coordonnées (email, téléphone, ville), parcours professionnel, formations.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">Pourquoi ces données sont-elles traitées ?</h2>
            <p>
              Uniquement pour générer, à votre demande, un CV réécrit et une lettre de motivation
              adaptés à l&apos;offre que vous avez fournie, ainsi qu&apos;un score de compatibilité.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">Ces données sont-elles partagées ?</h2>
            <p>
              Oui, techniquement nécessaire au fonctionnement du service : le texte de votre CV et de
              l&apos;offre est transmis à un prestataire tiers de traitement par intelligence
              artificielle (OpenRouter, et le fournisseur du modèle d&apos;IA sous-jacent utilisé pour
              générer le contenu) dans le seul but d&apos;effectuer ce traitement. Selon le modèle
              utilisé, ce prestataire peut être situé hors de l&apos;Union européenne. Ces données ne
              sont ni vendues, ni utilisées à des fins publicitaires, ni partagées à d&apos;autres fins.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">Combien de temps ces données sont-elles conservées ?</h2>
            <p>
              Job Coach AI ne dispose pas de base de données ni de comptes utilisateurs. Un cache
              technique temporaire (environ 15 minutes) peut être conservé côté serveur pour éviter de
              relancer un traitement identique en cas de nouvelle tentative rapprochée, puis il est
              automatiquement supprimé.
            </p>
            <p className="mt-2">
              Les résultats générés (CV réécrit, lettre) sont conservés localement dans votre
              navigateur (stockage local) afin de vous permettre de les consulter, modifier et
              télécharger — ils ne sont jamais envoyés ailleurs que vers votre propre appareil. Vous
              pouvez les effacer à tout moment en vidant les données de votre navigateur pour ce site.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
              d&apos;effacement de vos données. Le service étant conçu pour ne rien stocker durablement
              de votre côté, ce droit s&apos;exerce principalement en vidant le stockage local de votre
              navigateur. Pour toute question, vous pouvez nous contacter à :{" "}
              <strong>[à compléter — email dédié au projet]</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">Cookies</h2>
            <p>
              Job Coach AI n&apos;utilise aucun cookie publicitaire ni traceur tiers à des fins de
              suivi commercial.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-900 mb-2">Sécurité</h2>
            <p>Toutes les communications entre votre navigateur et nos serveurs sont chiffrées (HTTPS).</p>
          </div>

          <p className="text-xs text-slate-400 pt-4 border-t border-slate-100">
            Cette politique peut évoluer avec le service, encore en phase de test.
          </p>
        </section>
      </div>
    </main>
  );
}
