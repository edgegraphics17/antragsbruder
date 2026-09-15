// ============================================================
// AUTH API: Session-Prüfung (für Middleware-ähnlichen Schutz)
// GET /api/auth/status
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';

export async function GET(request: Request) {
  const supabase = createAuthServerClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: 'Session check failed' }, { status: 500 });
  }

  return NextResponse.json({
    authenticated: !!session,
    user: session?.user ?? null,
  });
}
