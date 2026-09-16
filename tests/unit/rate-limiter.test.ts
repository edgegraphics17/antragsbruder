import { describe, it, expect } from 'vitest';
import { checkRateLimit, getClientIp } from '../../src/lib/rate-limiter';

describe('getClientIp', () => {
  it('extrahiert IP aus cf-connecting-ip Header', () => {
    const request: { headers: { get: (name: string) => string | null } } = {
      headers: {
        get: (name: string) => name === 'cf-connecting-ip' ? '203.0.113.42' : null,
      },
    };
    expect(getClientIp(request)).toBe('203.0.113.42');
  });

  it('extrahiert IP aus x-forwarded-for Header', () => {
    const request: { headers: { get: (name: string) => string | null } } = {
      headers: {
        get: (name: string) => name === 'x-forwarded-for' ? '192.168.1.1, 10.0.0.1' : null,
      },
    };
    expect(getClientIp(request)).toBe('192.168.1.1');
  });

  it('fällt auf localhost zurück, wenn keine IP verfügbar', () => {
    const request: { headers: { get: () => null } } = {
      headers: { get: () => null },
    };
    expect(getClientIp(request)).toBe('127.0.0.1');
  });
});

describe('checkRateLimit', () => {
  it('erlaubt erste Anfrage eines Clients', () => {
    const result = checkRateLimit('192.168.1.100', 'default');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(29); // 30 - 1
  });

  it('unterscheidet verschiedene Tiers', () => {
    const resultDefault = checkRateLimit('192.168.1.200', 'default');
    expect(resultDefault.remaining).toBe(29); // max 30

    const resultAuth = checkRateLimit('192.168.1.201', 'auth');
    expect(resultAuth.remaining).toBe(9); // max 10
  });

  it('resetAt liegt in der Zukunft', () => {
    const result = checkRateLimit('192.168.1.300', 'default');
    const resetAt = result.resetAt;
    expect(resetAt).toBeGreaterThan(Date.now());
    expect(resetAt).toBeLessThan(Date.now() + 60000);
  });
});
