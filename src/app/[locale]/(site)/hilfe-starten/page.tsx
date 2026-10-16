import { permanentRedirect } from "next/navigation";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ============================================================
// "HILFE STARTEN" → KONTAKT-FUNNEL (seit 2026-10-16)
// ============================================================
// Der frühere Selbstbedienungs-Flow ist weg. Diese Route bleibt bestehen,
// weil sie in vielen Texten und in Altdokumenten verlinkt ist, und leitet
// auf den Kontakt-Funnel um. Wichtig: Der Parameter `?anliegen=…` wird
// mitgenommen, damit der Bereich im Funnel vorausgewählt ist.

export default async function HilfeStartenPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ anliegen?: string }>;
}) {
  const [{ locale: raw }, sp] = await Promise.all([params, searchParams]);
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const target = localeHref(locale, "/kontakt");
  const query = sp.anliegen ? `?anliegen=${encodeURIComponent(sp.anliegen)}` : "";
  permanentRedirect(`${target}${query}`);
}
