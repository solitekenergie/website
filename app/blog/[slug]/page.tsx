import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticle, getArticleSlugs, getArticles } from "@/lib/blog-strapi";
import { getPost, getPostSlugs, listPosts, extractFaqFromMarkdown } from "@/lib/blog";
import { renderContentBlock } from "@/components/content/ContentBlocks";
import { shortenSeoDescription, shortenSeoTitle } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

function formatDate(value: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}


export async function generateStaticParams() {
  const [strapiSlugs, mdSlugs] = await Promise.all([getArticleSlugs(), getPostSlugs()]);
  const allSlugs = Array.from(new Set([...strapiSlugs, ...mdSlugs]));
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const strapiPost = await getArticle(resolvedParams.slug);
  const post = strapiPost ?? await getPost(resolvedParams.slug);

  if (!post) return { title: "Article non trouvé" };

  const title = "title" in post ? post.title : "";
  const excerpt = "excerpt" in post ? post.excerpt : "";
  const slug = post.slug;
  const image = post.image;

  const seoTitle = shortenSeoTitle(title);
  const seoDescription = shortenSeoDescription(excerpt);

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `/blog/${slug}`,
      ...(image ? { images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;

  // Try both sources, Strapi takes priority
  const [strapiPost, mdPost] = await Promise.all([
    getArticle(resolvedParams.slug),
    getPost(resolvedParams.slug),
  ]);

  const post = strapiPost ?? mdPost;
  if (!post) notFound();

  const isStrapiPost = !!strapiPost;
  const title = post.title;
  const date = post.date;
  const excerpt = post.excerpt;
  const slug = post.slug;
  const image = post.image;
  const readingTime = post.readingTime;
  const tags = post.tags;

  // Related posts from both sources
  const [strapiAll, mdAll] = await Promise.all([getArticles(), listPosts()]);
  const allPostsMerged = [
    ...strapiAll.map((p) => ({ slug: p.slug, title: p.title, date: p.date, excerpt: p.excerpt, tags: p.tags })),
    ...mdAll.filter((p) => !strapiAll.some((s) => s.slug === p.slug)).map((p) => ({ slug: p.slug, title: p.title, date: p.date, excerpt: p.excerpt, tags: p.tags })),
  ];

  const otherPosts = allPostsMerged
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aCommon = a.tags.filter((t) => tags.includes(t)).length;
      const bCommon = b.tags.filter((t) => tags.includes(t)).length;
      return bCommon - aCommon;
    })
    .slice(0, 3);

  const faqEntries = mdPost ? extractFaqFromMarkdown(mdPost.content) : [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: date || undefined,
    ...(image ? { image: absoluteUrl(image) } : {}),
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    author: { "@type": "Organization", name: "SOLITEK" },
    publisher: {
      "@type": "Organization",
      name: "SOLITEK",
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
  };

  const faqSchema = faqEntries.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="flex flex-col">
        {/* Hero */}
        <section className="bg-[#161A1E] px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-20 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-[1440px]">
            <Link
              href="/blog"
              className="mb-4 inline-flex items-center gap-2 font-ui text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-70"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Blog
            </Link>
            <h1 className="font-title text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-[56px] lg:leading-[1.1]">
              {title}
            </h1>
            <p className="mt-6 font-ui text-sm text-white/50">
              {formatDate(date)} · {readingTime} min de lecture
            </p>
          </div>
        </section>

        {/* Image de couverture */}
        {image && (
          <section className="w-full px-4 pt-10 sm:px-8 sm:pt-14 lg:px-20 lg:pt-16">
            <div className="mx-auto max-w-[800px]">
              <div className="relative h-[240px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[420px]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 800px) 100vw, 800px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Contenu */}
        <section className={`w-full px-4 pb-16 sm:px-8 sm:pb-20 lg:px-20 lg:pb-[100px] ${image ? "pt-8 sm:pt-10 lg:pt-12" : "pt-10 sm:pt-14 lg:pt-16"}`}>
          <div className="mx-auto max-w-[800px]">
            {isStrapiPost && strapiPost?.contenu ? (
              <div className="flex flex-col gap-8">
                {strapiPost.contenu.map((block, index) => renderContentBlock(block, index))}
              </div>
            ) : mdPost?.htmlContent ? (
              <div
                className="prose prose-lg prose-slate max-w-none prose-headings:font-title prose-headings:font-black prose-headings:uppercase prose-headings:text-[#161A1E] prose-a:text-[#1E9A66] prose-strong:text-[#161A1E]"
                dangerouslySetInnerHTML={{ __html: mdPost.htmlContent }}
              />
            ) : null}

            {/* CTA */}
            <div className="mt-12 rounded-2xl bg-[#2DB180]/10 px-6 py-8 text-center sm:px-10 sm:py-10">
              <p className="font-title text-xl font-black uppercase text-[#161A1E] sm:text-2xl">
                Vous avez un projet ?
              </p>
              <p className="mt-2 font-ui text-base text-black/60">
                Étude gratuite, solution sur mesure, accompagnement complet.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2DB180] px-8 py-4 font-ui text-sm font-bold uppercase text-white transition-colors hover:bg-[#26a072] sm:text-base"
              >
                Contactez-nous
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Autres articles */}
        {otherPosts.length >= 2 && (
          <section className="w-full border-t border-black/10 px-4 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-20 lg:pb-[100px] lg:pt-[80px]">
            <div className="mx-auto max-w-[1440px]">
              <h2 className="mb-8 font-title text-2xl font-black uppercase text-[#161A1E] sm:mb-10 sm:text-3xl lg:mb-12 lg:text-[40px]">
                Autres articles
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#2DB180]/30 hover:shadow-lg"
                  >
                    <h3 className="font-title text-lg font-black uppercase text-[#161A1E] line-clamp-2 sm:text-xl">
                      {p.title}
                    </h3>
                    <p className="font-ui text-sm text-black/50">{formatDate(p.date)}</p>
                    <p className="font-ui text-sm leading-relaxed text-black/70 line-clamp-3">{p.excerpt}</p>
                    <span className="mt-auto font-ui text-sm font-semibold text-[#1E9A66] group-hover:text-[#178A59]">
                      Lire l&apos;article →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
