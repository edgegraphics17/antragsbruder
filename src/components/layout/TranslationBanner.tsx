"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, stripLocale, type Locale } from "@/i18n/config";
import { commonDict } from "@/content/i18n/common";

// Pages with real per-language content. Everything else still renders (in
// German) under a locale prefix, but shows a translated notice instead of
// silently presenting untranslated copy as if it were localized.
const TRANSLATED_PATHS = new Set(["/wohngeldrechner", "/wohngeldrechner/antrag"]);

export function TranslationBanner({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  if (locale === defaultLocale) return null;
  if (TRANSLATED_PATHS.has(stripLocale(pathname))) return null;

  return (
    <div className="bg-brand-100 px-5 py-2.5 text-center text-xs font-medium text-brand-900 sm:px-8">
      {commonDict[locale].translationNotice}
    </div>
  );
}
