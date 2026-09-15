// ============================================================
// API: Auth — E-Mail-Verifizierung bestätigen
// POST /api/auth/verify-email
// Body: { token }  (oder optional leer → versucht aktuelle Verifikation)
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createAuthServerClient();

    // Optional: Token-Option. Standardmäßig wird versucht,
    // die Token-Verbindung über den aktuellen Auth-Zustand zu bestätigen.
    const body = await request.json().catch(() => ({}));
    const { token } = body as { token?: string };

    if (token) {
      const { error } = await supabase.auth.verifyOtp({
        token,
        type: 'email',
        email: '', // Dummy — Supabase nutzt Token, nicht email, für manuelle Token-Verifikation
      } as any);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    // Bei bestehender Session prüfen, ob E-Mail verifiziert ist
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      // Supabase auth.users.email_confirmed_at ist da —
      // vereinfacht: wir antworten mit dem Verifikationsstatus der Session
      .select('id')
      .eq('id', data.session.user.id)
      .single();

    if (profileError) {
      return NextResponse.json({ error: 'Profil nicht found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      emailConfirmed: data.session.user.email_confirmed_at ? true : false,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
