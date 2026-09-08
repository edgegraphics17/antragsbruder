"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IconCheck, IconGlobe } from "@/components/ui/icons";
import { locales, localeMeta, localeHref, stripLocale, type Locale } from "@/i18n/config";

/**
 * Globe-icon language menu. Replaces the native <select> so the control reads
 * as part of the header rather than as a form field, and so the active
 * language can be marked with a check instead of by color alone.
 */
export function LanguageSwitcher({
  locale,
  label,
  variant = "compact",
}: {
  locale: Locale;
  label: string;
  /** "compact" = icon button (desktop bar), "block" = full-width row (mobile sheet). */
  variant?: "compact" | "block";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function select(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    router.push(localeHref(next, stripLocale(pathname)));
  }

  const triggerClass =
    variant === "compact"
      ? "flex h-10 items-center gap-1.5 rounded-full px-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-100 hover:text-brand-900 cursor-pointer"
      : "flex h-12 w-full items-center gap-2 rounded-2xl border border-line bg-white px-4 text-base font-semibold text-ink cursor-pointer";

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-label={`${label}: ${localeMeta[locale].label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
      >
        <IconGlobe className="h-5 w-5" />
        <span className="uppercase">{locale}</span>
        {variant === "block" ? (
          <span className="ms-auto text-sm font-normal text-ink-soft">{localeMeta[locale].label}</span>
        ) : null}
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={label}
          className={
            variant === "compact"
              ? "absolute end-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-line-soft bg-white p-1.5 shadow-xl shadow-brand-950/10"
              : // In the mobile sheet the list stays in flow, so it scrolls with
                // the sheet instead of being clipped by its overflow container.
                "mt-2 w-full overflow-hidden rounded-2xl border border-line-soft bg-white p-1.5"
          }
        >
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              role="menuitemradio"
              aria-checked={l === locale}
              onClick={() => select(l)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-start text-sm transition-colors cursor-pointer hover:bg-brand-50 ${
                l === locale ? "font-semibold text-brand-800" : "text-ink"
              }`}
            >
              <span className="w-7 shrink-0 text-xs font-semibold uppercase text-ink-soft">{l}</span>
              <span className="flex-1">{localeMeta[l].label}</span>
              {l === locale ? <IconCheck className="h-4 w-4 shrink-0 text-brand-700" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
