// ============================================================
// API: Supabase Health Check
// GET /api/health/supabase
// ============================================================

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { logApiError } from '@/lib/api-error';

export async function GET(request: Request) {
  // Vorher wurde ein leeres Headers-Objekt übergeben: alle Anfragen landeten im
  // selben Zähler-Bucket (127.0.0.1) und das Limit war wirkungslos.
  const ip = getClientIp(request);
  const rate = await checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rate.resetAt - Date.now()) / 1000)) } },
    );
  }

  try {
    const { error } = await supabase
      .from('cases')
      .select('id')
      .limit(1);

    // Eine fehlende Tabelle ist ein Setup-Zustand, kein Ausfall. Vorher war die
    // Bedingung durch Operator-Vorrang kaputt und der Check meldete dauerhaft
    // Fehler, obwohl die Verbindung stand.
    const missingTable = Boolean(error && /does not exist/i.test(error.message ?? ''));
    if (error && !missingTable) {
      logApiError('health.supabase', error);
      return NextResponse.json({ status: 'error', connected: false }, { status: 500 });
    }

    return NextResponse.json({
      status: 'ok',
      connected: true,
      hasTables: !error,
    });
  } catch (err: unknown) {
    logApiError('health.supabase', err);
    return NextResponse.json({ status: 'error', connected: false }, { status: 500 });
  }
}
