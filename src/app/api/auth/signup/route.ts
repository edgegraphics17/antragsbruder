// ============================================================
// AUTH API: Sign Up (Registrierung)
// POST /api/auth/signup
// Body: { email, password, preferredLocale?, fullName? }
// ============================================================

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAuthServerClient } from '@/lib/auth-server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { signupSchema } from '@/lib/api-validation';
import { trackError } from '@/lib/sentry';

export async function POST(request: Request) {
  // Rate-Limiting: Auth-Endpunkte sind brute-force-angreifbar
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, 'auth');
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: 'Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.',
        retryAfter: Math.ceil((rate.resetAt - Date.now()) / 1000),
      },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rate.resetAt - Date.now()) / 1000)) } },
    );
  }

  try {
    const supabase = createAuthServerClient();
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Ungültiger Anfrage-Body' }, { status: 400 });
    }

    // Zod-Validierung
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? 'Validierungsfehler' },
        { status: 400 },
      );
    }

    const { email, password, preferredLocale = 'de', fullName } = parsed.data;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          preferred_locale: preferredLocale,
          full_name: fullName,
        },
      },
    });

    if (error) {
      if ((error instanceof Error ? error.message : String(error)).includes('already registered')) {
        return NextResponse.json(
          { error: 'Diese E-Mail ist bereits registriert' },
          { status: 409 },
        );
      }
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      requiresEmailVerification: data.user && !data.session,
    });
  } catch (err: unknown) {
    trackError(err, { route: 'auth.signup' });
    return NextResponse.json({ error: (err instanceof Error ? err.message : String(err)) ?? 'Interner Fehler' }, { status: 500 });
  }
}
