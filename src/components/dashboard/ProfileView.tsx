'use client';

// ============================================================
// PROFIL — Kontoübersicht & Abmelden
// ============================================================

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { IconPerson } from '@/components/ui/icons-person';

export function ProfileView() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/anmelden');
  };

  return (
    <div className="flex flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-ink">Profil</h1>

        <div className="flex items-center gap-4 rounded-2xl border border-line-soft bg-paper p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100">
            <IconPerson className="h-6 w-6 text-brand-700" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">
              {user?.email ?? 'Nicht angemeldet'}
            </p>
            <p className="text-xs text-ink-soft">
              {user ? `Mitglied seit ${new Date(user.created_at).toLocaleDateString('de-DE')}` : '—'}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-line-soft bg-paper p-5">
          <h2 className="text-sm font-semibold text-ink">Konto</h2>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 rounded-xl border border-line-soft bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-red-50 hover:text-red-700"
          >
            Abmelden
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-line-soft bg-paper p-5 text-sm text-ink-soft">
          <h2 className="text-sm font-semibold text-ink">Einstellungen</h2>
          <p className="mt-2">
            Sprache, Benachrichtigungen und weitere Einstellungen folgen in Kürze.
          </p>
        </div>
      </div>
    </div>
  );
}
