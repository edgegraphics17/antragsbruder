import { redirect } from "next/navigation";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ============================================================
// PREISSEITE ENTFERNT (seit 2026-10-12)
// Konzept-Umbau: kein öffentliches Preis-/Service-Angebot mehr.
// Preise werden individuell nach Kontaktaufnahme besprochen.
// Die Route leitet auf /kontakt um, damit bestehende Links und
// Indexierungen nicht ins Leere laufen.
// ============================================================

export default async function PreisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  redirect(localeHref(locale, "/kontakt"));
}
