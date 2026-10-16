// ============================================================
// Metadaten für die Leistungsdatenbank
// ============================================================
// Die Seite selbst ist eine Client-Komponente ("use client") und kann deshalb
// kein generateMetadata exportieren. Bis hierher erbten ihre 9 Sprachversionen
// Titel und Canonical der Startseite und hatten kein Vorschaubild. Ein Layout
// darf Metadaten liefern – die Detailseiten ([id]) setzen weiterhin ihre
// eigenen und überschreiben diese.

import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getAllBenefits } from "./data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const count = getAllBenefits().length;

  return buildPageMetadata({
    locale,
    path: "/datenbank",
    title: `Leistungsdatenbank: ${count} Sozialleistungen im Überblick`,
    description:
      `Durchsuchbare Übersicht über ${count} Sozialleistungen in Deutschland: ` +
      "Voraussetzungen, Höhe, zuständige Stelle, benötigte Unterlagen und " +
      "Rechtsgrundlage – jede Angabe mit Quelle.",
  });
}

export default function DatenbankLayout({ children }: { children: React.ReactNode }) {
  return children;
}
