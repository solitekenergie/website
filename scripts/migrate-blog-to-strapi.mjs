import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const STRAPI_URL = "https://cms-production-8fb5.up.railway.app";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

if (!STRAPI_TOKEN) {
  console.error("STRAPI_API_TOKEN env var required");
  process.exit(1);
}

/**
 * Convert markdown text to Strapi "blocks" rich text format.
 * Splits by H2 headings and paragraphs.
 */
function markdownToBlocks(md) {
  const lines = md.split("\n");
  const blocks = [];
  let currentParagraph = [];

  function flushParagraph() {
    const text = currentParagraph.join("\n").trim();
    if (text) {
      // Clean up markdown formatting for plain text in blocks
      const cleaned = text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1");
      blocks.push({
        type: "paragraph",
        children: [{ type: "text", text: cleaned }],
      });
    }
    currentParagraph = [];
  }

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)/);
    const h3Match = line.match(/^### (.+)/);

    if (h2Match) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: 2,
        children: [{ type: "text", text: h2Match[1].trim() }],
      });
    } else if (h3Match) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: 3,
        children: [{ type: "text", text: h3Match[1].trim() }],
      });
    } else if (line.match(/^\s*[-*] /)) {
      // List item - accumulate
      flushParagraph();
      const itemText = line.replace(/^\s*[-*] /, "").trim()
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1");
      blocks.push({
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [{ type: "text", text: itemText }],
          },
        ],
      });
    } else if (line.trim() === "") {
      flushParagraph();
    } else {
      currentParagraph.push(line);
    }
  }
  flushParagraph();

  // Merge consecutive list items into single lists
  const merged = [];
  for (const block of blocks) {
    const prev = merged[merged.length - 1];
    if (
      block.type === "list" &&
      prev?.type === "list" &&
      prev.format === block.format
    ) {
      prev.children.push(...block.children);
    } else {
      merged.push(block);
    }
  }

  return merged;
}

function parseTags(raw) {
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .join(", ");
  }
  if (Array.isArray(raw)) return raw.join(", ");
  return "";
}

async function createArticle(articleData) {
  const res = await fetch(`${STRAPI_URL}/api/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data: articleData }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Strapi error ${res.status}: ${err}`);
  }

  return res.json();
}

async function publishArticle(documentId) {
  const res = await fetch(
    `${STRAPI_URL}/api/articles/${documentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: { publishedAt: new Date().toISOString() },
      }),
    }
  );
  if (!res.ok) {
    console.warn(`  Warning: could not publish ${documentId}`);
  }
}

async function main() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} articles to migrate\n`);

  let success = 0;
  let skipped = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
    const { data: fm, content } = matter(raw);

    const titre = fm.title || slug;
    const extrait = fm.excerpt || content.slice(0, 160);
    const datePublication = fm.date
      ? new Date(fm.date).toISOString()
      : new Date().toISOString();
    const categorie = fm.category || "";
    const tags = parseTags(fm.tags);

    // Convert markdown body to Strapi blocks
    const richTextBlocks = markdownToBlocks(content);

    // Wrap in a single Paragraphe content block
    const contenu = [
      {
        __component: "content-blocks.paragraphe",
        texte: richTextBlocks,
      },
    ];

    const articleData = {
      titre,
      slug,
      extrait,
      datePublication,
      categorie,
      tags,
      contenu,
      misEnAvant: false,
    };

    try {
      const result = await createArticle(articleData);
      const docId = result.data?.documentId || result.data?.id;
      console.log(`OK  ${slug} (id: ${docId})`);

      // Try to publish
      if (docId) {
        await publishArticle(docId);
      }

      success++;
    } catch (err) {
      if (err.message.includes("unique")) {
        console.log(`SKIP ${slug} (already exists)`);
        skipped++;
      } else {
        console.error(`FAIL ${slug}: ${err.message}`);
      }
    }
  }

  console.log(
    `\nDone: ${success} created, ${skipped} skipped, ${files.length - success - skipped} failed`
  );
}

main();
