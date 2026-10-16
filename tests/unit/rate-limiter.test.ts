import { describe, it, expect } from 'vitest';
import { checkRateLimit, getClientIp } from '../../src/lib/rate-limiter';

type Req = { headers: { get: (name: string) => string | null } };

function req(headers: Record<string, string>): Req {
  return {
    headers: {
      get: (name: string) => headers[name.toLowerCase()] ?? null,
    },
  };
}

describe('getClientIp', () => {
  it('extrahiert IP aus cf-connecting-ip Header', () => {
    expect(getClientIp(req({ 'cf-connecting-ip': '203.0.113.42' }))).toBe('203.0.113.42');
  });

  it('nutzt x-vercel-forwarded-for mit Vorrang vor x-forwarded-for', () => {
    // Die Plattform setzt diesen Header selbst; x-forwarded-for ist in fremden
    // Setups client-steuerbar und deshalb nachrangig.
    expect(
      getClientIp(req({ 'x-vercel-forwarded-for': '203.0.113.7', 'x-forwarded-for': '10.0.0.1' })),
    ).toBe('203.0.113.7');
  });

  it('nutzt x-real-ip vor einem beliebigen x-forwarded-for', () => {
    expect(
      getClientIp(req({ 'x-real-ip': '203.0.113.8', 'x-forwarded-for': '1.2.3.4' })),
    ).toBe('203.0.113.8');
  });

  it('extrahiert die erste IP aus einer x-forwarded-for-Kette', () => {
    expect(getClientIp(req({ 'x-forwarded-for': '192.168.1.1, 10.0.0.1' }))).toBe('192.168.1.1');
  });

  it('fällt auf "unknown" zurück, wenn keine IP verfügbar ist', () => {
    expect(getClientIp(req({}))).toBe('unknown');
  });
});

describe('checkRateLimit', () => {
  it('erlaubt die erste Anfrage eines Clients', async () => {
    const result = await checkRateLimit('192.168.1.100', 'default');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(29); // 30 - 1
  });

  it('unterscheidet verschiedene Tiers', async () => {
    const resultDefault = await checkRateLimit('192.168.1.200', 'default');
    expect(resultDefault.remaining).toBe(29); // max 30

    const resultAuth = await checkRateLimit('192.168.1.201', 'auth');
    expect(resultAuth.remaining).toBe(9); // max 10
  });

  it('resetAt liegt in der Zukunft', async () => {
    const result = await checkRateLimit('192.168.1.300', 'default');
    expect(result.resetAt).toBeGreaterThan(Date.now());
    expect(result.resetAt).toBeLessThanOrEqual(Date.now() + 60000);
  });

  it('sperrt nach Überschreiten des Limits', async () => {
    const key = '192.168.1.400';
    for (let i = 0; i < 10; i++) {
      await checkRateLimit(key, 'auth');
    }
    const blocked = await checkRateLimit(key, 'auth');
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('meldet, ob das Limit zentral gilt (ohne Redis: nicht geteilt)', async () => {
    const result = await checkRateLimit('192.168.1.500', 'default');
    expect(result.shared).toBe(false);
  });
});
