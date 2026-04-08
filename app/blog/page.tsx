import type { Metadata } from "next";
import { getArticles, getAllTags as getStrapiTags } from "@/lib/blog-strapi";
import { listPosts as listMarkdownPosts, getAllTags as getMarkdownTags } from "@/lib/blog";
import { ContentGrid } from "@/components/sections/ContentGrid";

export const metadata: Metadata = {
  title: "Blog énergie en Alsace",
  description:
    "Guides sur le photovoltaïque, la pompe à chaleur, la climatisation et les aides en Alsace. Des conseils clairs pour préparer votre projet.",
  alternates: {
    canonical: "/blog",
  },
  keywords: [
    "blog photovoltaïque Alsace",
    "conseils panneaux solaires",
    "aides photovoltaïque 2026",
    "pompe à chaleur conseils",
    "climatisation réversible guide",
    "rénovation énergétique Strasbourg",
  ],
  openGraph: {
    title: "Blog énergie en Alsace | SOLITEK",
    description:
      "Guides sur le photovoltaïque, la pompe à chaleur, la climatisation et les aides en Alsace.",
    url: "/blog",
  },
};

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function BlogPage() {
  // Strapi articles + markdown fallback, merged and deduplicated by slug
  const [strapiPosts, markdownPosts, strapiTags, mdTags] = await Promise.all([
    getArticles(),
    listMarkdownPosts(),
    getStrapiTags(),
    getMarkdownTags(),
  ]);

  const seenSlugs = new Set(strapiPosts.map((p) => p.slug));
  const fallbackPosts = markdownPosts.filter((p) => !seenSlugs.has(p.slug));
  const allPosts = [...strapiPosts, ...fallbackPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    readingTime: p.readingTime,
    tags: p.tags,
    category: p.category,
    image: p.image,
    contenu: [],
    misEnAvant: false,
  }))].sort((a, b) => {
    const aDate = a.date ? Date.parse(a.date) : 0;
    const bDate = b.date ? Date.parse(b.date) : 0;
    return (Number.isNaN(bDate) ? 0 : bDate) - (Number.isNaN(aDate) ? 0 : aDate);
  });

  const allTags = Array.from(new Set([...strapiTags, ...mdTags])).sort();

  const cards = allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: formatDate(post.date),
    description: post.excerpt,
    readingTime: post.readingTime,
    tags: post.tags,
    image: post.image,
  }));

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 font-ui text-sm font-semibold uppercase tracking-wide text-[#1E9A66]">
            Nos articles
          </p>
          <h1 className="font-title text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1]">
            Blog
          </h1>
          <p className="mt-6 max-w-[600px] font-ui text-base leading-relaxed text-white/70 sm:text-lg">
            Guides et conseils pour réussir votre projet énergétique : photovoltaïque, pompe à chaleur, climatisation et aides financières.
          </p>
        </div>
      </section>

      <section className="w-full px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-[100px] lg:pt-[100px]">
        <div className="mx-auto max-w-[1440px]">
          <ContentGrid
            cards={cards}
            basePath="/blog"
            allTags={allTags}
            emptyMessage="Aucun article disponible pour le moment."
            filterId="blog-category-filter"
          />
        </div>
      </section>
    </div>
  );
}
