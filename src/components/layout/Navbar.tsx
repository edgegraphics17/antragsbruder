"use client";

import Link from "next/link";
import { useState } from "react";
import { getMainNav } from "@/content/nav";
import { site } from "@/content/site";
import { commonDict } from "@/content/i18n/common";
import { Button } from "@/components/ui/Button";
import { MascotIcon } from "@/components/ui/Logo";
import { IconChevronDown, IconClose, IconMenu } from "@/components/ui/icons";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { localeHref, type Locale } from "@/i18n/config";

export function Navbar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const mainNav = getMainNav(locale);
  const t = commonDict[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft/70 bg-cream/90 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-cream"
      >
        {t.navbar.skipToContent}
      </a>
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href={localeHref(locale, "/")} className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <MascotIcon className="h-12 w-12" priority />
          {site.name}
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label={t.navbar.mainNavLabel}>
          {mainNav.map((group) => (
            <div
              key={group.key}
              className="relative"
              onMouseEnter={() => setActiveGroup(group.key)}
              onMouseLeave={() => setActiveGroup(null)}
            >
              {group.items ? (
                <button
                  className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-100 hover:text-brand-900 cursor-pointer"
                  aria-expanded={activeGroup === group.key}
                  onClick={() => setActiveGroup(activeGroup === group.key ? null : group.key)}
                >
                  {group.label}
                  <IconChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  href={group.href!}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-100 hover:text-brand-900"
                >
                  {group.label}
                </Link>
              )}
              {group.items && activeGroup === group.key ? (
                <div className="absolute left-0 top-full w-72 pt-2">
                  <div className="rounded-3xl border border-line-soft bg-white p-2 shadow-lg shadow-brand-950/5">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-2xl px-3 py-2.5 text-sm hover:bg-brand-50"
                      >
                        <span className="block font-medium text-ink">{item.label}</span>
                        {item.description ? (
                          <span className="mt-0.5 block text-xs text-ink-soft">{item.description}</span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher
            locale={locale}
            label={t.navbar.language}
            className="rounded-full border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-soft cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-700"
          />
          <Button href={localeHref(locale, "/kontakt")} variant="ghost" size="md">
            {t.buttons.kontakt}
          </Button>
          <Button href={localeHref(locale, "/hilfe-starten")} variant="primary" size="md">
            {t.buttons.papierkramHochladen}
          </Button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-brand-100 lg:hidden cursor-pointer"
          aria-label={open ? t.navbar.menuClose : t.navbar.menuOpen}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line-soft bg-cream px-5 pb-6 pt-2 lg:hidden">
          <div className="py-3">
            <LanguageSwitcher
              locale={locale}
              label={t.navbar.language}
              className="w-full rounded-2xl border border-line bg-white px-3 py-2.5 text-sm font-semibold text-ink cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-700"
            />
          </div>
          <nav className="flex flex-col gap-1" aria-label={t.navbar.mobileNavLabel}>
            {mainNav.map((group) => (
              <div key={group.key} className="border-b border-line-soft/60 py-1">
                {group.href ? (
                  <Link
                    href={group.href}
                    className="block px-2 py-3 text-base font-medium text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {group.label}
                  </Link>
                ) : (
                  <p className="px-2 py-3 text-base font-medium text-ink">{group.label}</p>
                )}
                {group.items ? (
                  <div className="mb-2 flex flex-col gap-0.5 pl-3">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg px-2 py-2.5 text-sm text-ink-soft hover:bg-brand-50"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <Button href={localeHref(locale, "/kontakt")} variant="secondary" onClick={() => setOpen(false)}>
              {t.buttons.kontakt}
            </Button>
            <Button href={localeHref(locale, "/hilfe-starten")} variant="primary" onClick={() => setOpen(false)}>
              {t.buttons.papierkramHochladen}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
