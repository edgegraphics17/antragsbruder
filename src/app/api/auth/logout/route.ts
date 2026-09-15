// ============================================================
// AUTH API: Sign Out (Logout)
// POST /api/auth/logout
// ============================================================

import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';

export async function POST(request: Request) {
  try {
    const supabase = createAuthServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
