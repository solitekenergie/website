const sections = [
  {
    title: "Données collectées",
    content: [
      "Formulaire de contact : nom, email, téléphone (facultatif), message.",
      "Données techniques : logs de navigation anonymisés utilisés à des fins statistiques.",
    ],
  },
  {
    title: "Base légale et finalités",
    content: [
      "Consentement : réponse aux demandes envoyées via le formulaire.",
      "Intérêt légitime : sécurisation du site et amélioration de l'expérience utilisateur.",
    ],
  },
  {
    title: "Durée de conservation",
    content: [
      "Messages de contact : conservés le temps du traitement puis archivés au maximum 24 mois.",
      "Données techniques : conservées 12 mois dans les journaux de sécurité.",
    ],
  },
  {
    title: "Partage des données",
    content: [
      "Les données ne sont pas revendues. Elles peuvent être partagées avec des prestataires techniques pour l'hébergement ou l'envoi d'emails, dans le respect du RGPD.",
    ],
  },
  {
    title: "Vos droits",
    content: [
      "Accès, rectification, suppression, limitation et opposition selon les articles 15 à 21 du RGPD.",
      "Pour exercer vos droits, contactez contact@solitek.fr en précisant l'objet de votre demande.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Le site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire n'est déposé sans votre consentement.",
    ],
  },
  {
    title: "Contact DPO",
    content: [
      "Email : contact@solitek.fr",
      "Adresse postale : [à compléter]",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="w-full h-full pt-[160px] pb-[80px] px-[100px] inline-flex flex-col justify-start items-center gap-10 bg-[#F5F7FA]">
      <div className="text-center text-[#161A1E] text-[56px] leading-[56px] font-title font-black uppercase">
        Politique de confidentialité
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
