'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { IconPerson } from '@/components/ui/icons-person';
import { IconChevronDown, IconClose, IconMenu } from '@/components/ui/icons';
import { ButtonAction } from '@/components/ui/Button';
import { localeHref, stripLocale, type Locale } from '@/i18n/config';
import { commonDict } from '@/content/i18n/common';

export function AuthNav({ locale }: { locale: Locale }) {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const t = commonDict[locale].auth;
  const nt = commonDict[locale].navbar;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.push(localeHref(locale, '/'));
  };

  const anmeldenHref = localeHref(locale, '/de/anmelden');
  const kontoHref = localeHref(locale, '/de/konto-erstellen');
  const profileHref = localeHref(locale, '/de/profile');

  // Desktop: Dropdown für angemeldete Nutzer
  return (
    <div className="relative">
      {/* Desktop (xl) */}
      <div className="hidden xl:flex xl:items-center">
        {user && !loading ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-900"
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
            >
              <IconPerson className="h-5 w-5" />
              <span className="max-w-[120px] truncate">{user.email}</span>
              <IconChevronDown className="h-4 w-4 text-ink-soft" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line-soft bg-white p-1.5 shadow-xl shadow-brand-950/10"
                >
                  <Link
                    href={profileHref}
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-brand-50"
                  >
                    <IconPerson className="h-4 w-4" />
                    {t.profile}
                  </Link>
                  <div className="my-1 border-t border-line-soft" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-700 transition-colors hover:bg-red-50"
                  >
                    <IconClose className="h-4 w-4" />
                    {t.logout}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Link
              href={anmeldenHref}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-900"
            >
              {t.login}
            </Link>
            <Link
              href={kontoHref}
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {t.signup}
            </Link>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-100 cursor-pointer"
          aria-label={mobileOpen ? nt.menuClose : nt.menuOpen}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>

        {mobileOpen && (
          <div className="mt-2 rounded-2xl border border-line-soft bg-white p-3 shadow-[0_16px_40px_-16px_rgba(18,48,47,0.35)]">
            {user && !loading ? (
              <>
                <div className="mb-2 flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2">
                  <IconPerson className="h-5 w-5 text-brand-700" />
                  <span className="truncate text-sm font-semibold text-brand-900">{user.email}</span>
                </div>
                <Link
                  href={profileHref}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <IconPerson className="h-4 w-4" />
                  {t.profile}
                </Link>
                <ButtonAction
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={handleLogout}
                  className="w-full justify-start"
                >
                  <IconClose className="h-4 w-4" />
                  {t.logout}
                </ButtonAction>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href={anmeldenHref}
                  className="flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.login}
                </Link>
                <Link
                  href={kontoHref}
                  className="flex w-full items-center justify-center rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.signup}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
