"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

type BlogCardData = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime?: number;
  tags?: string[];
};

const PAGE_SIZE = 6;

function BlogCard({ slug, title, date, excerpt, readingTime, tags }: BlogCardData) {
  const category = tags?.[0];

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white transition-all hover:border-[#2DB180]/30 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6">
        {category && (
          <span className="rounded-full bg-[#2DB180]/10 px-3 py-1 font-ui text-xs font-semibold text-[#1E9A66]">
            {category}
          </span>
        )}
        {readingTime && (
          <span className="font-ui text-xs text-black/40">{readingTime} min</span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-4">
        <h3 className="font-title text-lg font-bold leading-snug text-[#161A1E] line-clamp-2 sm:text-xl">
          {title}
        </h3>
        <p className="text-left font-ui text-sm leading-relaxed text-black/60 line-clamp-2">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-ui text-xs text-black/40">{date}</span>
          <span className="flex items-center gap-1.5 font-ui text-sm font-semibold text-[#1E9A66] transition-colors group-hover:text-[#178A59]">
            Lire
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogGrid({ cards, allTags }: { cards: BlogCardData[]; allTags?: string[] }) {
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
        Aucun article disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      {allTags && allTags.length > 0 && (
        <div className="flex w-full flex-col gap-2 sm:max-w-xs">
          <label
            htmlFor="blog-category-filter"
            className="font-ui text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            Catégorie
          </label>
          <div className="relative">
            <select
              id="blog-category-filter"
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {shown.map((card, i) => (
          <FadeIn key={card.slug} delay={i * 80}>
            <BlogCard {...card} />
          </FadeIn>
        ))}
      </div>

      {shown.length === 0 && (
        <div className="text-center font-ui text-base text-black/50">
          Aucun article pour ce filtre.
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
