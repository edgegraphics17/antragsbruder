import { permanentRedirect } from "next/navigation";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ============================================================
// /wohngeld/antrag → /wohngeld/beantragen (seit 2026-10-16)
// ============================================================
// Diese Seite war eine Verkaufsseite mit Festpreis („Wohngeld-Antrag für
// 99 €, jetzt beauftragen", „Festpreis, keine versteckten Kosten") und
// zielte auf dasselbe Suchanliegen wie die Ratgeber-Seite
// /wohngeld/beantragen (Keyword-Konkurrenz im eigenen Auftritt).
// Wir nehmen Leistungs- und Preisversprechen nicht mehr in den Auftritt:
// die Seite leitet dauerhaft auf die inhaltlich richtige Anleitung um,
// damit bestehende Verlinkungen und Rankings nicht ins Leere laufen.

export default async function WohngeldAntragPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  permanentRedirect(localeHref(locale, "/wohngeld/beantragen"));
}
