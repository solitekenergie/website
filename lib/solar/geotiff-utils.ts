import { fromArrayBuffer } from "geotiff";

export type RasterBand = { readonly length: number; [index: number]: number };

export interface GeoTiffData {
  width: number;
  height: number;
  rasters: RasterBand[];
  bounds: { north: number; south: number; east: number; west: number };
  bandCount: number;
}

export interface DataLayersResponse {
  rgbUrl: string;
  maskUrl: string;
  annualFluxUrl: string;
  monthlyFluxUrl: string;
  imageryDate: { year: number; month: number; day: number };
  imageryQuality: string;
}

// Heat palette matching Google Sunroof style (cold → hot)
const HEAT_PALETTE_COLORS = [
  [57, 73, 171],   // #3949AB - deep blue (low flux)
  [0, 137, 123],   // #00897B - teal
  [67, 160, 71],   // #43A047 - green
  [253, 216, 53],  // #FDD835 - yellow
  [255, 143, 0],   // #FF8F00 - orange
  [229, 57, 53],   // #E53935 - red (high flux)
] as const;

// Pre-compute 256-entry palette
let cachedPalette: { r: number; g: number; b: number }[] | null = null;

function getHeatPalette(): { r: number; g: number; b: number }[] {
  if (cachedPalette) return cachedPalette;

  const palette: { r: number; g: number; b: number }[] = [];
  const colors = HEAT_PALETTE_COLORS;
  const segments = colors.length - 1;

  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    const segIndex = Math.min(Math.floor(t * segments), segments - 1);
    const segT = (t * segments) - segIndex;

    const c0 = colors[segIndex];
    const c1 = colors[segIndex + 1];

    palette.push({
      r: Math.round(c0[0] + (c1[0] - c0[0]) * segT),
      g: Math.round(c0[1] + (c1[1] - c0[1]) * segT),
      b: Math.round(c0[2] + (c1[2] - c0[2]) * segT),
    });
  }

  cachedPalette = palette;
  return palette;
}

/**
 * Fetch and decode a GeoTIFF from a URL (should be a proxied URL).
 */
export async function fetchGeoTiff(url: string): Promise<GeoTiffData> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch GeoTIFF: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const tiff = await fromArrayBuffer(buffer);
  const image = await tiff.getImage();

  const width = image.getWidth();
  const height = image.getHeight();
  const bandCount = image.getSamplesPerPixel();

  const rasters = await image.readRasters();

  // Extract geographic bounds from tiepoints and pixel scale
  const tiepoints = image.getTiePoints() as unknown as { x: number; y: number }[] | undefined;
  const tiepoint = tiepoints?.[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileDir = image.getFileDirectory() as any;
  const pixelScale = fileDir.ModelPixelScale as number[] | undefined;

  let bounds = { north: 0, south: 0, east: 0, west: 0 };

  if (tiepoint && pixelScale) {
    const west = tiepoint.x;
    const north = tiepoint.y;
    const east = west + width * pixelScale[0];
    const south = north - height * pixelScale[1];
    bounds = { north, south, east, west };
  }

  // Convert rasters to indexed arrays per band
  const bandArrays: RasterBand[] = [];
  for (let b = 0; b < bandCount; b++) {
    bandArrays.push(rasters[b] as RasterBand);
  }

  return { width, height, rasters: bandArrays, bounds, bandCount };
}

/**
 * Render RGB satellite imagery to a canvas, optionally masked to roof area.
 */
export function renderRGB(
  rgb: GeoTiffData,
  mask?: GeoTiffData,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = rgb.width;
  canvas.height = rgb.height;

  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(rgb.width, rgb.height);
  const pixels = imageData.data;

  const r = rgb.rasters[0];
  const g = rgb.rasters[1];
  const b = rgb.rasters[2];

  // If mask exists and has different dimensions, we need to scale
  const maskData = mask?.rasters[0];
  const maskScaleX = mask ? mask.width / rgb.width : 1;
  const maskScaleY = mask ? mask.height / rgb.height : 1;

  for (let i = 0; i < rgb.width * rgb.height; i++) {
    const idx = i * 4;
    pixels[idx] = r[i];
    pixels[idx + 1] = g[i];
    pixels[idx + 2] = b[i];

    if (maskData) {
      const x = i % rgb.width;
      const y = Math.floor(i / rgb.width);
      const mx = Math.floor(x * maskScaleX);
      const my = Math.floor(y * maskScaleY);
      const maskIdx = my * mask!.width + mx;
      pixels[idx + 3] = maskData[maskIdx] ? 255 : 180;
    } else {
      pixels[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Render flux data as a heat map on a canvas.
 *
 * @param flux - GeoTIFF data with flux bands
 * @param mask - Optional roof mask
 * @param options.bandIndex - Which band to render (0-11 for monthly, 0 for annual)
 * @param options.minFlux - Minimum flux value for color scaling
 * @param options.maxFlux - Maximum flux value for color scaling
 */
export function renderFluxHeatMap(
  flux: GeoTiffData,
  mask?: GeoTiffData,
  options: { bandIndex?: number; minFlux?: number; maxFlux?: number } = {},
): HTMLCanvasElement {
  const { bandIndex = 0, minFlux, maxFlux } = options;

  const canvas = document.createElement("canvas");
  canvas.width = flux.width;
  canvas.height = flux.height;

  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(flux.width, flux.height);
  const pixels = imageData.data;

  const band = flux.rasters[bandIndex] as RasterBand;
  const palette = getHeatPalette();

  // Compute min/max if not provided
  let fMin = minFlux ?? Infinity;
  let fMax = maxFlux ?? -Infinity;

  if (minFlux === undefined || maxFlux === undefined) {
    for (let i = 0; i < band.length; i++) {
      const v = band[i];
      if (v > 0) {
        if (v < fMin) fMin = v;
        if (v > fMax) fMax = v;
      }
    }
  }

  const range = fMax - fMin || 1;

  // Mask scaling
  const maskData = mask?.rasters[0];
  const maskScaleX = mask ? mask.width / flux.width : 1;
  const maskScaleY = mask ? mask.height / flux.height : 1;

  for (let i = 0; i < flux.width * flux.height; i++) {
    const idx = i * 4;
    const value = band[i];

    // Check mask
    let onRoof = true;
    if (maskData) {
      const x = i % flux.width;
      const y = Math.floor(i / flux.width);
      const mx = Math.floor(x * maskScaleX);
      const my = Math.floor(y * maskScaleY);
      const maskIdx = my * mask!.width + mx;
      onRoof = maskData[maskIdx] > 0;
    }

    if (value > 0 && onRoof) {
      const normalized = Math.max(0, Math.min(255, Math.round(((value - fMin) / range) * 255)));
      const color = palette[normalized];
      pixels[idx] = color.r;
      pixels[idx + 1] = color.g;
      pixels[idx + 2] = color.b;
      pixels[idx + 3] = 200; // Semi-transparent for overlay
    } else {
      pixels[idx + 3] = 0; // Transparent
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Composite the RGB satellite image with the flux heat map overlay.
 */
export function compositeHeatMap(
  rgbCanvas: HTMLCanvasElement,
  fluxCanvas: HTMLCanvasElement,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = rgbCanvas.width;
  canvas.height = rgbCanvas.height;

  const ctx = canvas.getContext("2d")!;

  // Draw RGB base
  ctx.drawImage(rgbCanvas, 0, 0);

  // Draw flux overlay (scaled to match RGB dimensions)
  ctx.globalAlpha = 0.7;
  ctx.drawImage(fluxCanvas, 0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1.0;

  return canvas;
}

/**
 * Compute global min/max flux across all 12 monthly bands for consistent coloring.
 */
export function computeGlobalFluxRange(
  flux: GeoTiffData,
  mask?: GeoTiffData,
): { minFlux: number; maxFlux: number } {
  let globalMin = Infinity;
  let globalMax = -Infinity;

  const maskData = mask?.rasters[0];
  const maskScaleX = mask ? mask.width / flux.width : 1;
  const maskScaleY = mask ? mask.height / flux.height : 1;

  for (let b = 0; b < flux.bandCount; b++) {
    const band = flux.rasters[b] as RasterBand;
    for (let i = 0; i < band.length; i++) {
      const value = band[i];
      if (value <= 0) continue;

      if (maskData) {
        const x = i % flux.width;
        const y = Math.floor(i / flux.width);
        const mx = Math.floor(x * maskScaleX);
        const my = Math.floor(y * maskScaleY);
        if (maskData[my * mask!.width + mx] === 0) continue;
      }

      if (value < globalMin) globalMin = value;
      if (value > globalMax) globalMax = value;
    }
  }

  return {
    minFlux: globalMin === Infinity ? 0 : globalMin,
    maxFlux: globalMax === -Infinity ? 1 : globalMax,
  };
}
