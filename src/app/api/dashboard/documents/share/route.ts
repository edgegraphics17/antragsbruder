// ============================================================
// API: Bundle teilen — POST /api/dashboard/documents/share
// Legt ein zeitlich begrenztes Share-Paket an (24 h Gültigkeit,
// signierte URLs 60 min). Auth via Cookie-Session, Owner-Validierung.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { createBundle } from '@/lib/share';

export async function POST(request: NextRequest) {
  try {
    const supabase = createAuthServerClient();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const documentIds = (body as { documentIds?: unknown } | null)?.documentIds;
    if (!Array.isArray(documentIds) || documentIds.some((id) => typeof id !== 'string')) {
      return NextResponse.json({ error: 'documentIds (string[]) erforderlich' }, { status: 400 });
    }

    const result = await createBundle(sessionData.session.user.id, documentIds as string[]);
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ token: result.token, expiresAt: result.expiresAt }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
