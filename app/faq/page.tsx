"use client";

import { useMemo, useState } from "react";
import { SuppliersSection } from "@/components/sections/SuppliersSection";

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
    <div className="flex flex-col">
      <section className="w-full h-full pt-[160px] pb-20 px-[60px] inline-flex flex-col justify-start items-center gap-14">
        <div className="text-[#161A1E] text-[72px] leading-[72px] font-title font-black uppercase">FAQ</div>

        <div className="self-stretch flex flex-col justify-start items-center gap-6">
          <div className="flex w-full max-w-[1320px] flex-col gap-[14px]">
            {toggledFaqs.map((item, index) => (
              <FaqCard key={`${item.question}-${index}`} item={item} onToggle={() => handleToggle(index)} />
            ))}
          </div>
        </div>

        <div className="self-stretch inline-flex justify-center items-start">
          <button
            type="button"
            className="px-12 py-6 bg-[#2DB180] rounded-[8px] inline-flex items-center justify-center gap-2"
          >
            <span className="text-white text-[16px] leading-[19.2px] font-['Figtree'] font-bold uppercase">
              Obtenir de l’aide
            </span>
          </button>
        </div>
      </section>

      <SuppliersSection />
    </div>
  );
}

function FaqCard({ item, onToggle }: { item: FaqItem; onToggle: () => void }) {
  const isOpen = Boolean(item.expanded);
  return (
    <div
      className={`w-full flex flex-col gap-[18px] rounded-[12px] px-9 py-8 ${
        isOpen ? "outline outline-1 outline-black" : "outline outline-1 outline-[#CCCCCC]"
      }`}
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="inline-flex items-center gap-4">
        <div className="flex flex-1 items-center">
          <div className="flex-1 text-black text-[32px] leading-[38.4px] font-['Figtree'] font-semibold">
            {item.question}
          </div>
        </div>
        <div className="flex items-center justify-center pointer-events-none">
          <div className="w-[47px] rounded-[8px] bg-[#2DB180] px-6 py-4 inline-flex items-center justify-center">
            <Chevron isOpen={isOpen} />
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="flex flex-col gap-4">
          <div className="text-black/60 text-[24px] leading-[36px] font-['Figtree'] font-normal">{item.answer}</div>
        </div>
      ) : null}
    </div>
  );
}

function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={isOpen ? "" : "-rotate-90"}
    >
      <path d="M3 6L8 11L13 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
