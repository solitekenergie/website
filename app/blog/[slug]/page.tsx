import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/lib/blog";

const formatDate = (value: string) => {
  if (!value) return "Date à préciser";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(parsed);
};

function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((block, index) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-semibold text-slate-900">
            {block.replace(/^###\s+/, "")}
          </h3>
        );
      }

      if (block.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-semibold text-slate-900">
            {block.replace(/^##\s+/, "")}
          </h2>
        );
      }

      if (block.startsWith("- ")) {
        const items = block.split("\n").map((item) => item.replace(/^-\s*/, ""));
        return (
          <ul key={index} className="list-disc space-y-2 pl-5 text-slate-700">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="leading-7 text-slate-700 whitespace-pre-line">
          {block}
        </p>
      );
    });
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return { title: "Article non trouvé | Solitek" };
  }

  return {
    title: `${post.title} | Solitek`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <p className="text-sm text-slate-500">{formatDate(post.date)}</p>
        <h1 className="text-3xl font-semibold text-slate-900">{post.title}</h1>
        <p className="text-slate-600">{post.excerpt}</p>
      </div>

      <div className="space-y-4 text-base">{renderContent(post.content)}</div>
    </article>
  );
}
