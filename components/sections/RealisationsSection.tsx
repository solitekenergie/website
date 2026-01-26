/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

const cards = [
  {
    title: "Titre projets",
    date: "12 juillet 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.",
    image: "/images/mission-installation-01.jpg",
    alt: "Installation photovoltaïque réalisée",
  },
  {
    title: "Titre projets",
    date: "12 juillet 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.",
    image: "/images/mission-panneaux-02.jpg",
    alt: "Champ de panneaux solaires installés",
  },
  {
    title: "Titre projets",
    date: "12 juillet 2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec elit nec diam efficitur auctor. Praesent eros est, laoreet in ornare vitae, volutpat quis velit. Quisque condimentum finibus nisl vel viverra. Nunc sed lectus sem. Aenean non lacus ac lacus dictum tincidunt. Duis risus ligula, porttitor a orci vel, consequat feugiat nibh.",
    image: "/images/mission-detail-technique-03.jpg",
    alt: "Détail technique d’une installation solaire",
  },
];

function NavButton({ direction }: { direction: "left" | "right" }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      aria-label={isLeft ? "Précédent" : "Suivant"}
      className="flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[rgba(22,26,30,0.07)]"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isLeft ? "-rotate-180" : ""}
        aria-hidden="true"
      >
        <path d="M5 12H19" stroke="#161A1E" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 5L19 12L12 19" stroke="#161A1E" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export function RealisationsSection() {
  const [current, setCurrent] = useState(0);
  const cardWidth = 500;
  const gap = 80;
  const offset = current * (cardWidth + gap);

  const handleNext = () => setCurrent((prev) => (prev + 1) % cards.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className="w-full h-full p-[100px] inline-flex flex-col justify-start items-start gap-20">
      <div className="self-stretch text-center text-black text-[56px] leading-[56px] font-title font-black uppercase">
        Nos réalisation
      </div>

      <div className="w-full overflow-hidden">
        <div
          className="flex items-start gap-20 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {cards.map((card, index) => (
            <div
              key={card.title + card.image + index}
              className="inline-flex flex-col justify-start items-start gap-6 min-w-[500px]"
              style={{ width: `${cardWidth}px` }}
            >
              <div className="w-full h-[350px] p-10 bg-[#161A1E] overflow-hidden rounded-[8px] flex flex-col justify-end items-center gap-2">
                <img className="h-full w-full rounded-[6px] object-cover" src={card.image} alt={card.alt} />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch text-[#161A1E] text-[28px] leading-[28px] font-title font-black uppercase">
                    {card.title}
                  </div>
                  <div className="self-stretch text-[15px] leading-6 font-['Figtree'] font-normal text-black/60 opacity-80">
                    {card.date}
                  </div>
                </div>
                <div className="self-stretch text-black text-[18px] leading-[27px] font-['Figtree'] font-normal">
                  {card.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="self-stretch inline-flex justify-center items-center gap-2">
        <span onClick={handlePrev}>
          <NavButton direction="left" />
        </span>
        <span onClick={handleNext}>
          <NavButton direction="right" />
        </span>
      </div>
    </section>
  );
}
