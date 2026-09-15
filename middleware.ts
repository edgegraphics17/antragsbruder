import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';

export async function middleware(request: NextRequest) {
  const supabase = createAuthServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  // Auth-APIs brauchen keine Session
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Dashboard schützt alle Routes
  if (isDashboard && !session) {
    const loginUrl = new URL('/de/anmelden', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Wenn eingeloggt, verhindert, dass der Login-Screen nochmal erscheint
  if (session && request.nextUrl.pathname === '/de/anmelden') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/de/anmelden',
    '/api/auth/:path*',
  ],
};
