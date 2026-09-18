// ============================================================
// ADMIN-GUARD (Server-seitig) — Single Source of Truth für
// "darf diese Session ins Admin-Dashboard?".
// Quelle: public.is_admin() (SECURITY DEFINER, liest admin_users).
// Wird vom (admin)-Layout UND von jeder Admin-Server-Action genutzt.
// ============================================================
import { createAuthServerClient } from './auth-server';

export type AdminUser = {
  id: string;
  email: string;
};

export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) return null;

  return { id: user.id, email: user.email ?? '' };
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminUser();
  if (!admin) throw new Error('Kein Admin-Zugriff.');
  return admin;
}
