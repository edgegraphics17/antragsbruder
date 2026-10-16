// ============================================================
// /widerruf — Widerrufsbelehrung
// ============================================================
// Der Text ist gesetzlich vorgeschrieben und auf Deutsch verfasst. Deshalb
// zeigen alle Sprachfassungen dieser Seite dieselbe Belehrung, und die
// Metadaten verweisen bewusst auf die deutsche Adresse als kanonische Fassung:
// sonst würden 14 Sprachversionen mit identischem Inhalt als Dubletten
// konkurrieren. Ein Hinweis oben stellt klar, welche Fassung maßgeblich ist.

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalSection } from "@/components/ui/LegalSection";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { widerrufBlocks, widerrufIntro, widerrufProvider } from "@/content/widerruf";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  // Kanonisch ist immer die deutsche Fassung – unabhängig von der aufgerufenen
  // Sprachversion.
  return buildPageMetadata({
    locale: defaultLocale,
    path: "/widerruf",
    title: "Widerrufsbelehrung",
    description:
      "Widerrufsrecht, Widerrufsfrist und Folgen des Widerrufs für entgeltliche Leistungen " +
      "sowie das Muster-Widerrufsformular.",
  });
}

export default async function WiderrufPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  // Nicht-deutsche Aufrufe bekommen die Belehrung ebenfalls auf Deutsch, aber
  // mit einem sprachlichen Hinweis darüber.
  const showFallbackNote = locale !== defaultLocale;

  return (
    <section className="mx-3 rounded-[2rem] bg-white sm:mx-5 sm:rounded-[2.5rem]">
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-5xl text-ink">
          {showFallbackNote ? "Widerrufsbelehrung (deutsch)" : "Widerrufsbelehrung"}
        </h1>

        <p className="mt-6 text-ink-soft">{widerrufIntro}</p>

        {showFallbackNote ? (
          <p className="mt-3 rounded-xl bg-brand-50 p-4 text-sm text-ink-soft">
            Die Widerrufsbelehrung ist aus rechtlichen Gründen auf Deutsch verfasst. Maßgeblich ist
            die deutsche Fassung.
          </p>
        ) : null}

        <div className="mt-8">
          {widerrufBlocks.map((block) => (
            <LegalSection key={block.heading} title={block.heading}>
              {block.paragraphs.map((paragraph, index) => (
                <p key={index} className={index > 0 ? "mt-3" : undefined}>
                  {paragraph}
                </p>
              ))}
              {block.note ? (
                <p className="mt-4 rounded-xl bg-cream-deep p-4 text-sm text-ink-soft">
                  {block.note}
                </p>
              ) : null}
            </LegalSection>
          ))}
        </div>

        <div className="mt-10 border-t border-line-soft pt-6 text-sm text-ink-soft">
          <p>
            Anbieter: {widerrufProvider.name}, {widerrufProvider.owner}, {widerrufProvider.street},{" "}
            {widerrufProvider.zipCity}, {widerrufProvider.country}
          </p>
          <p className="mt-1">E-Mail: {widerrufProvider.email}</p>
        </div>
      </Container>
    </section>
  );
}
