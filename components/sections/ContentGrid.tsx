"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

export type ContentCardData = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  featured?: boolean;
  category?: string;
  readingTime?: number;
};

const PAGE_SIZE = 6;

/* ── Card standard ── */
function ContentCard({
  slug,
  title,
  date,
  description,
  image,
  category,
  readingTime,
  basePath,
}: ContentCardData & { basePath: string }) {
  return (
    <Link
      href={`${basePath}/${slug}`}
      className="group relative flex flex-col gap-4 hover:opacity-80 transition-opacity"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#161A1E]">
        {image ? (
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center p-8">
            <Image src="/logo.png" alt="SOLITEK" width={80} height={40} className="opacity-30 object-contain" />
          </div>
        )}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-[#2DB180] px-3 py-1 font-ui text-xs font-semibold text-white">
            {category}
          </span>
        )}
        {readingTime && (
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 font-ui text-xs font-semibold text-white">
            {readingTime} min
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-title font-black uppercase text-xl text-[#161A1E] sm:text-2xl lg:text-[26px] lg:leading-tight line-clamp-2">
          {title}
        </div>
        <div className="font-ui text-sm text-black/50">{date}</div>
        <div className="font-ui text-sm sm:text-base text-black/70 line-clamp-3 leading-relaxed">
          {description}
        </div>
      </div>
    </Link>
  );
}

/* ── Card mise en avant (grande) ── */
function FeaturedCard({
  slug,
  title,
  date,
  description,
  image,
  category,
  readingTime,
  basePath,
}: ContentCardData & { basePath: string }) {
  return (
    <Link
      href={`${basePath}/${slug}`}
      className="group relative flex flex-col gap-6 hover:opacity-90 transition-opacity sm:flex-row sm:gap-8"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#161A1E] sm:aspect-[3/2] sm:flex-1">
        {image ? (
          <Image
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 60vw"
            priority
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center p-8">
            <Image src="/logo.png" alt="SOLITEK" width={120} height={60} className="opacity-30 object-contain" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[#2DB180] px-3 py-1 font-ui text-xs font-semibold text-white">
          A la une
        </span>
        {readingTime && (
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 font-ui text-xs font-semibold text-white">
            {readingTime} min
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center gap-3 sm:flex-1">
        {category && (
          <span className="w-fit rounded-full bg-[#2DB180]/10 px-3 py-1 font-ui text-xs font-semibold text-[#1E9A66]">
            {category}
          </span>
        )}
        <h3 className="font-title font-black uppercase text-2xl text-[#161A1E] sm:text-3xl lg:text-[36px] lg:leading-tight line-clamp-3">
          {title}
        </h3>
        <p className="font-ui text-sm text-black/50">{date}</p>
        <p className="font-ui text-base text-black/70 leading-relaxed line-clamp-4 sm:text-lg">
          {description}
        </p>
      </div>
    </Link>
  );
}

/* ── Filtres défilants ── */
function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string | null;
  onChange: (cat: string | null) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <button
          onClick={() => onChange(null)}
          className={`shrink-0 rounded-full px-5 py-2.5 font-ui text-sm font-semibold transition-all ${
            active === null
              ? "bg-[#161A1E] text-white"
              : "bg-slate-100 text-[#161A1E] hover:bg-slate-200"
          }`}
        >
          Tout
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(active === cat ? null : cat)}
            className={`shrink-0 rounded-full px-5 py-2.5 font-ui text-sm font-semibold transition-all ${
              active === cat
                ? "bg-[#2DB180] text-white"
                : "bg-slate-100 text-[#161A1E] hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Grille principale ── */
type ContentGridProps = {
  cards: ContentCardData[];
  basePath: string;
  categories?: string[];
  emptyMessage?: string;
};

export function ContentGrid({
  cards,
  basePath,
  categories,
  emptyMessage = "Aucun contenu disponible pour le moment.",
}: ContentGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return cards;
    return cards.filter((c) => c.category === activeCategory);
  }, [cards, activeCategory]);

  // Séparer le featured du reste
  const featuredCard = filtered.find((c) => c.featured);
  const regularCards = featuredCard
    ? filtered.filter((c) => c !== featuredCard)
    : filtered;

  const shown = regularCards.slice(0, visible);
  const hasMore = visible < regularCards.length;

  if (cards.length === 0) {
    return (
      <div className="text-center font-ui text-lg text-black/60">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      {/* Filtres défilants */}
      {categories && categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={(cat) => {
            setActiveCategory(cat);
            setVisible(PAGE_SIZE);
          }}
        />
      )}

      {/* Card mise en avant */}
      {featuredCard && (
        <FadeIn>
          <FeaturedCard {...featuredCard} basePath={basePath} />
        </FadeIn>
      )}

      {/* Grille standard */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {shown.map((card, i) => (
          <FadeIn key={card.slug} delay={i * 80}>
            <ContentCard {...card} basePath={basePath} />
          </FadeIn>
        ))}
      </div>

      {shown.length === 0 && !featuredCard && (
        <div className="text-center font-ui text-base text-black/50">
          {activeCategory ? "Aucun contenu pour cette catégorie." : emptyMessage}
        </div>
      )}

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
