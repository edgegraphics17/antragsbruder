// ============================================================
// AUTH API: Sign Out (Logout)
// POST /api/auth/logout
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { trackError } from '@/lib/sentry';
import { safeAuthMessage } from '@/lib/api-error';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = await checkRateLimit(ip, 'default');
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
      return NextResponse.json({ error: safeAuthMessage(error) }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    trackError(err, { route: 'auth.logout' });
    return NextResponse.json({ error: (safeAuthMessage(err)) ?? 'Interner Fehler' }, { status: 500 });
  }
}
