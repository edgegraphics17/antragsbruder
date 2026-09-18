'use client';

// Admin-Navigation — kompakt, deutsch, internes Tool (kein i18n).
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Übersicht' },
  { href: '/admin/buerger', label: 'Bürger' },
  { href: '/admin/antraege', label: 'Anträge' },
] as const;

export function AdminSidebar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const href = (path: string) => `/${locale}${path}`;

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-brand-950 text-white lg:flex">
      <div className="px-5 py-6">
        <p className="font-display text-lg font-bold tracking-tight">Antragsbruder</p>
        <p className="text-xs text-white/50">Admin-Bereich</p>
      </div>
      <nav className="flex flex-col gap-1 px-3" aria-label="Admin-Navigation">
        {NAV.map((item) => {
          const active = pathname === href(item.href) || pathname.startsWith(`${href(item.href)}/`);
          return (
            <Link
              key={item.href}
              href={href(item.href)}
              aria-current={active ? 'page' : undefined}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                active ? 'bg-brand-600 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-3 pb-6">
        <Link
          href={href('/dashboard')}
          className="rounded-xl px-4 py-2.5 text-sm text-white/40 transition-colors hover:text-white/70"
        >
          ← Zum Bürger-Dashboard
        </Link>
      </div>
    </aside>
  );
}

export function AdminMobileNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const href = (path: string) => `/${locale}${path}`;
  return (
    <div className="sticky top-0 z-40 flex items-center gap-2 overflow-x-auto border-b border-white/10 bg-brand-950 px-3 py-2.5 lg:hidden">
      <span className="font-display text-sm font-bold text-white">Admin</span>
      {NAV.map((item) => {
        const active = pathname === href(item.href) || pathname.startsWith(`${href(item.href)}/`);
        return (
          <Link
            key={item.href}
            href={href(item.href)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
              active ? 'bg-brand-600 text-white' : 'text-white/70'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
