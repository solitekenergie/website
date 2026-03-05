import { NextRequest } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const RATE_LIMIT = { limit: 10, windowMs: 60_000 }; // 10 req / 60s per IP

export async function GET(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = getClientIp(request);
    const rl = rateLimit(`geotiff:${ip}`, RATE_LIMIT);
    if (!rl.success) {
      console.warn(`Rate limited /api/solar-layers/geotiff for IP ${ip}`);
      return new Response("Trop de requêtes. Veuillez réessayer dans quelques instants.", {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfter) },
      });
    }

    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
      return new Response("Missing url parameter", { status: 400 });
    }

    // Validate that the URL points to Google Solar API only
    if (!url.startsWith("https://solar.googleapis.com/")) {
      return new Response("Invalid URL", { status: 400 });
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
