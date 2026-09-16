'use client';

// ============================================================
// DASHBOARD NAVIGATION
// Desktop: Fixe, dunkle Sidebar links (Profil + Abmelden inklusive).
// Mobile: Schlanke Top-Bar + native-app-artige Tab-Bar unten
// (mit Safe-Area-Support für Notch/Home-Indicator).
// ============================================================

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  IconDocument,
  IconFolder,
  IconSpark,
  IconArrowRight,
  IconFileUp,
  IconCoin,
} from '@/components/ui/icons';
import { IconPerson } from '@/components/ui/icons-person';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Übersicht', icon: IconFolder },
  { href: '/alg1', label: 'ALG1', icon: IconCoin },
  { href: '/dokumente', label: 'Dokumente', icon: IconDocument },
  { href: '/dashboard/upload', label: 'Upload', icon: IconFileUp },
  { href: '/foerderungen', label: 'Förderungen', icon: IconSpark },
  { href: '/profil', label: 'Profil', icon: IconPerson },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') {
    return pathname === '/dashboard' || pathname.startsWith('/antraege/');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/anmelden');
  };

  return (
    <div className="flex h-full flex-col bg-brand-950 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="font-display text-lg font-bold tracking-tight">Antragsbruder</span>
      </div>

      {/* Profil */}
      <div className="mx-4 mb-4 flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600">
          <IconPerson className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {user ? user.email.split('@')[0] : 'Gast'}
          </p>
          {user && (
            <p className="truncate text-xs text-white/50">{user.email}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-4" aria-label="Dashboard-Navigation">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand-600 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
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
          Abmelden
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
        >
          Zur Website
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();

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

      {/* Mobile Tab-Bar (native-app-artig, Upload als hervorgehobener Mittel-Tab) */}
      <nav
        aria-label="Dashboard-Navigation"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-line-soft bg-white/95 backdrop-blur-sm lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          const isUpload = item.href === '/dashboard/upload';
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium transition-colors ${
                active ? 'text-brand-700' : 'text-ink-soft'
              }`}
            >
              <span
                className={`flex items-center justify-center rounded-full ${
                  isUpload ? 'h-9 w-9 -mt-4 bg-brand-600 text-white shadow-md' : ''
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
