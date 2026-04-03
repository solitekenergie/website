import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  htmlContent: string;
  readingTime: number;
  tags: string[];
  category: string;
  image?: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const BLOG_EXTENSIONS = [".md", ".mdx"];

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: "wrap" })
  .use(rehypeSanitize)
  .use(rehypeStringify);

async function renderMarkdownToHtml(content: string): Promise<string> {
  const result = await markdownProcessor.process(content);
  return String(result);
}

function parseTags(raw: unknown): string[] {
  if (typeof raw === "string") {
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  }
  if (Array.isArray(raw)) {
    return raw.map(String).filter(Boolean);
  }
  return [];
}

async function loadPostFromFile(filePath: string, slug: string): Promise<BlogPost> {
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const title = data.title ?? slug;
  const date = data.date ? String(data.date) : "";
  const excerpt = data.excerpt ?? content.slice(0, 160);
  const tags = parseTags(data.tags);
  const category = data.category ? String(data.category) : "";
  const image = data.image ? String(data.image) : undefined;

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const htmlContent = await renderMarkdownToHtml(content);

  return {
    slug,
    title,
    date,
    excerpt,
    content,
    htmlContent,
    readingTime,
    tags,
    category,
    image,
  };
}

export async function listPosts(): Promise<BlogPost[]> {
  const entries = await fs.readdir(BLOG_DIR).catch(() => []);
  const files = entries.filter((file) => BLOG_EXTENSIONS.some((ext) => file.endsWith(ext)));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const filePath = path.join(BLOG_DIR, file);
      return loadPostFromFile(filePath, slug);
    }),
  );

  return posts.sort((a, b) => {
    const aDate = a.date ? Date.parse(a.date) : 0;
    const bDate = b.date ? Date.parse(b.date) : 0;
    const safeA = Number.isNaN(aDate) ? 0 : aDate;
    const safeB = Number.isNaN(bDate) ? 0 : bDate;
    return safeB - safeA;
  });
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  for (const ext of BLOG_EXTENSIONS) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    try {
      await fs.access(filePath);
      return await loadPostFromFile(filePath, slug);
    } catch {
      // keep trying other extensions
    }
  }
  return null;
}

export async function getPostSlugs(): Promise<string[]> {
  const entries = await fs.readdir(BLOG_DIR).catch(() => []);
  return entries
    .filter((file) => BLOG_EXTENSIONS.some((ext) => file.endsWith(ext)))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await listPosts();
  return posts.filter((p) => p.tags.includes(tag));
}

export type FaqEntry = { question: string; answer: string };

/**
 * Extract H2 headings as questions and the following paragraph(s) as answers.
 * Used to generate FAQPage schema for Google FAQ carousel.
 */
export function extractFaqFromMarkdown(content: string): FaqEntry[] {
  const lines = content.split("\n");
  const entries: FaqEntry[] = [];
  let currentQuestion = "";
  let currentAnswer: string[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)/);
    if (h2Match) {
      if (currentQuestion && currentAnswer.length > 0) {
        entries.push({
          question: currentQuestion.replace(/^\d+\.\s*/, ""),
          answer: currentAnswer.join(" ").trim(),
        });
      }
      currentQuestion = h2Match[1].trim();
      currentAnswer = [];
    } else if (currentQuestion) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("-") && !trimmed.startsWith("*")) {
        currentAnswer.push(trimmed.replace(/\*\*/g, ""));
      }
    }
  }

  if (currentQuestion && currentAnswer.length > 0) {
    entries.push({
      question: currentQuestion.replace(/^\d+\.\s*/, ""),
      answer: currentAnswer.join(" ").trim(),
    });
  }

  return entries;
}

export async function getAllTags(): Promise<string[]> {
  const posts = await listPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}
