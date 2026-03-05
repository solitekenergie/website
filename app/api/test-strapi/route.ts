export const dynamic = "force-dynamic";

export async function GET() {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://cms-production-8fb5.up.railway.app";
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

  const endpoint = `${STRAPI_URL}/api/realisations-all?populate=*&pagination[pageSize]=5`;

  const result: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL ?? "NOT SET (using fallback)",
      STRAPI_API_TOKEN: STRAPI_API_TOKEN ? `SET (${STRAPI_API_TOKEN.length} chars)` : "NOT SET",
    },
    fetchUrl: endpoint,
  };

  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const res = await fetch(endpoint, {
      headers,
      cache: "no-store",
    });

    result.status = res.status;
    result.statusText = res.statusText;
    result.responseHeaders = Object.fromEntries(res.headers.entries());

    if (!res.ok) {
      result.errorBody = await res.text();
    } else {
      const json = await res.json();
      result.itemCount = json.data?.length ?? 0;
      result.meta = json.meta;
      result.firstItem = json.data?.[0]
        ? { id: json.data[0].id, titre: json.data[0].titre, slug: json.data[0].slug }
        : null;
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    result.stack = error instanceof Error ? error.stack : undefined;
  }

  return Response.json(result, { status: 200 });
}
