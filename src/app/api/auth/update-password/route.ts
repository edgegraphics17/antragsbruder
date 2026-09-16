// ============================================================
// AUTH API: Neues Passwort setzen (nach Magic-Link-Klick)
// GET /api/auth/update-password?token=<otp_token>&type=recovery
// Der Aufruf mit ?newPassword=... setzt das neue Passwort.
//
// Flow:
//   1. Nutzer klickt auf Magic Link → landet auf /update-password?token=&type=recovery
//   2. Frontend fragt dieses Endpoint mit dem newPassword auf
//   3. Server nutzt supabase.auth.updateUser() mit dem Token aus dem
//      aktuellen Auth-Zustand (supabase-ssr verwaltet den Token aus dem
//      ?token= Param über die Cookies/Headers automatisch).
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const newPassword = searchParams.get('newPassword');
  const _token = searchParams.get('token');
  const _type = searchParams.get('type');

  // Token und type werden von supabase-ssr bei der Initialisierung
  // automatisch aus den Query-Parametern gelesen und verarbeitet.
  // Wir prüfen nur, ob die erforderlichen Parameter vorhanden sind.

  if (!newPassword) {
    return NextResponse.json(
      {
        error: 'Passwort fehlt',
        hint: 'Rufe diese URL mit ?newPassword=<passwort> auf, nachdem du den Magic Link geklickt hast.',
      },
      { status: 400 },
    );
  }

  if (newPassword.length < 6) {
    return NextResponse.json(
      { error: 'Das Passwort muss mindestens 6 Zeichen haben' },
      { status: 400 },
    );
  }

  try {
    const supabase = createAuthServerClient();

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Passwort erfolgreich geändert',
      user: data.user,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAuthServerClient();
    const body = await request.json();
    const { newPassword } = body;

    if (!newPassword) {
      return NextResponse.json(
        { error: 'Passwort fehlt' },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Das Passwort muss mindestens 6 Zeichen haben' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Passwort erfolgreich geändert',
      user: data.user,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
