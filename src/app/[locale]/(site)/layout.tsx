import type { Locale } from "@/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TranslationBanner } from "@/components/layout/TranslationBanner";

// Website-Layout: Navbar, TranslationBanner und Footer nur für die
// Marketing-/Informationsseiten — nicht für das Dashboard.
// (Locale-Validierung passiert im Root-Layout unter [locale].)
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Navbar locale={locale as Locale} />
      <TranslationBanner locale={locale as Locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale as Locale} />
    </>
  );
}
