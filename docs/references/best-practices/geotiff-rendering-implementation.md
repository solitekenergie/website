# GeoTIFF Rendering in Next.js/React -- Implementation Guide

## Required Libraries

```bash
npm install geotiff
# plotty is optional -- the manual canvas approach below is recommended for full control
```

- **geotiff** (npm: `geotiff`): Pure JavaScript GeoTIFF parser. Works in browser and Node.js. Reads raster data, extracts geo-metadata (tiepoints, pixel scale, bounding box).
- **plotty** (npm: `plotty`): Optional. WebGL/Canvas2D color-scale renderer. Supports built-in color scales (viridis, jet, etc.). Quick to use but less customizable than manual approach.

**No map library is strictly required** -- canvas rendering with a Google Maps GroundOverlay or a simple positioned `<canvas>` is sufficient for a roof-level heat map.

---

## Architecture Decision: Canvas vs Map Library

### Option A: Pure Canvas Rendering (RECOMMENDED for this use case)

**Pros:**
- No additional map library dependency
- Full control over rendering pipeline
- Works perfectly for single-building roof-level views
- Lighter bundle size
- Easy month slider integration (re-render canvas per band)

**Cons:**
- Must handle positioning/alignment manually if overlaying on a map

### Option B: Leaflet / MapLibre GL

**Pros:**
- Built-in pan/zoom, tile loading
- Easy overlay management

**Cons:**
- Heavy dependency for a single-roof view
- Adds complexity
- Overkill when you only need to show one building

### Option C: Google Maps GroundOverlay

**Pros:**
- Pixel-perfect geographic alignment
- Already using Google APIs
- Familiar to users

**Cons:**
- Requires Google Maps JavaScript API (additional cost/dependency)
- Canvas must be converted to data URL for GroundOverlay

**Recommendation**: For a solar estimator focused on a single address, use **Option A** (pure canvas) layered on top of the RGB satellite image, also rendered from the Solar API response. If you are already embedding a Google Map, use **Option C**.

---

## Core Implementation

### Type Definitions

```typescript
interface GeoTiff {
  width: number;
  height: number;
  rasters: Array<number[]>;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

interface DataLayersResponse {
  imageryDate: { year: number; month: number; day: number };
  imageryProcessedDate: { year: number; month: number; day: number };
  dsmUrl: string;
  rgbUrl: string;
  maskUrl: string;
  annualFluxUrl: string;
  monthlyFluxUrl: string;
  hourlyShadeUrls: string[];
  imageryQuality: string;
}
```

### Step 1: Fetch dataLayers from Next.js API Route

```typescript
// app/api/solar/datalayers/route.ts
import { NextRequest, NextResponse } from 'next/server';

const SOLAR_API_KEY = process.env.GOOGLE_SOLAR_API_KEY!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '100';

  const url = new URL('https://solar.googleapis.com/v1/dataLayers:get');
  url.searchParams.set('location.latitude', lat!);
  url.searchParams.set('location.longitude', lng!);
  url.searchParams.set('radiusMeters', radius);
  url.searchParams.set('view', 'IMAGERY_AND_ALL_FLUX_LAYERS');
  url.searchParams.set('requiredQuality', 'MEDIUM');
  url.searchParams.set('pixelSizeMeters', '0.5');
  url.searchParams.set('key', SOLAR_API_KEY);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(
      { error: error.error?.message || 'Solar API error' },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
```

### Step 2: Fetch and Decode a GeoTIFF

```typescript
// lib/solar/geotiff-utils.ts
import * as GeoTIFF from 'geotiff';

export async function fetchGeoTiff(
  url: string,
  apiKey: string
): Promise<GeoTiff> {
  // Append API key to the GeoTIFF URL
  const authenticatedUrl = `${url}&key=${apiKey}`;

  const response = await fetch(authenticatedUrl);
  const arrayBuffer = await response.arrayBuffer();
  const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();

  const rasters = await image.readRasters();
  const width = image.getWidth();
  const height = image.getHeight();

  // Extract geographic bounds
  const bbox = image.getBoundingBox();
  // bbox = [xMin, yMin, xMax, yMax] = [west, south, east, north]

  // Convert rasters to regular arrays
  const rasterArrays: number[][] = [];
  for (let i = 0; i < rasters.length; i++) {
    rasterArrays.push(Array.from(rasters[i] as Float32Array | Uint8Array));
  }

  return {
    width,
    height,
    rasters: rasterArrays,
    bounds: {
      north: bbox[3],
      south: bbox[1],
      east: bbox[2],
      west: bbox[0],
    },
  };
}
```

**IMPORTANT NOTE on GeoTIFF coordinates**: The Solar API GeoTIFF files use a projected coordinate system. The bounding box from `getBoundingBox()` may NOT be in WGS84 lat/lng directly. You may need to check the GeoKeys and use a transformation. However, for overlay purposes with the tiepoint/pixelscale approach, you can compute bounds as follows:

```typescript
export function extractBoundsFromGeoTiff(image: GeoTIFF.GeoTIFFImage) {
  const tiepoint = image.getTiePoints()[0];
  const pixelScale = image.getFileDirectory().ModelPixelScale;
  const width = image.getWidth();
  const height = image.getHeight();

  // tiepoint: { i, j, k, x, y, z }
  // pixelScale: [scaleX, scaleY, scaleZ]
  const west = tiepoint.x;
  const north = tiepoint.y;
  const east = west + width * pixelScale[0];
  const south = north - height * pixelScale[1]; // Y goes down

  return { north, south, east, west };
}
```

### Step 3: Render RGB Satellite Image on Canvas

```typescript
export function renderRGB(
  rgb: GeoTiff,
  mask?: GeoTiff
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = mask ? mask.width : rgb.width;
  canvas.height = mask ? mask.height : rgb.height;

  const dw = rgb.width / canvas.width;
  const dh = rgb.height / canvas.height;

  const ctx = canvas.getContext('2d')!;
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const rgbIdx = Math.floor(y * dh) * rgb.width + Math.floor(x * dw);
      const maskIdx = y * canvas.width + x;
      const imgIdx = (y * canvas.width + x) * 4;

      img.data[imgIdx + 0] = rgb.rasters[0][rgbIdx]; // Red
      img.data[imgIdx + 1] = rgb.rasters[1][rgbIdx]; // Green
      img.data[imgIdx + 2] = rgb.rasters[2][rgbIdx]; // Blue
      img.data[imgIdx + 3] = mask
        ? mask.rasters[0][maskIdx] * 255
        : 255; // Alpha
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas;
}
```

### Step 4: Render Flux Heat Map with Color Palette

```typescript
// Color palette: purple (low) -> yellow (high), matching Google Sunroof style
const SUNROOF_PALETTE = [
  '3B0764', // deep purple (heavy shade)
  '5B21B6', // purple
  '7C3AED', // violet
  '6366F1', // indigo
  '3B82F6', // blue
  '06B6D4', // cyan
  '10B981', // emerald
  '84CC16', // lime
  'EAB308', // yellow
  'F59E0B', // amber
  'F97316', // orange
  'FBBF24', // light yellow (full sun)
];

// Alternative iron/thermal palette
const THERMAL_PALETTE = [
  '000000', // black (no flux)
  '1a0533', // deep purple
  '4a0772', // purple
  '8b0aa5', // magenta
  'c5164d', // red-magenta
  'e65100', // dark orange
  'ff8f00', // orange
  'ffc107', // amber
  'ffeb3b', // yellow
  'ffff8d', // pale yellow
  'ffffff', // white (max flux)
];

export function createPalette(
  hexColors: string[]
): { r: number; g: number; b: number }[] {
  const rgb = hexColors.map((hex) => ({
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  }));

  const size = 256;
  const step = (rgb.length - 1) / (size - 1);

  return Array.from({ length: size }, (_, i) => {
    const index = i * step;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const t = index - lower;

    return {
      r: Math.round(rgb[lower].r + t * (rgb[upper].r - rgb[lower].r)),
      g: Math.round(rgb[lower].g + t * (rgb[upper].g - rgb[lower].g)),
      b: Math.round(rgb[lower].b + t * (rgb[upper].b - rgb[lower].b)),
    };
  });
}

function normalize(x: number, max: number, min: number): number {
  const y = (x - min) / (max - min);
  return Math.min(Math.max(y, 0), 1);
}

export function renderFluxHeatMap(
  flux: GeoTiff,
  mask?: GeoTiff,
  options?: {
    bandIndex?: number;  // 0 = annual or Jan, 1 = Feb, etc.
    colors?: string[];
    minFlux?: number;
    maxFlux?: number;
  }
): HTMLCanvasElement {
  const bandIndex = options?.bandIndex ?? 0;
  const colors = options?.colors ?? SUNROOF_PALETTE;
  const palette = createPalette(colors);

  // Compute min/max from actual data (excluding -9999 invalid values)
  const validValues = flux.rasters[bandIndex].filter((v) => v > 0);
  const min = options?.minFlux ?? Math.min(...validValues);
  const max = options?.maxFlux ?? Math.max(...validValues);

  const canvas = document.createElement('canvas');
  canvas.width = mask ? mask.width : flux.width;
  canvas.height = mask ? mask.height : flux.height;

  const dw = flux.width / canvas.width;
  const dh = flux.height / canvas.height;

  const ctx = canvas.getContext('2d')!;
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const fluxIdx = Math.floor(y * dh) * flux.width + Math.floor(x * dw);
      const maskIdx = y * canvas.width + x;
      const imgIdx = (y * canvas.width + x) * 4;

      const value = flux.rasters[bandIndex][fluxIdx];

      if (value <= 0 || value === -9999) {
        // Invalid/no data -- transparent
        img.data[imgIdx + 3] = 0;
        continue;
      }

      const normalized = normalize(value, max, min);
      const colorIdx = Math.round(normalized * (palette.length - 1));
      const color = palette[colorIdx];

      img.data[imgIdx + 0] = color.r;
      img.data[imgIdx + 1] = color.g;
      img.data[imgIdx + 2] = color.b;

      // Apply mask: only show heat map on the roof
      const isMasked = mask
        ? mask.rasters[0][maskIdx] > 0
        : true;

      img.data[imgIdx + 3] = isMasked ? 178 : 0; // ~70% opacity on roof, transparent elsewhere
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas;
}
```

### Step 5: Monthly Sunshine Slider

```typescript
// Monthly flux has 12 bands (index 0 = January, index 11 = December)
// Re-render the heat map when the slider changes

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// React component concept:
function MonthSlider({
  monthlyFlux,
  mask,
  onCanvasUpdate,
}: {
  monthlyFlux: GeoTiff;
  mask?: GeoTiff;
  onCanvasUpdate: (canvas: HTMLCanvasElement) => void;
}) {
  const [month, setMonth] = useState(0);

  useEffect(() => {
    const canvas = renderFluxHeatMap(monthlyFlux, mask, {
      bandIndex: month,
    });
    onCanvasUpdate(canvas);
  }, [month, monthlyFlux, mask]);

  return (
    <div>
      <input
        type="range"
        min={0}
        max={11}
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      />
      <span>{MONTH_NAMES[month]}</span>
    </div>
  );
}
```

### Step 6: Composite -- Satellite + Heat Map Overlay

```typescript
export function compositeRoofHeatMap(
  rgbCanvas: HTMLCanvasElement,
  fluxCanvas: HTMLCanvasElement
): HTMLCanvasElement {
  const composite = document.createElement('canvas');
  composite.width = rgbCanvas.width;
  composite.height = rgbCanvas.height;
  const ctx = composite.getContext('2d')!;

  // Draw satellite image as base
  ctx.drawImage(rgbCanvas, 0, 0, composite.width, composite.height);

  // Overlay heat map with transparency
  ctx.globalAlpha = 0.7;
  ctx.drawImage(fluxCanvas, 0, 0, composite.width, composite.height);
  ctx.globalAlpha = 1.0;

  return composite;
}
```

### Step 7: Google Maps GroundOverlay (if using Google Maps)

```typescript
function addFluxOverlayToMap(
  map: google.maps.Map,
  canvas: HTMLCanvasElement,
  bounds: { north: number; south: number; east: number; west: number }
) {
  const dataUrl = canvas.toDataURL('image/png');

  const overlay = new google.maps.GroundOverlay(
    dataUrl,
    new google.maps.LatLngBounds(
      { lat: bounds.south, lng: bounds.west },
      { lat: bounds.north, lng: bounds.east }
    ),
    { opacity: 0.7 }
  );

  overlay.setMap(map);
  return overlay;
}
```

---

## Performance Considerations

1. **Fetch GeoTIFFs via API route**: Do NOT expose your API key to the client. Proxy GeoTIFF fetches through a Next.js API route.
2. **Cache GeoTIFF data**: Since URLs expire after 1 hour but files can be stored for 30 days, cache fetched ArrayBuffers in-memory or in a temporary store.
3. **Use `pixelSizeMeters: 0.5`**: For heat map visualization, 0.5m resolution is sufficient and reduces data transfer. The monthly flux is already at 0.5m anyway.
4. **Pre-compute min/max flux**: Calculate once across all 12 monthly bands so the color scale is consistent when sliding between months.
5. **Web Workers**: For large canvases, consider running pixel-by-pixel rendering in a Web Worker.
6. **requestAnimationFrame**: When slider is dragged rapidly, debounce or use rAF to avoid rendering every intermediate value.

---

## Sources

- https://developers.google.com/maps/documentation/solar/visualize_data_layers
- https://developers.google.com/maps/documentation/solar/geotiff
- https://github.com/geotiffjs/geotiff.js
- https://www.npmjs.com/package/plotty
- https://github.com/googlemaps-samples/js-solar-potential
- https://blog.afi.io/blog/walking-on-sunshine-fun-with-the-google-solar-api/
