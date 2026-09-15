// ============================================================
// SUPABASE AUTH CLIENT — Browser (Client Components)
// ============================================================

import { createBrowserClient, isBrowser } from '@supabase/ssr';

let _browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getBrowserClient() {
  if (!isBrowser()) throw new Error('getBrowserClient nur im Browser möglich');
  if (!_browserClient) {
    _browserClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return _browserClient;
}

export type AuthUser = {
  id: string;
  email: string;
  created_at: string;
};
