# Google Solar API -- Quick Reference for Solitek

## Summary

The Google Solar API `dataLayers` endpoint returns GeoTIFF files containing solar radiation data for any location. These can be decoded with `geotiff.js` and rendered to HTML canvas elements to create roof-level heat maps showing solar potential by month.

---

## Endpoint at a Glance

```
GET https://solar.googleapis.com/v1/dataLayers:get
  ?location.latitude=48.8566
  &location.longitude=2.3522
  &radiusMeters=100
  &view=IMAGERY_AND_ALL_FLUX_LAYERS
  &requiredQuality=MEDIUM
  &pixelSizeMeters=0.5
  &key=YOUR_API_KEY
```

## What You Get Back

| Layer | File | Bands | Use |
|-------|------|-------|-----|
| Satellite photo | rgbUrl | 3 (R,G,B) | Base layer for the roof view |
| Building mask | maskUrl | 1 (binary) | Clip heat map to roof only |
| Annual flux | annualFluxUrl | 1 | Overall sunshine in kWh/kW/year |
| Monthly flux | monthlyFluxUrl | 12 | Per-month sunshine (Jan=band0, Dec=band11) |
| DSM | dsmUrl | 1 | 3D elevation model (optional for visualization) |
| Hourly shade | hourlyShadeUrls | 24 each, x12 | Detailed shade analysis (optional) |

## Key Constraints

- GeoTIFF URLs expire after **1 hour**
- Downloaded files may be stored up to **30 days**
- Rate limit: **600 requests/minute**
- Monthly flux resolution: **0.5 m/pixel**
- Over 175m radius: no monthly flux or hourly shade data
- EEA content restrictions apply since July 2025

---

## NPM Dependencies Needed

```json
{
  "geotiff": "^2.1.3"
}
```

Optional:
```json
{
  "plotty": "^0.4.1"
}
```

---

## Rendering Pipeline

```
1. User enters address
       |
2. Geocode to lat/lng (Google Geocoding API or Places)
       |
3. Call /api/solar/datalayers?lat=X&lng=Y (Next.js API route)
       |
4. Receive JSON with GeoTIFF URLs
       |
5. Fetch rgbUrl, maskUrl, monthlyFluxUrl (proxy through API route)
       |
6. Decode each with geotiff.js: fromArrayBuffer() -> getImage() -> readRasters()
       |
7. Render RGB satellite image to canvas
       |
8. Render monthly flux (band N) to canvas with color palette, masked to roof
       |
9. Composite: draw satellite canvas, then flux canvas on top at 70% opacity
       |
10. Month slider: onChange -> re-render step 8 with new band index -> re-composite
```

---

## Color Palette (Google Sunroof style)

Purple (shaded) -> Blue -> Cyan -> Green -> Yellow (full sun)

```
#3B0764 -> #5B21B6 -> #7C3AED -> #6366F1 -> #3B82F6 -> #06B6D4 -> #10B981 -> #84CC16 -> #EAB308 -> #F59E0B -> #F97316 -> #FBBF24
```

---

## Files in This Documentation

| File | Content |
|------|---------|
| `docs/references/official/google-solar-api-datalayers.md` | Complete API reference (endpoint, params, response, GeoTIFF specs) |
| `docs/references/best-practices/geotiff-rendering-implementation.md` | Full implementation guide with TypeScript code (canvas rendering, month slider, overlay) |
| `docs/references/quick-reference.md` | This file -- summary and cheat sheet |

---

## Key Sources

- Official dataLayers docs: https://developers.google.com/maps/documentation/solar/data-layers
- API reference: https://developers.google.com/maps/documentation/solar/reference/rest/v1/dataLayers/get
- GeoTIFF format: https://developers.google.com/maps/documentation/solar/geotiff
- Visualization guide: https://developers.google.com/maps/documentation/solar/visualize_data_layers
- Solar concepts: https://developers.google.com/maps/documentation/solar/concepts
- Pricing: https://developers.google.com/maps/documentation/solar/usage-and-billing
- geotiff.js: https://github.com/geotiffjs/geotiff.js
- Google sample app: https://github.com/googlemaps-samples/js-solar-potential
