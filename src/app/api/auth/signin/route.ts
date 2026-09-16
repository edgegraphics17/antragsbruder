// ============================================================
// AUTH API: Sign In (Login)
// POST /api/auth/signin
// Body: { email, password }
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { signinSchema } from '@/lib/api-validation';
import { trackError } from '@/lib/sentry';

export async function POST(request: Request) {
  // Rate-Limiting: Login ist brute-force-anfällig
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
    const parsed = signinSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? 'Validierungsfehler' },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: data.user,
    });
  } catch (err: unknown) {
    trackError(err, { route: 'auth.signin' });
    return NextResponse.json({ error: (err instanceof Error ? err.message : String(err)) ?? 'Interner Fehler' }, { status: 500 });
  }
}
