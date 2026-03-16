const sections = [
  {
    title: "Éditeur du site",
    content: [
      "Solitek - [raison sociale à compléter]",
      "Adresse du siège : [à compléter]",
      "SIRET : [à compléter]",
      "Email : contact@solitek.fr",
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
      "Pour exercer vos droits (accès, rectification, suppression), contactez contact@solitek.fr.",
    ],
  },
  {
    title: "Médiation",
    content: [
      "En cas de litige, vous pouvez saisir un médiateur de la consommation après une réclamation écrite restée sans réponse sous 30 jours.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <section className="w-full h-full px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-20 lg:pb-[80px] lg:pt-[120px] inline-flex flex-col justify-start items-center gap-8 sm:gap-10 bg-[#F5F7FA]">
      <div className="text-center text-[#161A1E] font-title font-black uppercase text-3xl sm:text-4xl lg:text-[56px] lg:leading-[56px]">
        Mentions légales
      </div>

      <div className="w-full max-w-[1100px] flex flex-col gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-[12px] border border-[#CCCCCC] bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8 flex flex-col gap-3"
          >
            <h2 className="text-[#161A1E] text-lg sm:text-xl lg:text-[24px] font-['Figtree'] font-bold uppercase">
              {section.title}
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm sm:text-[16px] leading-[24px] font-['Figtree'] text-black/70">
              {section.content.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
