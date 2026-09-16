// ============================================================
// API: Dashboard — Case Details (GET/PATCH)
// GET    /api/dashboard/case/:id       — Case-Details laden
// PATCH  /api/dashboard/case/:id       — Status aktualisieren
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function createDbClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// --- GET: Case-Details laden ---
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = createAuthServerClient();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = sessionData.session.user.id;
    const { id: caseId } = await params;

    const { data: caseRow, error: caseError } = await createDbClient()
      .from('cases')
      .select('id, status, life_events, legal_reference_date, user_id, metadata, created_at, updated_at')
      .eq('id', caseId)
      .eq('user_id', userId)
      .maybeSingle();

    if (caseError) {
      console.error('Case-Laden fehlgeschlagen:', caseError);
      return NextResponse.json(
        { error: 'Antrag konnte nicht geladen werden' },
        { status: 500 },
      );
    }

    if (!caseRow || caseRow.user_id !== userId) {
      return NextResponse.json({ error: 'Antrag nicht gefunden' }, { status: 404 });
    }

    const { data: documents } = await createDbClient()
      .from('documents')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false });

    return NextResponse.json({
      case: caseRow,
      documents: (documents || []).map((d) => ({
        id: d.id,
        storage_path: d.storage_path,
        filename: d.filename,
        file_size: d.file_size,
        mime_type: d.mime_type,
        case_id: d.case_id,
        uploaded_by: d.uploaded_by,
        created_at: d.created_at,
        updated_at: d.updated_at,
      })),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// --- PATCH: Status aktualisieren ---
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = createAuthServerClient();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = sessionData.session.user.id;
    const { id: caseId } = await params;

    // Existierenden Case laden
    const existing = await createDbClient()
      .from('cases')
      .select('user_id, status, metadata')
      .eq('id', caseId)
      .single();

    if (existing.error || !existing.data || existing.data.user_id !== userId) {
      return NextResponse.json({ error: 'Antrag nicht gefunden' }, { status: 404 });
    }

    const existingRow = existing.data;

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Ungültiger Anfrage-Body' }, { status: 400 });
    }

    const { status } = body as { status?: string };

    if (!status || !['ACTIVE', 'PAUSED', 'COMPLETED'].includes(status)) {
      return NextResponse.json(
        { error: 'Ungültiger Status (ACTIVE | PAUSED | COMPLETED)' },
        { status: 400 },
      );
    }

    const { data, error } = await createDbClient()
      .from('cases')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', caseId)
      .select()
      .single();

    if (error) {
      console.error('Status-Update fehlgeschlagen:', error);
      return NextResponse.json(
        { error: 'Status konnte nicht aktualisiert werden' },
        { status: 500 },
      );
    }

    return NextResponse.json({ case: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
