/**
 * In-memory rate limiter for API routes.
 * Uses a sliding window counter per key (typically IP address).
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitConfig {
  /** Max number of requests allowed in the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  /** Seconds until the window resets */
  retryAfter: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now >= entry.resetTime) {
      store.delete(key);
    }
  }
}, 60_000);

export function rateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  // No existing entry or window expired → start fresh
  if (!entry || now >= entry.resetTime) {
    store.set(key, { count: 1, resetTime: now + config.windowMs });
    return { success: true, remaining: config.limit - 1, retryAfter: 0 };
  }

  // Within window
  if (entry.count < config.limit) {
    entry.count++;
    return {
      success: true,
      remaining: config.limit - entry.count,
      retryAfter: 0,
    };
  }

  // Rate limited
  const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
  return { success: false, remaining: 0, retryAfter };
}

/**
 * Extract client IP from a Next.js request.
 * Checks x-forwarded-for (set by reverse proxies like Railway/Vercel),
 * falls back to x-real-ip, then to a default.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
