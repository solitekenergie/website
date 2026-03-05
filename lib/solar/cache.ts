/**
 * In-memory cache for Google Solar API responses.
 * Keys are rounded coordinates (3 decimal places ≈ 110m precision).
 * Avoids redundant calls to the paid Google Solar API.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const TTL_MS = 60 * 60 * 1000; // 1 hour

const buildingInsightsCache = new Map<string, CacheEntry<unknown>>();
const dataLayersCache = new Map<string, CacheEntry<unknown>>();

function makeKey(lat: number, lng: number): string {
  return `${lat.toFixed(3)}_${lng.toFixed(3)}`;
}

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const cache of [buildingInsightsCache, dataLayersCache]) {
    for (const [key, entry] of cache) {
      if (now >= entry.expiresAt) {
        cache.delete(key);
      }
    }
  }
}, 5 * 60_000);

export function getBuildingInsightsCache<T>(lat: number, lng: number): T | null {
  const entry = buildingInsightsCache.get(makeKey(lat, lng));
  if (!entry || Date.now() >= entry.expiresAt) return null;
  return entry.data as T;
}

export function setBuildingInsightsCache<T>(lat: number, lng: number, data: T): void {
  buildingInsightsCache.set(makeKey(lat, lng), {
    data,
    expiresAt: Date.now() + TTL_MS,
  });
}

export function getDataLayersCache<T>(lat: number, lng: number): T | null {
  const entry = dataLayersCache.get(makeKey(lat, lng));
  if (!entry || Date.now() >= entry.expiresAt) return null;
  return entry.data as T;
}

export function setDataLayersCache<T>(lat: number, lng: number, data: T): void {
  dataLayersCache.set(makeKey(lat, lng), {
    data,
    expiresAt: Date.now() + TTL_MS,
  });
}
