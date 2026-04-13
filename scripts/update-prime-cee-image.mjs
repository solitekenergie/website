import fs from "fs";
import path from "path";

const STRAPI_URL = "https://cms-production-8fb5.up.railway.app";
const TOKEN = process.env.STRAPI_API_TOKEN;
const SLUG = "prime-cee-aides-photovoltaiques-2026";
const IMAGE_PATH = "public/images/solitek-aides-photovoltaiques-pieces-croissance.jpg";

async function main() {
  // Find article by slug
  const findRes = await fetch(
    `${STRAPI_URL}/api/articles?filters[slug][$eq]=${SLUG}&fields[0]=documentId`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  const findData = await findRes.json();
  const docId = findData.data?.[0]?.documentId;
  if (!docId) {
    console.error("Article not found");
    process.exit(1);
  }
  console.log("Found article:", docId);

  // Upload new image
  const form = new FormData();
  const buf = fs.readFileSync(IMAGE_PATH);
  form.append("files", new Blob([buf], { type: "image/jpeg" }), path.basename(IMAGE_PATH));

  const upRes = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: form,
  });
  const upData = await upRes.json();
  const imageId = upData[0]?.id;
  console.log("Uploaded image id:", imageId);

  // Link to article
  const linkRes = await fetch(`${STRAPI_URL}/api/articles/${docId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ data: { imageCouverture: imageId } }),
  });
  console.log("Link status:", linkRes.status);
}

main();
