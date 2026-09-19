import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/ansprueche-checken-i18n";

// Die Seite selbst ist eine Client-Komponente; die Metadaten liefert daher
// dieses Segment-Layout (generateMetadata funktioniert nur in Server-Komponenten).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  return buildPageMetadata({
    locale,
    path: "/ansprueche-checken",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function AnspruecheCheckenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
