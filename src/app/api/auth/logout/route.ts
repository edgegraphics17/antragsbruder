// ============================================================
// AUTH API: Sign Out (Logout)
// POST /api/auth/logout
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { trackError } from '@/lib/sentry';

export async function POST(request: Request) {
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
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    trackError(err, { route: 'auth.logout' });
    return NextResponse.json({ error: (err instanceof Error ? err.message : String(err)) ?? 'Interner Fehler' }, { status: 500 });
  }
}
