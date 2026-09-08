import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/ansprueche-checken-i18n";
import AnspruecheCheckenClient from "./AnspruecheCheckenClient";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return <AnspruecheCheckenClient locale={locale} dict={dict[locale]} />;
}
