// ============================================================
// AUTH API: Sign Up (Registrierung)
// POST /api/auth/signup
// Body: { email, password, preferredLocale?, fullName? }
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';

export async function POST(request: Request) {
  try {
    const supabase = createAuthServerClient();
    const body = await request.json();
    const { email, password, preferredLocale = 'de', fullName } = body;

    if (!email || !password) {
      return NextResponse.json({
        error: 'E-Mail und Passwort erforderlich',
      }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({
        error: 'Das Passwort muss mindestens 6 Zeichen haben',
      }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          preferred_locale: preferredLocale,
          full_name: fullName,
        },
      },
    });

    if (error) {
      if (error.message?.includes('already registered')) {
        return NextResponse.json(
          { error: 'Diese E-Mail ist bereits registriert' },
          { status: 409 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      requiresEmailVerification: data.user && !data.session,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
