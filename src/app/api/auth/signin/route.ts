// ============================================================
// AUTH API: Sign In (Login)
// POST /api/auth/signin
// Body: { email, password }
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';

export async function POST(request: Request) {
  try {
    const supabase = createAuthServerClient();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'E-Mail und Passwort erforderlich' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: data.user,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
