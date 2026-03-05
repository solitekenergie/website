export const dynamic = "force-dynamic";

export async function GET() {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://cms-production-8fb5.up.railway.app";
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  const endpoint = `${STRAPI_URL}/api/realisations-all?populate=*&pagination[pageSize]=5`;

  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL ?? "NOT SET (using fallback)",
      STRAPI_API_TOKEN: STRAPI_API_TOKEN ? `SET (${STRAPI_API_TOKEN.length} chars)` : "NOT SET",
    },
    fetchUrl: endpoint,
  };

  // Test 1: WITHOUT token (public access)
  try {
    const res = await fetch(endpoint, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      results.withoutToken = { status: res.status, error: await res.text() };
    } else {
      const json = await res.json();
      results.withoutToken = {
        status: res.status,
        itemCount: json.data?.length ?? 0,
        firstItem: json.data?.[0]
          ? { id: json.data[0].id, titre: json.data[0].titre, slug: json.data[0].slug }
          : null,
      };
    }
  } catch (error) {
    results.withoutToken = { error: error instanceof Error ? error.message : String(error) };
  }

  // Test 2: WITH token
  try {
    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      results.withToken = { status: res.status, error: await res.text() };
    } else {
      const json = await res.json();
      results.withToken = {
        status: res.status,
        itemCount: json.data?.length ?? 0,
        firstItem: json.data?.[0]
          ? { id: json.data[0].id, titre: json.data[0].titre, slug: json.data[0].slug }
          : null,
      };
    }
  } catch (error) {
    results.withToken = { error: error instanceof Error ? error.message : String(error) };
  }

  return Response.json(results, { status: 200 });
}
