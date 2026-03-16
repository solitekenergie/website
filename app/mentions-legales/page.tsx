const sections = [
  {
    title: "Éditeur du site",
    content: [
      "Solitek - [raison sociale à compléter]",
      "Adresse du siège : [à compléter]",
      "SIRET : [à compléter]",
      "Email : solitek@outlook.fr",
      "Téléphone : [à compléter]",
    ],
  },
  {
    title: "Responsable de publication",
    content: ["[Nom et fonction à compléter]"],
  },
  {
    title: "Hébergement",
    content: ["Hébergeur : [nom de l'hébergeur]", "Adresse : [adresse complète]", "Téléphone : [à compléter]"],
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
  title: "Mentions Légales | SOLITEK",
  description:
    "Mentions légales du site SOLITEK, installateur certifié RGE en Alsace : éditeur, hébergeur et informations légales.",
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
              <h2 className="mb-4 font-['Figtree'] text-xs font-semibold uppercase tracking-widest text-[#2DB180]">
                {section.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {section.content.map((line) => (
                  <li key={line} className="font-['Figtree'] text-sm leading-relaxed text-black/60 sm:text-base">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
