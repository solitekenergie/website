"use client";

import Script from "next/script";
import { useMemo, useState } from "react";
import { SuppliersSection } from "@/components/sections/SuppliersSection";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { absoluteUrl } from "@/lib/site";

type FaqItem = {
  question: string;
  answer: string;
  expanded?: boolean;
};

const faqs: FaqItem[] = [
  {
    question: "Quel délai moyen pour une installation résidentielle ?",
    answer:
      "Entre la signature et la mise en service, comptez 6 à 10 semaines : visites techniques, démarches Enedis/Consuel, approvisionnement matériel et pose. Nous calons le planning dès la validation.",
    expanded: true,
  },
  {
    question: "Faut-il déposer une déclaration préalable en mairie ?",
    answer:
      "Oui, pour la majorité des toitures. Nous préparons les pièces (plans, photos, fiches techniques) et déposons le dossier en votre nom pour sécuriser le calendrier.",
  },
  {
    question: "Comment dimensionnez-vous la puissance kWc ?",
    answer:
      "Nous partons de votre conso annuelle, de l’orientation/toiture (ombrage, inclinaison) et du taux d’autoconsommation cible. Le simulateur interne calcule la puissance optimale et le ROI estimé.",
  },
  {
    question: "Puis-je combiner autoconsommation et vente de surplus ?",
    answer:
      "Oui. L’excédent est injecté sur le réseau via un contrat de vente. Nous comparons autoconsommation pure, vente de surplus, ou stockage selon votre profil et les tarifs d’achat du moment.",
  },
  {
    question: "Quels matériels utilisez-vous (panneaux, onduleurs) ?",
    answer:
      "Nous travaillons avec des marques européennes et Tier-1 (modules, onduleurs, micro-onduleurs) et choisissons la référence adaptée à la toiture, à l’ombrage et au budget, tout en gardant 12 à 25 ans de garantie produit.",
  },
  {
    question: "Quelle maintenance prévoir après la pose ?",
    answer:
      "Un contrôle visuel annuel suffit souvent. Nous proposons un monitoring en ligne, nettoyage des modules si encrassement, et vérification des serrages électriques selon les préconisations fabricants.",
  },
  {
    question: "La toiture doit-elle être renforcée ?",
    answer:
      "Nous vérifions systématiquement la charpente et le support. La plupart des toitures supportent la charge (~12-15 kg/m²). En cas de doute, un bureau d’études structure émet ses préconisations.",
  },
  {
    question: "Quelles aides financières sont disponibles ?",
    answer:
      "Prime à l’autoconsommation, TVA réduite selon la puissance, tarif de rachat du surplus et éventuelles aides locales. Nous montons le dossier et détaillons l’impact sur votre budget et ROI.",
  },
  {
    question: "Comment se passe le raccordement et le Consuel ?",
    answer:
      "Nous gérons la demande de raccordement, la conformité électrique (Consuel) et la mise en service. Vous signez uniquement les autorisations, nous suivons les échanges jusqu’à l’activation.",
  },
  {
    question: "Est-ce compatible avec une pompe à chaleur ou VE ?",
    answer:
      "Oui, on peut piloter l’autoconsommation pour alimenter une PAC ou recharger un véhicule électrique aux heures ensoleillées, avec une domotique ou un routeur solaire adaptés.",
  },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const faqBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FAQ",
      item: absoluteUrl("/faq"),
    },
  ],
};

export default function FaqPage() {
  const [openStates, setOpenStates] = useState<boolean[]>(() => faqs.map((item) => Boolean(item.expanded)));

  const toggledFaqs = useMemo(
    () =>
      faqs.map((item, idx) => ({
        ...item,
        expanded: openStates[idx],
      })),
    [openStates],
  );

  const handleToggle = (index: number) => {
    setOpenStates((prev) => prev.map((val, idx) => (idx === index ? !val : val)));
  };

  return (
    <>
      <Script id="faq-page-schema" type="application/ld+json">
        {JSON.stringify(faqPageSchema)}
      </Script>
      <Script id="faq-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(faqBreadcrumbSchema)}
      </Script>

      <div className="flex flex-col">
        {/* Hero */}
        <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-[1440px]">
            <p className="mb-4 font-['Figtree'] text-sm font-semibold uppercase tracking-widest text-[#2DB180]">
              Questions fréquentes
            </p>
            <h1 className="font-title text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1]">
              FAQ
            </h1>
            <p className="mt-6 max-w-[600px] font-['Figtree'] text-base leading-relaxed text-white/70 sm:text-lg">
              Tout ce que vous devez savoir avant de vous lancer dans votre projet d&apos;installation solaire ou ENR en Alsace.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">

          {/* Questions */}
          <div className="flex flex-col gap-3">
            {toggledFaqs.map((item, index) => (
              <FaqCard key={`${item.question}-${index}`} index={index} item={item} onToggle={() => handleToggle(index)} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-[#161A1E] px-6 py-10 text-center sm:px-12 sm:py-14">
            <p className="font-title text-2xl font-black uppercase text-white sm:text-3xl">
              Vous n&apos;avez pas trouvé votre réponse ?
            </p>
            <p className="max-w-[480px] font-['Figtree'] text-base text-white/70">
              Notre équipe vous répond sous 24h, sans engagement.
            </p>
            <a
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#2DB180] px-8 py-4 font-['Figtree'] text-sm font-bold uppercase text-white transition-opacity hover:opacity-90 sm:text-base"
            >
              <AnimatedLink className="text-white">
                Contacter SOLITEK
              </AnimatedLink>
            </a>
          </div>
        </section>

        <SuppliersSection />
      </div>
    </>
  );
}

function FaqCard({ index, item, onToggle }: { index: number; item: FaqItem; onToggle: () => void }) {
  const isOpen = Boolean(item.expanded);
  const answerId = `faq-answer-${index}`;

  return (
    <div
      className={`w-full rounded-xl px-5 py-5 sm:px-8 sm:py-6 ${
        isOpen ? "outline outline-1 outline-black" : "outline outline-1 outline-[#CCCCCC] hover:outline-black/30"
      } transition-all`}
    >
      <button
        type="button"
        className="flex w-full items-center gap-4 text-left"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
      >
        <span className="flex-1 font-['Figtree'] text-base font-semibold leading-snug text-black sm:text-lg lg:text-xl">
          {item.question}
        </span>
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#2DB180] sm:h-12 sm:w-12">
          <Chevron isOpen={isOpen} />
        </span>
      </button>

      <div
        id={answerId}
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-4 grid-rows-[0fr] opacity-100"
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-['Figtree'] text-sm leading-relaxed text-black/60 sm:text-base lg:text-lg">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
