"use client";

import { useMemo, useState } from "react";
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
  tags?: string[];
  readingTime?: number;
};

const PAGE_SIZE = 6;

function ContentCard({
  slug,
  title,
  date,
  description,
  image,
  featured,
  tags,
  readingTime,
  basePath,
}: ContentCardData & { basePath: string }) {
  const category = tags?.[0];

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
        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[#2DB180] px-3 py-1 font-ui text-xs font-semibold text-white">
            A la une
          </span>
        )}
        {!featured && category && (
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

type ContentGridProps = {
  cards: ContentCardData[];
  basePath: string;
  allTags?: string[];
  emptyMessage?: string;
  filterId?: string;
};

export function ContentGrid({
  cards,
  basePath,
  allTags,
  emptyMessage = "Aucun contenu disponible pour le moment.",
  filterId = "category-filter",
}: ContentGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return cards;
    return cards.filter((c) => c.tags?.includes(activeTag));
  }, [cards, activeTag]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  if (cards.length === 0) {
    return (
      <div className="text-center font-ui text-lg text-black/60">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      {allTags && allTags.length > 0 && (
        <div className="flex w-full flex-col gap-2 sm:max-w-xs">
          <label
            htmlFor={filterId}
            className="font-ui text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            Catégorie
          </label>
          <div className="relative">
            <select
              id={filterId}
              value={activeTag ?? ""}
              onChange={(event) => {
                setActiveTag(event.target.value || null);
                setVisible(PAGE_SIZE);
              }}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-left font-ui text-sm font-medium text-[#161A1E] outline-none transition-colors hover:border-slate-300 focus:border-[#2DB180]"
            >
              <option value="">Toutes les catégories</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/50"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {shown.map((card, i) => (
          <FadeIn key={card.slug} delay={i * 80}>
            <ContentCard {...card} basePath={basePath} />
          </FadeIn>
        ))}
      </div>

      {shown.length === 0 && activeTag && (
        <div className="text-center font-ui text-base text-black/50">
          Aucun contenu pour cette catégorie.
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
