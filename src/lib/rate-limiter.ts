// ============================================================
// RATE LIMITER — pro Instanz (Fallback) oder zentral über Redis
// ============================================================
// Vorher war der Zähler rein im Arbeitsspeicher. Auf Vercel läuft jede
// Serverless-Instanz für sich, das Limit galt also nie global und war als
// Schutz praktisch wirkungslos.
//
// Zwei Betriebsarten:
// 1. Zentral (produktiv, empfohlen): UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
//    setzen. Der Zähler liegt dann in Redis und gilt für alle Instanzen.
// 2. In-Memory (Fallback): ohne diese Variablen. Bewusst beibehalten, damit die
//    Anwendung ohne Zusatzdienst läuft — dann ist das Limit aber nur eine grobe
//    Bremse pro Instanz, kein verlässlicher Schutz.
//
// Alle Aufrufer awaiten, weil der Redis-Pfad asynchron ist.

const RATE_LIMITS = {
  // Standard: 30 requests per 60 seconds per IP
  default: { max: 30, windowMs: 60_000 },
  // Auth endpoints (signup, signin): 10 per 60 seconds per IP — schützt vor Brute-Force
  auth: { max: 10, windowMs: 60_000 },
  // Upload: 10 per 60 seconds per IP
  upload: { max: 10, windowMs: 60_000 },
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  /** true, wenn das Limit zentral (Redis) geprüft wurde. */
  shared: boolean;
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

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const redisConfigured = Boolean(REDIS_URL && REDIS_TOKEN);

async function redisCommand(command: (string | number)[]): Promise<unknown> {
  const res = await fetch(REDIS_URL as string, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Upstash antwortete ${res.status}`);
  const json = (await res.json()) as { result?: unknown };
  return json.result;
}

export async function checkRateLimit(
  ip: string,
  tier: keyof typeof RATE_LIMITS = 'default',
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[tier];
  const windowSeconds = Math.ceil(config.windowMs / 1000);

  if (redisConfigured) {
    try {
      const bucket = `ratelimit:${tier}:${ip}`;
      const count = Number(await redisCommand(['INCR', bucket]));
      if (count === 1) {
        await redisCommand(['EXPIRE', bucket, windowSeconds]);
      }
      const ttl = Number(await redisCommand(['TTL', bucket]));
      const resetIn = ttl > 0 ? ttl : windowSeconds;
      return {
        allowed: count <= config.max,
        remaining: Math.max(0, config.max - count),
        resetAt: Date.now() + resetIn * 1000,
        shared: true,
      };
    } catch (error) {
      // Bei Redis-Störung lieber lokal weiterbremsen als alle Anfragen sperren.
      console.error('[rate-limit] Redis nicht erreichbar, Fallback auf in-memory:', error);
    }
  }

  const now = Date.now();
  let entry = _store.get(ip);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + config.windowMs };
    _store.set(ip, entry);
  }

  entry.count++;

  return {
    allowed: entry.count <= config.max,
    remaining: Math.max(0, config.max - entry.count),
    resetAt: entry.resetAt,
    shared: false,
  };
}

/**
 * Extrahiert die IP-Adresse aus der Anfrage.
 *
 * Reihenfolge nach Vertrauenswürdigkeit: Werte, die die Plattform selbst setzt,
 * zuerst. `x-forwarded-for` steht bewusst am Ende, weil der erste Eintrag in
 * fremden Setups vom Client gesetzt werden kann — damit ließe sich das Limit
 * durch einen gefälschten Header umgehen.
 */
export function getClientIp(request: { headers: { get(name: string): string | null } }): string {
  const vercelIp = request.headers.get('x-vercel-forwarded-for');
  if (vercelIp) return vercelIp.split(',')[0].trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) return xForwardedFor.split(',')[0].trim();

  return 'unknown';
}
