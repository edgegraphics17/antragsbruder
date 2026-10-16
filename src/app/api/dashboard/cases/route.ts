// ============================================================
// API: Dashboard — Cases des eingeloggten Nutzers
// GET /api/dashboard/cases
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { trackError } from '@/lib/sentry';
import { safeMessage } from '@/lib/api-error';

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const rate = await checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  try {
    const supabase = createAuthServerClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = session.user.id;

    const { data: cases, error: casesError } = await supabase
      .from('cases')
      .select('id, status, life_events, legal_reference_date, user_id, metadata, created_at, updated_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (casesError) {
      console.error('Fehler beim Laden der Cases:', casesError);
      return NextResponse.json(
        { error: 'Fehler beim Laden der Anträge' },
        { status: 500 },
      );
    }

    // Dokumente pro Case zählen über Storage-API
    const enrichedCases: Array<{
      id: string;
      status: string;
      life_events: string[];
      legal_reference_date: string;
      user_id: string;
      metadata: Record<string, unknown>;
      created_at: string;
      updated_at: string;
      documentCount?: number;
    }> = [];

    for (const c of (cases || [])) {
      const { data: docs, error: docsError } = await supabase.storage
        .from('antragsunterlagen')
        .list(`${userId}/${c.id}`);

      if (docsError && docsError.message !== 'Not found') {
        console.warn(`Dokumente für Case ${c.id} konnten nicht geladen werden:`, docsError);
      }

      enrichedCases.push({
        ...c,
        documentCount: (docs || []).length,
      });
    }

    return NextResponse.json({ cases: enrichedCases });
  } catch (err: unknown) {
    trackError(err, { route: 'dashboard.cases' });
    return NextResponse.json({ error: safeMessage(err) }, { status: 500 });
  }
}
