// ============================================================
// API: Dashboard — Alle Dokumente des Nutzers
// GET /api/dashboard/documents/all
// Dokumente-Center: alle Unterlagen über alle Cases, inkl.
// signierter Download-URLs.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAuthServerClient } from '@/lib/auth-server';
import { supabase } from '@/lib/supabase';
import { getSignedUrl, type DocumentRecord } from '@/lib/storage';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { trackError } from '@/lib/sentry';

export async function GET(_request: NextRequest) {
  const rate = checkRateLimit(getClientIp(_request), 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  try {
    const supabaseAuth = createAuthServerClient();
    const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();

    if (sessionError || !sessionData.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = sessionData.session.user.id;

    // Eigene Cases (Berechtigungsfilter)
    const { data: cases, error: casesError } = await supabase
      .from('cases')
      .select('id')
      .eq('user_id', userId);

    if (casesError) {
      throw new Error(casesError.message);
    }

    const caseIds = (cases ?? []).map((c) => c.id);
    if (caseIds.length === 0) {
      return NextResponse.json({ documents: [] });
    }

    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('id, storage_path, filename, file_size, mime_type, case_id, uploaded_by, created_at')
      .in('case_id', caseIds)
      .order('created_at', { ascending: false });

    if (docsError) {
      throw new Error(docsError.message);
    }

    const parsedIds = z.array(z.string().uuid()).min(1).safeParse(caseIds);
    if (!parsedIds.success) {
      return NextResponse.json({ documents: [] });
    }

    // Signierte URLs nachladen
    const withUrls = await Promise.all(
      ((documents ?? []) as DocumentRecord[]).map(async (doc) => ({
        ...doc,
        signedUrl: await getSignedUrl(_request, doc.storage_path, 3600),
      })),
    );

    return NextResponse.json({ documents: withUrls });
  } catch (err: unknown) {
    trackError(err, { route: 'dashboard.documents.all' });
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Fehler beim Laden' },
      { status: 500 },
    );
  }
}
