// ============================================================
// RATE LIMITER — Simple in-memory rate limiter for API routes
// ============================================================
// Für Production: @upstash/ratelimit mit Redis. Dieser MVP-Implementierung
// nutzt einen einfachen In-Memory-Store. Begrenzt auf 30 Anfragen pro Minute
// pro IP-Adresse für authentifizierte, 10 pro Minute für nicht authentifizierte Routes.

const RATE_LIMITS = {
  // Standard: 30 requests per 60 seconds per IP
  default: { max: 30, windowMs: 60_000 },
  // Auth endpoints (signup, signin): 10 per 60 seconds per IP — schützt vor Brute-Force
  auth: { max: 10, windowMs: 60_000 },
  // Upload: 10 per 60 seconds per IP
  upload: { max: 10, windowMs: 60_000 },
};

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const _store = new Map<string, RateLimitEntry>();

// Cleanup-Intervall: alle 5 Minuten alte Einträge entfernen
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of _store.entries()) {
      if (entry.resetAt < now) {
        _store.delete(key);
      }
    }
  }, 300_000).unref?.();
}

export function checkRateLimit(ip: string, tier: keyof typeof RATE_LIMITS = 'default'): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const config = RATE_LIMITS[tier];
  const now = Date.now();

  let entry = _store.get(ip);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + config.windowMs };
    _store.set(ip, entry);
  }

  entry.count++;

  const allowed = entry.count <= config.max;
  const remaining = Math.max(0, config.max - entry.count);

  return {
    allowed,
    remaining,
    resetAt: entry.resetAt,
  };
}

/** Extrahiert die IP-Adresse aus der Anfrage. Priorisiert x-forwarded-for (Proxy/Vercel). */
export function getClientIp(request: { headers: { get(name: string): string | null } }): string {
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;

  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // Erste IP in der Kette (original client)
    return xForwardedFor.split(',')[0].trim();
  }

  // Fallback
  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) return xRealIp;

  return '127.0.0.1';
}
