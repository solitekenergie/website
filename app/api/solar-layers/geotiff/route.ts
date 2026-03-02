import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
      return new Response("Missing url parameter", { status: 400 });
    }

    const apiKey = process.env.GOOGLE_SOLAR_API_KEY;
    if (!apiKey) {
      return new Response("Solar API is not configured", { status: 500 });
    }

    // Append API key to the Google Solar GeoTIFF URL
    const separator = url.includes("?") ? "&" : "?";
    const authenticatedUrl = `${url}${separator}key=${apiKey}`;

    const response = await fetch(authenticatedUrl);

    if (!response.ok) {
      return new Response(`GeoTIFF fetch failed: ${response.status}`, {
        status: response.status,
      });
    }

    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type": "image/tiff",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error proxying GeoTIFF:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
