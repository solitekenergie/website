const sections = [
  {
    title: "Éditeur du site",
    content: [
      "SOLITEK - Société à responsabilité limitée (SARL)",
      "Siège social : 7 Rue de Bucarest, 67100 Strasbourg",
      "SIRET : 989 724 976 00018",
      "RCS Strasbourg",
      "Capital social : 500 €",
      "Objet social : Énergie renouvelable",
      "Durée : 99 ans",
      "Président : Florian Baret",
      "Email : solitek@outlook.fr",
      "Téléphone : +33 7 83 28 97 77",
    ],
  },
  {
    title: "Publication légale de constitution",
    content: [
      "Support : LEFIGARO.fr",
      "Date de parution : 10/07/2025",
      "N° d'annonce : L0095494",
      "URL : https://annonces-legales.lefigaro.fr/a/L0095494",
    ],
  },
  {
    title: "Responsable de publication",
    content: ["Studio Fief - studiofief.com"],
  },
  {
    title: "Hébergement",
    content: ["Hébergeur : Railway (Railway Corp.)", "Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis", "Site : railway.com"],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "Le contenu du site (textes, images, marques) est protégé par le droit d'auteur. Toute reproduction nécessite l'accord préalable de Solitek.",
    ],
  },
  {
    title: "Données personnelles",
    content: [
      "Les informations collectées via le formulaire de contact sont utilisées pour répondre aux demandes. Elles ne sont pas vendues à des tiers.",
      "Pour exercer vos droits (accès, rectification, suppression), contactez solitek@outlook.fr.",
    ],
  },
  {
    title: "Médiation",
    content: [
      "En cas de litige, vous pouvez saisir un médiateur de la consommation après une réclamation écrite restée sans réponse sous 30 jours.",
    ],
  },
];

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de SOLITEK : éditeur du site, hébergement et informations juridiques.",
  alternates: {
    canonical: "/mentions-legales",
  },
  openGraph: {
    title: "Mentions légales | SOLITEK",
    description:
      "Mentions légales de SOLITEK : éditeur du site, hébergement et informations juridiques.",
    url: "/mentions-legales",
  },
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <section className="w-full px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-20 lg:pb-[80px] lg:pt-[120px]">
      <div className="mx-auto max-w-[720px]">
        <h1 className="mb-12 font-title text-3xl font-black uppercase text-[#161A1E] sm:text-4xl lg:text-[48px] lg:leading-tight">
          Mentions légales
        </h1>

        <div className="flex flex-col divide-y divide-slate-200">
          {sections.map((section) => (
            <div key={section.title} className="py-8">
              <h2 className="mb-4 font-ui text-xs font-semibold uppercase tracking-wide text-[#1E9A66]">
                {section.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {section.content.map((line) => {
                  const urlMatch = line.match(/^(URL\s*:\s*)(https?:\/\/.+)$/);
                  return (
                    <li key={line} className="font-ui text-sm leading-relaxed text-black/60 sm:text-base">
                      {urlMatch ? (
                        <>
                          {urlMatch[1]}
                          <a href={urlMatch[2]} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1E9A66]">
                            {urlMatch[2]}
                          </a>
                        </>
                      ) : line}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
