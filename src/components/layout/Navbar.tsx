"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getMainNav, type NavGroup } from "@/content/nav";
import { site } from "@/content/site";
import { commonDict } from "@/content/i18n/common";
import { Button } from "@/components/ui/Button";
import { MascotIcon } from "@/components/ui/Logo";
import { IconChevronDown, IconClose, IconMenu } from "@/components/ui/icons";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { localeHref, stripLocale, type Locale } from "@/i18n/config";

/** True when `href` is the current page or one of its sub-pages. */
function isActive(currentPath: string, href: string) {
  const target = stripLocale(href);
  if (target === "/") return currentPath === "/";
  return currentPath === target || currentPath.startsWith(`${target}/`);
}

function groupIsActive(currentPath: string, group: NavGroup) {
  if (group.href) return isActive(currentPath, group.href);
  return Boolean(group.items?.some((item) => isActive(currentPath, item.href)));
}

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const currentPath = stripLocale(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mainNav = getMainNav(locale);
  const t = commonDict[locale];

  // Close every menu whenever the route changes, so a navigation never leaves
  // a dropdown or the mobile sheet hanging open. Adjusted during render (rather
  // than in an effect) so the new page never flashes with a menu still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenGroup(null);
    setExpandedGroup(null);
  }

  // Escape closes whatever is open; pointer-down outside the desktop nav closes
  // the dropdown (hover alone is not enough on touch devices).
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenGroup(null);
      setMobileOpen(false);
    }
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenGroup(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  // Lock background scroll while the mobile sheet is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const openOnHover = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(key);
  }, []);

  // Small grace period so the pointer can cross the gap between trigger and panel.
  const closeOnHover = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pb-2 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-cream"
      >
        {t.navbar.skipToContent}
      </a>

      <div className="mx-auto flex w-full max-w-6xl justify-center">
        <div className="flex w-full items-center justify-between gap-2 rounded-full border border-line-soft/80 bg-paper/85 py-2 ps-3 pe-2 shadow-[0_8px_30px_-12px_rgba(18,48,47,0.28)] backdrop-blur-md xl:w-auto xl:justify-start xl:gap-1 xl:ps-4 xl:pe-2">
          <Link
            href={localeHref(locale, "/")}
            className="flex shrink-0 items-center gap-2 rounded-full font-display text-lg font-bold text-ink"
          >
            <MascotIcon className="h-8 w-8" priority />
            <span>{site.name}</span>
          </Link>

          <nav
            ref={navRef}
            className="hidden items-center gap-0.5 xl:flex xl:ms-4"
            aria-label={t.navbar.mainNavLabel}
          >
            {mainNav.map((group) => {
              const active = groupIsActive(currentPath, group);
              const itemClass = `flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors ${
                active ? "bg-brand-100 text-brand-900" : "text-ink-soft hover:bg-brand-50 hover:text-brand-900"
              }`;

              if (!group.items) {
                return (
                  <Link
                    key={group.key}
                    href={group.href!}
                    aria-current={active ? "page" : undefined}
                    className={itemClass}
                  >
                    {group.label}
                  </Link>
                );
              }

              const expanded = openGroup === group.key;
              return (
                <div
                  key={group.key}
                  className="relative"
                  onMouseEnter={() => openOnHover(group.key)}
                  onMouseLeave={closeOnHover}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={expanded}
                    onClick={() => setOpenGroup(expanded ? null : group.key)}
                    className={`${itemClass} cursor-pointer`}
                  >
                    {group.label}
                    <IconChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {expanded ? (
                    <div className="absolute start-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3 rtl:translate-x-1/2">
                      <div className="rounded-3xl border border-line-soft bg-white p-2 shadow-[0_16px_40px_-16px_rgba(18,48,47,0.35)]">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive(currentPath, item.href) ? "page" : undefined}
                            className={`block rounded-2xl px-3 py-2.5 transition-colors ${
                              isActive(currentPath, item.href) ? "bg-brand-50" : "hover:bg-brand-50"
                            }`}
                          >
                            <span className="block text-sm font-semibold text-ink">{item.label}</span>
                            {item.description ? (
                              <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">
                                {item.description}
                              </span>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-1 xl:ms-3 xl:flex">
            <span aria-hidden="true" className="mx-1 h-6 w-px bg-line-soft" />
            <LanguageSwitcher locale={locale} label={t.navbar.language} />
            <Button href={localeHref(locale, "/hilfe-starten")} variant="primary" size="md" className="ms-1 whitespace-nowrap">
              {t.nav.hilfeStarten}
            </Button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-100 xl:hidden cursor-pointer"
            aria-label={mobileOpen ? t.navbar.menuClose : t.navbar.menuOpen}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="xl:hidden">
          <div
            className="fixed inset-0 top-0 -z-10 bg-brand-950/30"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <div className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] w-full max-w-6xl overflow-y-auto rounded-3xl border border-line-soft bg-paper p-3 shadow-[0_16px_40px_-16px_rgba(18,48,47,0.35)]">
            <nav className="flex flex-col" aria-label={t.navbar.mobileNavLabel}>
              {mainNav.map((group) => {
                if (!group.items) {
                  return (
                    <Link
                      key={group.key}
                      href={group.href!}
                      aria-current={isActive(currentPath, group.href!) ? "page" : undefined}
                      className={`flex min-h-12 items-center rounded-2xl px-4 text-base font-semibold ${
                        isActive(currentPath, group.href!) ? "bg-brand-100 text-brand-900" : "text-ink"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {group.label}
                    </Link>
                  );
                }

                const expanded = expandedGroup === group.key;
                return (
                  <div key={group.key}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setExpandedGroup(expanded ? null : group.key)}
                      className={`flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-base font-semibold cursor-pointer ${
                        groupIsActive(currentPath, group) ? "text-brand-900" : "text-ink"
                      }`}
                    >
                      {group.label}
                      <IconChevronDown
                        className={`h-5 w-5 text-ink-soft transition-transform duration-200 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expanded ? (
                      <div className="mb-1 flex flex-col ps-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive(currentPath, item.href) ? "page" : undefined}
                            className={`flex min-h-11 items-center rounded-xl px-4 text-sm ${
                              isActive(currentPath, item.href)
                                ? "bg-brand-50 font-semibold text-brand-900"
                                : "text-ink-soft"
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="mt-3 flex flex-col gap-3 border-t border-line-soft pt-3">
              <Button
                href={localeHref(locale, "/hilfe-starten")}
                variant="primary"
                size="lg"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.hilfeStarten}
              </Button>
              <LanguageSwitcher locale={locale} label={t.navbar.language} variant="block" />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
