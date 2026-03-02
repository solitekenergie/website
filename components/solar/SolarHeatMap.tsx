"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { GeoTiffData, DataLayersResponse } from "@/lib/solar/geotiff-utils";

interface SolarHeatMapProps {
  coordinates: { lat: number; lng: number };
}

const MONTH_LABELS = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
  "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
];

export default function SolarHeatMap({ coordinates }: SolarHeatMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [month, setMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Store decoded GeoTIFF data (fetched once, re-rendered on month change)
  const rgbDataRef = useRef<GeoTiffData | null>(null);
  const maskDataRef = useRef<GeoTiffData | null>(null);
  const monthlyFluxDataRef = useRef<GeoTiffData | null>(null);
  const fluxRangeRef = useRef<{ minFlux: number; maxFlux: number } | null>(null);

  // Lazy-load geotiff-utils (client-side only, avoids SSR issues)
  const getUtils = useCallback(async () => {
    return await import("@/lib/solar/geotiff-utils");
  }, []);

  // Fetch all GeoTIFF data on mount
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch dataLayers metadata
        const layersResponse = await fetch(
          `/api/solar-layers?lat=${coordinates.lat}&lng=${coordinates.lng}&radius=100`,
        );

        if (!layersResponse.ok) {
          throw new Error("Data layers unavailable for this location");
        }

        const layers: DataLayersResponse = await layersResponse.json();
        if (cancelled) return;

        const utils = await getUtils();

        // 2. Fetch all 3 GeoTIFFs in parallel
        const [rgb, mask, monthlyFlux] = await Promise.all([
          layers.rgbUrl ? utils.fetchGeoTiff(layers.rgbUrl) : null,
          layers.maskUrl ? utils.fetchGeoTiff(layers.maskUrl) : null,
          layers.monthlyFluxUrl ? utils.fetchGeoTiff(layers.monthlyFluxUrl) : null,
        ]);

        if (cancelled) return;

        if (!rgb || !monthlyFlux) {
          throw new Error("Missing GeoTIFF data");
        }

        rgbDataRef.current = rgb;
        maskDataRef.current = mask;
        monthlyFluxDataRef.current = monthlyFlux;

        // 3. Pre-compute global flux range across all 12 bands
        fluxRangeRef.current = utils.computeGlobalFluxRange(
          monthlyFlux,
          mask ?? undefined,
        );

        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          console.error("Error loading solar heat map:", err);
          setError(err instanceof Error ? err.message : "Failed to load heat map");
          setLoading(false);
        }
      }
    }

    loadData();
    return () => { cancelled = true; };
  }, [coordinates.lat, coordinates.lng, getUtils]);

  // Re-render canvas whenever month changes or data first loads
  useEffect(() => {
    const rgb = rgbDataRef.current;
    const flux = monthlyFluxDataRef.current;
    const canvas = canvasRef.current;
    const range = fluxRangeRef.current;

    if (!rgb || !flux || !canvas || !range || loading) return;

    let frameId: number;

    async function render() {
      const utils = await import("@/lib/solar/geotiff-utils");
      const mask = maskDataRef.current ?? undefined;

      const rgbCanvas = utils.renderRGB(rgb!, mask);
      const fluxCanvas = utils.renderFluxHeatMap(flux!, mask, {
        bandIndex: month,
        minFlux: range!.minFlux,
        maxFlux: range!.maxFlux,
      });
      const composite = utils.compositeHeatMap(rgbCanvas, fluxCanvas);

      // Draw composite onto visible canvas, scaled to fit
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;

      canvas!.width = composite.width;
      canvas!.height = composite.height;
      ctx.drawImage(composite, 0, 0);
    }

    frameId = requestAnimationFrame(() => {
      render();
    });

    return () => cancelAnimationFrame(frameId);
  }, [month, loading]);

  if (loading) {
    return (
      <div className="flex h-[650px] items-center justify-center rounded-2xl bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#5CB88F]" />
          <p className="mt-3 text-sm text-slate-500">
            Chargement de la carte solaire...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[650px] items-center justify-center rounded-2xl bg-slate-100">
        <div className="text-center px-6">
          <svg
            className="mx-auto h-12 w-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
          <p className="mt-3 text-sm text-slate-500">
            Carte thermique non disponible pour cette adresse
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="h-[650px] w-full rounded-2xl object-cover"
      />

      {/* Month slider overlay */}
      <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="min-w-[3rem] text-sm font-medium text-slate-700">
            {MONTH_LABELS[month]}
          </span>
          <input
            type="range"
            min={0}
            max={11}
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#5CB88F]"
          />
        </div>
      </div>
    </div>
  );
}
