import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TranslationBanner } from "@/components/layout/TranslationBanner";

// Website-Layout: Navbar, TranslationBanner und Footer nur für die
// Marketing-/Informationsseiten — nicht für das Dashboard.
// (Locale-Validierung passiert im Root-Layout unter [locale].)
// Guard: notFound()-Renders (z. B. /favicon.ico, unbekannte Pfade) laufen
// durch dieses Layout mit einem ungültigen locale-Parameter — ohne Guard
// wäre commonDict[locale] undefined und die Navbar crasht mit
// „reading 'nav'". Dann käme ein 500 statt 404.
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : defaultLocale) as Locale;

  return (
    <>
      <Navbar locale={locale} />
      <TranslationBanner locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
