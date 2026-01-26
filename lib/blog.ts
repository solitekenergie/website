import fs from "fs/promises";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const BLOG_EXTENSIONS = [".md", ".mdx"];

function parseFrontMatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const [, frontmatter, content] = match;
  const data: Record<string, string> = {};

  frontmatter.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key) return;
    data[key.trim()] = rest.join(":").trim();
  });

  return { data, content: content.trim() };
}

async function loadPostFromFile(filePath: string, slug: string): Promise<BlogPost> {
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = parseFrontMatter(raw);
  const title = data.title ?? slug;
  const date = data.date ?? "";
  const excerpt = data.excerpt ?? content.slice(0, 160);

  return {
    slug,
    title,
    date,
    excerpt,
    content,
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
