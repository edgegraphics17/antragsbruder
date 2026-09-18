'use client';

// ============================================================
// DASHBOARD NAVIGATION
// Desktop: Fixe, dunkle Sidebar links (Profil-Widget + Abmelden).
// Mobile: Schlanke Top-Bar + native-app-artige Tab-Bar unten.
// Profil-Daten kommen aus dem globalen ProfileStore (Realtime).
// ============================================================

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { supabase } from '@/lib/supabase';
import {
  IconDocument,
  IconFolder,
  IconSpark,
  IconArrowRight,
  IconCoin,
  IconSettings,
} from '@/components/ui/icons';
import { IconPerson } from '@/components/ui/icons-person';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { localeHref, type Locale } from '@/i18n/config';
import { useLocaleFromPath } from '@/i18n/use-locale';

type NavItem = {
  href: string;
  /** Key in DashboardDict.nav */
  labelKey: 'dashboard' | 'alg1' | 'dokumente' | 'foerderungen';
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', labelKey: 'dashboard', icon: IconFolder },
  { href: '/alg1', labelKey: 'alg1', icon: IconCoin },
  { href: '/dokumente', labelKey: 'dokumente', icon: IconDocument },
  { href: '/foerderungen', labelKey: 'foerderungen', icon: IconSpark },
];

/** Aktuelles Locale aus der URL ableiten (Dashboard-URLs sind unprefixed = de). */
const useLocale = useLocaleFromPath;

function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') {
    return pathname === '/dashboard' || pathname.startsWith('/antraege/');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const dict = getDashboardDict(locale);
  const { user, logout } = useAuth();
  const { profile, loadProfile } = useProfileStore();

  useEffect(() => {
    if (user && !profile) loadProfile(user.id);
  }, [user, profile, loadProfile]);

  // Realtime-Fallback: Profil-Änderungen (z. B. Avatar aus anderem Tab) nachziehen.
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel('sidebar-profile')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
        () => {
          loadProfile(user.id);
        },
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [user, loadProfile]);

  const handleLogout = async () => {
    await logout();
    router.push(localeHref(locale, '/anmelden'));
  };

  const displayName = profile?.firstName
    ? `${profile.firstName} ${profile.lastName ?? ''}`.trim()
    : user?.email?.split('@')[0] ?? dict.sidebar.guest;

  return (
    <div className="flex h-full flex-col bg-brand-950 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="font-display text-lg font-bold tracking-tight">Antragsbruder</span>
      </div>

      {/* Profil-Widget */}
      <Link
        href={localeHref(locale, '/profil')}
        className="mx-4 mb-4 flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-600">
          {profile?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <IconPerson className="h-4 w-4 text-white" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{displayName}</p>
          {user && <p className="truncate text-xs text-white/50">{user.email}</p>}
        </div>
        <IconSettings className="h-4 w-4 shrink-0 text-white/50" />
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-4" aria-label={dict.sidebar.navLabel}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={localeHref(locale, item.href)}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand-600 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {dict.nav[item.labelKey]}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-2 px-4 py-6">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          {dict.sidebar.logout}
        </button>
        <Link
          href={localeHref(locale, '/')}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
        >
          {dict.sidebar.backToSite}
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const dict = getDashboardDict(locale);

  return (
    <>
      {/* Desktop-Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Top-Bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-brand-950 px-4 py-3 lg:hidden">
        <span className="font-display text-base font-bold text-white">Antragsbruder</span>
      </div>

      {/* Mobile Tab-Bar */}
      <nav
        aria-label={dict.sidebar.navLabel}
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line-soft bg-white/95 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={localeHref(locale, item.href)}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium transition-colors ${
                active ? 'text-brand-700' : 'text-ink-soft'
              }`}
            >
              <Icon className="h-5 w-5" />
              {dict.nav[item.labelKey]}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
