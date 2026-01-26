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
    <section className="w-full h-full pt-[160px] pb-[80px] px-[100px] inline-flex flex-col justify-start items-center gap-10 bg-[#F5F7FA]">
      <div className="text-center text-[#161A1E] text-[56px] leading-[56px] font-title font-black uppercase">
        Mentions légales
      </div>

      <div className="w-full max-w-[1100px] flex flex-col gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-[12px] border border-[#CCCCCC] bg-white px-8 py-6 flex flex-col gap-3"
          >
            <h2 className="text-[#161A1E] text-[24px] leading-[28.8px] font-['Figtree'] font-bold uppercase">
              {section.title}
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-[16px] leading-[24px] font-['Figtree'] text-black/70">
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
