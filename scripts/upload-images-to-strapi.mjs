import fs from "fs";
import path from "path";
import matter from "gray-matter";

const STRAPI_URL = "https://cms-production-8fb5.up.railway.app";
const TOKEN = process.env.STRAPI_API_TOKEN;
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

if (!TOKEN) {
  console.error("STRAPI_API_TOKEN required");
  process.exit(1);
}

async function getArticles() {
  const r = await fetch(
    `${STRAPI_URL}/api/articles?fields[0]=slug&fields[1]=documentId&pagination[pageSize]=100`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  const d = await r.json();
  return d.data || [];
}

async function uploadImage(filePath) {
  const form = new FormData();
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: "image/jpeg" });
  form.append("files", blob, path.basename(filePath));

  const r = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: form,
  });

  if (!r.ok) {
    const err = await r.text();
    throw new Error(`Upload failed ${r.status}: ${err}`);
  }

  const data = await r.json();
  return data[0]?.id;
}

async function linkImageToArticle(documentId, imageId) {
  const r = await fetch(`${STRAPI_URL}/api/articles/${documentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      data: { imageCouverture: imageId },
    }),
  });

  if (!r.ok) {
    const err = await r.text();
    throw new Error(`Link failed ${r.status}: ${err}`);
  }
}

async function main() {
  const articles = await getArticles();
  const slugToDocId = {};
  for (const a of articles) {
    slugToDocId[a.slug] = a.documentId;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  let success = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const docId = slugToDocId[slug];
    if (!docId) {
      console.log(`SKIP ${slug} (not in Strapi)`);
      continue;
    }

    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data: fm } = matter(raw);

    if (!fm.image) {
      console.log(`SKIP ${slug} (no image in markdown)`);
      continue;
    }

    const imagePath = path.join(process.cwd(), "public", fm.image);
    if (!fs.existsSync(imagePath)) {
      console.log(`SKIP ${slug} (image file not found: ${fm.image})`);
      continue;
    }

    try {
      const imageId = await uploadImage(imagePath);
      await linkImageToArticle(docId, imageId);
      console.log(`OK   ${slug} -> ${path.basename(imagePath)} (id: ${imageId})`);
      success++;
    } catch (err) {
      console.error(`FAIL ${slug}: ${err.message}`);
    }
  }

  console.log(`\nDone: ${success}/${files.length} images uploaded`);
}

main();
