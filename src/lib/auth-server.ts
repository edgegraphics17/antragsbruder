// ============================================================
// SUPABASE AUTH SERVER CLIENT — nur für API-Routes und Server
// ============================================================

import { createServerClient, isBrowser } from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';

type CookieStore = {
  getAll(): { name: string; value: string }[];
  set(name: string, value: string, options?: Record<string, unknown>): void;
};

async function getAllCookies(): Promise<{ name: string; value: string }[]> {
  const cookieStore = await nextCookies();
  return cookieStore.getAll();
}

async function setAllCookies(
  cookiesToSet: readonly { name: string; value: string; options?: Record<string, unknown> }[],
) {
  try {
    const cookieStore = await nextCookies();
    for (const { name, value, options } of cookiesToSet) {
      cookieStore.set(name, value, options);
    }
  } catch {
    // cookies() nicht verfügbar (z. B. in Server Actions)
  }
}

function createCookiesHandler() {
  return {
    async getAll() {
      return getAllCookies();
    },
    async setAll(cookiesToSet: readonly { name: string; value: string; options?: Record<string, unknown> }[]) {
      return setAllCookies(cookiesToSet);
    },
  };
}

export function createAuthServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: createCookiesHandler(),
    },
  );
}
