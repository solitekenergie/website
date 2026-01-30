import { NextRequest, NextResponse } from "next/server";

interface SolarApiRequest {
  latitude: number;
  longitude: number;
}

interface GoogleSolarResponse {
  solarPotential: {
    maxArrayPanelsCount: number;
    maxArrayAreaMeters2: number;
    maxSunshineHoursPerYear: number;
    carbonOffsetFactorKgPerMwh: number;
    panelCapacityWatts: number;
    panelHeightMeters: number;
    panelWidthMeters: number;
    panelLifetimeYears: number;
    solarPanelConfigs: Array<{
      panelsCount: number;
      yearlyEnergyDcKwh: number;
      roofSegmentSummaries: Array<{
        pitchDegrees: number;
        azimuthDegrees: number;
        panelsCount: number;
        yearlyEnergyDcKwh: number;
      }>;
    }>;
    financialAnalyses: Array<{
      monthlyBill: {
        units: number;
      };
      panelConfigIndex: number;
    }>;
    buildingInsights?: {
      name: string;
      center: {
        latitude: number;
        longitude: number;
      };
      boundingBox: {
        sw: { latitude: number; longitude: number };
        ne: { latitude: number; longitude: number };
      };
      imageryDate: {
        year: number;
        month: number;
        day: number;
      };
      imageryProcessedDate: {
        year: number;
        month: number;
        day: number;
      };
      postalCode: string;
      administrativeArea: string;
      statisticalArea: string;
      regionCode: string;
      solarPotential: any;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude }: SolarApiRequest = await request.json();

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_SOLAR_API_KEY;

    if (!apiKey) {
      console.error("GOOGLE_SOLAR_API_KEY is not configured");
      return NextResponse.json(
        { error: "Solar API is not configured" },
        { status: 500 }
      );
    }

    // Call Google Solar API - Building Insights endpoint
    const buildingInsightsUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${apiKey}`;

    const response = await fetch(buildingInsightsUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Solar API error:", errorText);

      if (response.status === 404) {
        return NextResponse.json(
          { error: "No solar data available for this location" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch solar data" },
        { status: response.status }
      );
    }

    const data: GoogleSolarResponse = await response.json();

    // Extract useful information
    const solarPotential = data.solarPotential;

    if (!solarPotential) {
      return NextResponse.json(
        { error: "No solar potential data available" },
        { status: 404 }
      );
    }

    // Get the optimal configuration (usually the one with best ROI)
    const optimalConfig = solarPotential.solarPanelConfigs?.[Math.floor(solarPotential.solarPanelConfigs.length / 2)] || solarPotential.solarPanelConfigs?.[0];

    const result = {
      maxPanelsCount: solarPotential.maxArrayPanelsCount,
      maxAreaMeters2: solarPotential.maxArrayAreaMeters2,
      maxSunshineHoursPerYear: solarPotential.maxSunshineHoursPerYear,
      panelCapacityWatts: solarPotential.panelCapacityWatts,
      panelLifetimeYears: solarPotential.panelLifetimeYears,
      optimalPanelsCount: optimalConfig?.panelsCount || 0,
      optimalYearlyEnergyKwh: optimalConfig?.yearlyEnergyDcKwh || 0,
      roofSegments: optimalConfig?.roofSegmentSummaries || [],
      imageryDate: data.solarPotential.buildingInsights?.imageryDate,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in solar API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
