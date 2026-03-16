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
    <section className="w-full px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-20 lg:pb-[80px] lg:pt-[120px]">
      <div className="mx-auto max-w-[720px]">
        <h1 className="mb-12 font-title text-3xl font-black uppercase text-[#161A1E] sm:text-4xl lg:text-[48px] lg:leading-tight">
          Politique de confidentialité
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
