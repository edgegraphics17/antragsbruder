// ============================================================
// API: Dashboard — Case Creation (POST nur)
// POST   /api/dashboard/case       — neuen Case erstellen
// GET/PATCH auf /api/dashboard/case/[id] — siehe [id]/route.ts
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { v4 as uuidv4 } from 'uuid';

// --- POST: Neuen Case erstellen ---
export async function POST(request: NextRequest) {
  try {
    // Auth-Client mit Cookie-Session: RLS-Owner-Policies greifen (kein Public-Access).
    const supabase = createAuthServerClient();
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = sessionData.session.user.id;
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Ungültiger Anfrage-Body' },
        { status: 400 },
      );
    }

    const { title, lifeEvent } = body as {
      title?: string;
      lifeEvent?: string;
    };

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Titel ist erforderlich' },
        { status: 400 },
      );
    }

    const caseId = uuidv4();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('cases')
      .insert({
        id: caseId,
        user_id: userId,
        title: title.trim(),
        status: 'ACTIVE',
        life_events: lifeEvent ? [lifeEvent] : [],
        legal_reference_date: now,
        metadata: {},
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      console.error('Case-Erstellung fehlgeschlagen:', error);
      return NextResponse.json(
        { error: 'Case konnte nicht erstellt werden' },
        { status: 500 },
      );
    }

    return NextResponse.json({ case: data }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}