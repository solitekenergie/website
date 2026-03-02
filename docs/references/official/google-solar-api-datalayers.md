# Google Solar API - dataLayers Endpoint Reference

## Endpoint

```
GET https://solar.googleapis.com/v1/dataLayers:get
```

## Authentication

Two options:
1. **API Key**: Append `?key=YOUR_API_KEY` to the request URL
2. **OAuth**: Include `Authorization: Bearer TOKEN` header with scope `https://www.googleapis.com/auth/cloud-platform`

**Important**: The GeoTIFF URLs returned in the response also require authentication. Append `&key=YOUR_API_KEY` when fetching each GeoTIFF URL.

---

## Request Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `location.latitude` | number | Yes | - | Latitude of center point |
| `location.longitude` | number | Yes | - | Longitude of center point |
| `radiusMeters` | number | Yes | - | Radius of region. Max 100m always allowed. `radiusMeters <= pixelSizeMeters * 1000`. Over 175m: no monthly flux or hourly shade. |
| `view` | DataLayerView | No | FULL_LAYERS | Subset of data to return |
| `requiredQuality` | ImageryQuality | No | HIGH | Minimum quality level |
| `pixelSizeMeters` | number | No | 0.1 | Resolution. Supported: 0.1, 0.25, 0.5, 1.0 |
| `exactQualityRequired` | boolean | No | false | If true, quality must match exactly |

### DataLayerView Enum

| Value | Includes |
|-------|----------|
| `DSM_LAYER` | DSM only |
| `IMAGERY_LAYERS` | DSM, RGB, mask |
| `IMAGERY_AND_ANNUAL_FLUX_LAYERS` | DSM, RGB, mask, annual flux |
| `IMAGERY_AND_ALL_FLUX_LAYERS` | DSM, RGB, mask, annual + monthly flux |
| `FULL_LAYERS` | All: DSM, RGB, mask, annual flux, monthly flux, hourly shade |

### ImageryQuality Enum

- `HIGH` - High quality imagery
- `MEDIUM` - Medium quality imagery
- `LOW` - Low quality imagery

---

## Example Request

```
GET https://solar.googleapis.com/v1/dataLayers:get?location.latitude=37.4235&location.longitude=-122.085&radiusMeters=100&view=FULL_LAYERS&requiredQuality=HIGH&pixelSizeMeters=0.1&key=YOUR_API_KEY
```

---

## Response Format

```json
{
  "imageryDate": {
    "year": 2022,
    "month": 8,
    "day": 14
  },
  "imageryProcessedDate": {
    "year": 2023,
    "month": 8,
    "day": 4
  },
  "dsmUrl": "https://solar.googleapis.com/v1/geoTiff:get?id=XXXXXXXX",
  "rgbUrl": "https://solar.googleapis.com/v1/geoTiff:get?id=XXXXXXXX",
  "maskUrl": "https://solar.googleapis.com/v1/geoTiff:get?id=XXXXXXXX",
  "annualFluxUrl": "https://solar.googleapis.com/v1/geoTiff:get?id=XXXXXXXX",
  "monthlyFluxUrl": "https://solar.googleapis.com/v1/geoTiff:get?id=XXXXXXXX",
  "hourlyShadeUrls": [
    "https://solar.googleapis.com/v1/geoTiff:get?id=XXXXXXXX",
    "https://solar.googleapis.com/v1/geoTiff:get?id=XXXXXXXX",
    "... (12 total, one per month)"
  ],
  "imageryQuality": "HIGH"
}
```

### Response Fields

| Field | Description |
|-------|-------------|
| `imageryDate` | Date the source imagery was captured |
| `imageryProcessedDate` | Date the imagery was processed |
| `dsmUrl` | URL for Digital Surface Model GeoTIFF |
| `rgbUrl` | URL for RGB aerial/satellite imagery GeoTIFF |
| `maskUrl` | URL for building mask GeoTIFF |
| `annualFluxUrl` | URL for annual solar flux GeoTIFF |
| `monthlyFluxUrl` | URL for monthly solar flux GeoTIFF (12 bands) |
| `hourlyShadeUrls` | Array of 12 URLs (one per month) for hourly shade GeoTIFFs |
| `imageryQuality` | Quality level of the imagery |

---

## GeoTIFF Layer Specifications

| Layer | Bit Depth | Resolution | Bands | Values |
|-------|-----------|------------|-------|--------|
| **DSM** | 32-bit float | 0.1 m/px | 1 | Elevation in meters above sea level. -9999 = invalid |
| **RGB** | 8-bit | 0.1 or 0.25 m/px | 3 | Red, Green, Blue (standard aerial imagery) |
| **Mask** | 1-bit | 0.1 m/px | 1 | 1 = rooftop pixel, 0 = non-rooftop |
| **Annual Flux** | 32-bit float | 0.1 m/px | 1 | kWh/kW/year. -9999 = invalid |
| **Monthly Flux** | 32-bit float | 0.5 m/px | 12 | Bands 0-11 = Jan-Dec. kWh/kW/year per month |
| **Hourly Shade** | 32-bit int | 1 m/px | 24 | Each band = 1 hour. Each bit in the int = 1 day |

### Monthly Flux Band Mapping

- Band 0 = January
- Band 1 = February
- Band 2 = March
- Band 3 = April
- Band 4 = May
- Band 5 = June
- Band 6 = July
- Band 7 = August
- Band 8 = September
- Band 9 = October
- Band 10 = November
- Band 11 = December

### Hourly Shade Decoding Formula

```
(hourlyShade[month - 1])(x, y)[hour] & (1 << (day - 1))
```

- Result > 0: location can see the sun at that hour on that day
- Result = 0: location is shaded
- Uses local regional time zone
- No leap days, no daylight savings adjustments
- Noon is always 12:00

---

## Critical Limitations

1. **URL expiration**: Response URLs are valid for only 1 hour after generation
2. **GeoTIFF storage**: Downloaded files can be stored for up to 30 days
3. **Visualization**: GeoTIFF files (except RGB) display as blank in standard image viewers -- they must be processed programmatically
4. **Radius constraints**: Over 175m radius excludes monthly flux and hourly shade
5. **EEA restriction**: European Economic Area developers face content restrictions (effective July 8, 2025)
6. **Coverage**: Not all locations have data. Returns NOT_FOUND for uncovered areas

---

## Flux Units

- **kWh/kW/year**: Energy a 1 kW panel array would generate per year at that location
- Factors IN: solar irradiance, weather/cloud patterns, shading from trees/buildings, roof orientation (pitch + azimuth)
- Factors OUT: inverter losses, soiling, snow accumulation, panel efficiency (user must multiply)

---

## Rate Limits and Pricing

- **Rate limit**: 600 queries per minute
- **SKUs**: "Solar API Building Insights" (Essentials) and "Solar API Data Layers" (Enterprise)
- **Free tier**: $200/month credit (replaced by free usage threshold after Feb 2025)
- **NOT_FOUND errors**: Free but count toward usage limits
- **Quota management**: Configurable via Google Cloud Console

---

## Sources

- https://developers.google.com/maps/documentation/solar/data-layers
- https://developers.google.com/maps/documentation/solar/reference/rest/v1/dataLayers/get
- https://developers.google.com/maps/documentation/solar/geotiff
- https://developers.google.com/maps/documentation/solar/concepts
- https://developers.google.com/maps/documentation/solar/usage-and-billing
