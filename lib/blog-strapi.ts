import { ContentBlock, getStrapiImageUrl, richTextToPlainText } from "./realisations";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms-production-8fb5.up.railway.app";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

type StrapiMedia = {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

export type Article = {
  id: number;
  documentId: string;
  titre: string;
  slug: string;
  extrait: string;
  datePublication: string;
  categorie?: string;
  tags?: string;
  imageCouverture?: StrapiMedia;
  contenu: ContentBlock[];
  misEnAvant: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

/** Parsed article ready for rendering */
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  tags: string[];
  category: string;
  image?: string;
  contenu: ContentBlock[];
  misEnAvant: boolean;
};

function parseTags(raw?: string): string[] {
  if (!raw) return [];
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}

function estimateReadingTime(contenu: ContentBlock[]): number {
  let wordCount = 0;
  for (const block of contenu) {
    if (block.__component === "content-blocks.paragraphe") {
      const text = richTextToPlainText(block.texte);
      wordCount += text.split(/\s+/).filter(Boolean).length;
    }
    if (block.__component === "content-blocks.image-et-texte") {
      const text = richTextToPlainText(block.texte);
      wordCount += text.split(/\s+/).filter(Boolean).length;
    }
    if (block.__component === "content-blocks.deux-colonnes") {
      wordCount += richTextToPlainText(block.colonneGauche).split(/\s+/).filter(Boolean).length;
      wordCount += richTextToPlainText(block.colonneDroite).split(/\s+/).filter(Boolean).length;
    }
    if (block.__component === "content-blocks.citation") {
      const text = richTextToPlainText(block.texte);
      wordCount += text.split(/\s+/).filter(Boolean).length;
    }
    if (block.__component === "content-blocks.callout") {
      const text = richTextToPlainText(block.texte);
      wordCount += text.split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200));
}

function toPost(article: Article): BlogPost {
  return {
    slug: article.slug,
    title: article.titre,
    date: article.datePublication,
    excerpt: article.extrait,
    readingTime: estimateReadingTime(article.contenu || []),
    tags: parseTags(article.tags),
    category: article.categorie || "",
    image: article.imageCouverture ? getStrapiImageUrl(article.imageCouverture.url) : undefined,
    contenu: article.contenu || [],
    misEnAvant: article.misEnAvant,
  };
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const publicHeaders: HeadersInit = { "Content-Type": "application/json" };

  const publicRes = await fetch(url, {
    headers: publicHeaders,
    ...options,
  });

  if (publicRes.ok) {
    return publicRes.json();
  }

  if ((publicRes.status === 401 || publicRes.status === 403) && STRAPI_API_TOKEN) {
    const authRes = await fetch(url, {
      headers: {
        ...publicHeaders,
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      ...options,
    });

    if (authRes.ok) {
      return authRes.json();
    }

    throw new Error(`Strapi API error: ${authRes.status} ${authRes.statusText}`);
  }

  throw new Error(`Strapi API error: ${publicRes.status} ${publicRes.statusText}`);
}

export async function getArticles(): Promise<BlogPost[]> {
  try {
    const data = await fetchAPI(
      "/articles?populate[imageCouverture]=true&populate[contenu][populate]=*&sort[0]=datePublication:desc&pagination[pageSize]=100",
      { next: { revalidate: 60 } }
    );
    const articles: Article[] = data.data || [];
    return articles.map(toPost);
  } catch (error) {
    console.error("Error fetching articles from Strapi:", error);
    return [];
  }
}

export async function getArticle(slug: string): Promise<BlogPost | null> {
  try {
    const data = await fetchAPI(
      `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[imageCouverture]=true&populate[contenu][populate]=*`,
      { next: { revalidate: 60 } }
    );

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return toPost(data.data[0]);
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
}

export async function getArticleSlugs(): Promise<string[]> {
  try {
    const data = await fetchAPI("/articles?fields[0]=slug&pagination[pageSize]=100", {
      next: { revalidate: 60 },
    });
    return (data.data || []).map((item: { slug: string }) => item.slug);
  } catch (error) {
    console.error("Error fetching article slugs:", error);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getArticles();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}
