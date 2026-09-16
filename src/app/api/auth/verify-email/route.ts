// ============================================================
// API: Auth — E-Mail-Verifizierung bestätigen
// POST /api/auth/verify-email
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAuthServerClient } from '@/lib/auth-server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { trackError } from '@/lib/sentry';

const verifyEmailSchema = z.object({
  token: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  try {
    const supabase = createAuthServerClient();

    const body = await request.json().catch(() => ({}));

    // Zod validieren
    const parsed = verifyEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validierungsfehler' }, { status: 400 });
    }

    const { token } = parsed.data;

    if (token) {
      const { error } = await supabase.auth.verifyOtp({
        token,
        type: 'email',
        email: '',
      });
      if (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
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
  } catch (err: unknown) {
    trackError(err, { route: 'auth.verify-email' });
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
