// ============================================================
// AUTH API: Session-Prüfung
// GET /api/auth/status
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { trackError } from '@/lib/sentry';

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte warte einen Moment.' },
      { status: 429 },
    );
  }

  try {
    const supabase = createAuthServerClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json({ error: 'Session check failed' }, { status: 500 });
    }

    return NextResponse.json({
      authenticated: !!session,
      user: session?.user ?? null,
    });
  } catch (err: unknown) {
    trackError(err, { route: 'auth.status' });
    return NextResponse.json({ error: (err instanceof Error ? err.message : String(err)) ?? 'Interner Fehler' }, { status: 500 });
  }
}
