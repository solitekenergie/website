"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";

type CardData = {
  slug: string;
  image: string;
  title: string;
  date: string;
  description: string;
  featured?: boolean;
};

const PAGE_SIZE = 6;

function Card({ slug, image, title, date, description, featured }: CardData) {
  return (
    <Link
      href={`/realisations/${slug}`}
      className="group relative flex flex-col gap-4 hover:opacity-80 transition-opacity"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#161A1E]">
        {image ? (
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={image}
            alt={title}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center p-8">
            <img src="/logo.png" alt="SOLITEK" className="w-20 h-auto opacity-30 object-contain" />
          </div>
        )}
        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[#2DB180] px-3 py-1 font-['Figtree'] text-xs font-semibold text-white">
            À la une
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-title font-black uppercase text-xl text-[#161A1E] sm:text-2xl lg:text-[26px] lg:leading-tight line-clamp-2">
          {title}
        </div>
        <div className="font-['Figtree'] text-sm text-black/50">{date}</div>
        <div className="font-['Figtree'] text-sm sm:text-base text-black/70 line-clamp-3 leading-relaxed">
          {description}
        </div>
      </div>
    </Link>
  );
}

export function RealisationsGrid({ cards }: { cards: CardData[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = cards.slice(0, visible);
  const hasMore = visible < cards.length;

  if (cards.length === 0) {
    return (
      <div className="text-center font-['Figtree'] text-lg text-black/60">
        Aucune réalisation disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {shown.map((card) => (
          <Card key={card.slug} {...card} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#161A1E] px-8 py-3 font-title text-sm font-semibold text-[#161A1E] transition-colors hover:bg-[#161A1E] hover:text-white"
          >
            Afficher plus
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
