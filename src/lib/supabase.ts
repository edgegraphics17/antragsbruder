// ============================================================
// SUPABASE CLIENT — Browser (cookie-basiert) & Server
// Browser: createBrowserClient aus @supabase/ssr, damit alle
// Calls die Auth-Cookies von auth-context.tsx mitsenden.
// Server: bare Client (Client-Module werden auch serverseitig
// evaluiert; DB-Calls passieren aber nur im Browser) bzw.
// Service-Role für API-Routen.
// ============================================================

import { createBrowserClient } from '@supabase/ssr';
import { createClient as createBareClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Cookie-basierter Browser-Client (Singleton) — teilt die Session
// mit getBrowserClient() aus @/lib/auth.
let _browserClient: ReturnType<typeof createBrowserClient> | null = null;

function getSharedBrowserClient() {
  if (!_browserClient) {
    _browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
  return _browserClient;
}

export const supabase: SupabaseClient =
  typeof window !== 'undefined'
    ? (getSharedBrowserClient() as unknown as SupabaseClient)
    : createBareClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for API routes)
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  }
  return createBareClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
