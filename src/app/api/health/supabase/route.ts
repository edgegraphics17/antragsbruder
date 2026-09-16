// ============================================================
// API: Supabase Health Check
// GET /api/health/supabase
// ============================================================

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { trackError } from '@/lib/sentry';

export async function GET() {
  const ip = getClientIp({ headers: new Headers() } as Request);
  const rate = checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  try {
    const { data, error } = await supabase
      .from('cases')
      .select('id')
      .limit(1);

    if (error && error instanceof Error ? error.message : String(error) !== 'relation "cases" does not exist') {
      return NextResponse.json({
        status: 'error',
        connected: false,
        message: error instanceof Error ? error.message : String(error),
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'ok',
      connected: true,
      message: 'Supabase verbunden',
      hasTables: !error,
    });
  } catch (err: unknown) {
    trackError(err, { route: 'health.supabase' });
    return NextResponse.json({
      status: 'error',
      connected: false,
      message: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
