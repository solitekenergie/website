import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius") || "100";

    if (!lat || !lng) {
      return NextResponse.json(
        { error: "lat and lng are required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GOOGLE_SOLAR_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Solar API is not configured" },
        { status: 500 },
      );
    }

    const dataLayersUrl =
      `https://solar.googleapis.com/v1/dataLayers:get` +
      `?location.latitude=${lat}` +
      `&location.longitude=${lng}` +
      `&radiusMeters=${radius}` +
      `&view=IMAGERY_AND_ALL_FLUX_LAYERS` +
      `&requiredQuality=HIGH` +
      `&pixelSizeMeters=0.5` +
      `&key=${apiKey}`;

    const response = await fetch(dataLayersUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Solar dataLayers error:", errorText);

      if (response.status === 404) {
        return NextResponse.json(
          { error: "No data layers available for this location" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch data layers" },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Rewrite GeoTIFF URLs to point through our proxy (protects API key)
    const rewriteUrl = (originalUrl: string) => {
      if (!originalUrl) return null;
      return `/api/solar-layers/geotiff?url=${encodeURIComponent(originalUrl)}`;
    };

    const result = {
      rgbUrl: rewriteUrl(data.rgbUrl),
      maskUrl: rewriteUrl(data.maskUrl),
      annualFluxUrl: rewriteUrl(data.annualFluxUrl),
      monthlyFluxUrl: rewriteUrl(data.monthlyFluxUrl),
      imageryDate: data.imageryDate,
      imageryQuality: data.imageryQuality,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in solar-layers API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
