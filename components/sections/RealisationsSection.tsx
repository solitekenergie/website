/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";

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

  // Responsive card width
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 500;
    if (window.innerWidth < 640) return window.innerWidth - 32; // mobile: full width minus padding
    if (window.innerWidth < 1024) return 400; // tablet
    return 500; // desktop
  };

  const getGap = () => {
    if (typeof window === 'undefined') return 80;
    if (window.innerWidth < 640) return 16; // mobile
    if (window.innerWidth < 1024) return 40; // tablet
    return 80; // desktop
  };

  const [cardWidth, setCardWidth] = useState(getCardWidth());
  const [gap, setGap] = useState(getGap());

  const offset = current * (cardWidth + gap);

  const handleNext = () => setCurrent((prev) => (prev + 1) % cards.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + cards.length) % cards.length);

  // Update card width on resize
  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth());
      setGap(getGap());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <section className="inline-flex h-full w-full flex-col items-start justify-start gap-12 p-4 sm:gap-16 sm:p-8 lg:gap-20 lg:p-[100px]">
      <h2 className="self-stretch text-center font-title text-3xl font-black uppercase leading-tight text-black sm:text-4xl sm:leading-tight lg:text-[56px] lg:leading-[56px]">
        Nos réalisations
      </h2>

      <div className="w-full overflow-hidden">
        <div
          className="flex items-start gap-4 transition-transform duration-500 ease-out sm:gap-10 lg:gap-20"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {cards.map((card, index) => (
            <div
              key={card.title + card.image + index}
              className="inline-flex flex-col items-start justify-start gap-4 sm:gap-6"
              style={{ minWidth: `${cardWidth}px`, width: `${cardWidth}px` }}
            >
              <div className="flex h-[250px] w-full flex-col items-center justify-end gap-2 overflow-hidden rounded-lg bg-[#161A1E] p-6 sm:h-[300px] sm:p-8 lg:h-[350px] lg:p-10">
                <img className="h-full w-full rounded object-cover" src={card.image} alt={card.alt} />
              </div>
              <div className="flex flex-col items-start justify-start gap-4 self-stretch sm:gap-6">
                <div className="flex flex-col items-start justify-start gap-3 self-stretch sm:gap-4">
                  <h3 className="self-stretch font-title text-xl font-black uppercase leading-tight text-[#161A1E] sm:text-2xl sm:leading-tight lg:text-[28px] lg:leading-[28px]">
                    {card.title}
                  </h3>
                  <p className="self-stretch font-['Figtree'] text-sm font-normal leading-6 text-black/60 opacity-80 sm:text-[15px]">
                    {card.date}
                  </p>
                </div>
                <p className="self-stretch font-['Figtree'] text-base font-normal leading-relaxed text-black sm:text-lg sm:leading-[27px]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="inline-flex items-center justify-center gap-2 self-stretch">
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
