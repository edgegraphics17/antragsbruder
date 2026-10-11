import { redirect } from "next/navigation";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ============================================================
// "HILFE STARTEN" ENTFERNT (seit 2026-10-12)
// Konzept-Umbau: kein Selbstbedienungs-Service-Flow (IntakeForm)
// mehr. Offene Anfragen laufen über den Kontakt — die Route leitet
// dorthin um, damit bestehende Links (u. a. Rechner-CTAs) nicht
// ins Leere laufen.
// ============================================================

export default async function HilfeStartenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  redirect(localeHref(locale, "/kontakt"));
}
