// ============================================================
// API: Signierte Vorschau-URL für ein Dokument (private Buckets)
// GET /api/dashboard/documents/signed-url?path={storagePath}
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAuthServerClient } from '@/lib/auth-server';
import { getSignedUrl } from '@/lib/storage';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { trackError } from '@/lib/sentry';

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  try {
    const supabase = createAuthServerClient();
    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !data.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const path = request.nextUrl.searchParams.get('path');
    if (!path) {
      return NextResponse.json({ error: 'path (Storage-Pfad) erforderlich' }, { status: 400 });
    }

    // Pfad-Sanity: erster Ordner muss die User-ID des angemeldeten
    // Nutzers sein (Owner-Scope, deckt sich mit Storage-RLS).
    const firstFolder = path.split('/')[0];
    if (firstFolder !== data.session.user.id) {
      return NextResponse.json({ error: 'Kein Zugriff auf dieses Dokument' }, { status: 403 });
    }

    const url = await getSignedUrl(request, path, 600);
    return NextResponse.json({ signedUrl: url });
  } catch (err: unknown) {
    trackError(err, { route: 'dashboard.documents.signedUrl' });
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
