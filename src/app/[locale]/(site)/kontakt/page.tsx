import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnliegenFunnel } from "@/components/sections/AnliegenFunnel";
import { IconBuilding, IconMail, IconSpark } from "@/components/ui/icons";
import { site } from "@/content/site";
import { dict } from "@/content/kontakt-i18n";
import { funnelDict } from "@/content/funnel-i18n";
import { areaFromParam } from "@/content/funnel";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";

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
  const t = funnelDict[locale];
  return buildPageMetadata({
    locale,
    path: "/kontakt",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

/**
 * Kontaktseite = Einstieg in den Anliegen-Funnel.
 *
 * Seit dem Umbau (Oktober 2026) gibt es hier keine Leistungsliste und keine
 * Preise mehr. Besucherinnen und Besucher schildern ihr Anliegen in drei
 * Schritten; wir melden uns mit einer Einschätzung, ob und wie wir
 * unterstützen können. Übernommen wird nur nach individueller Absprache
 * (Aufwand und Kosten vorher geklärt) – siehe AGB § 3 und § 4.
 */
export default async function KontaktPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ anliegen?: string; thema?: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const sp = await searchParams;

  // Vorbelegung aus Altlinks: /kontakt?anliegen=antrag und
  // /kontakt?thema=unternehmen führen in den passenden Bereich.
  const defaultArea = areaFromParam(sp.anliegen) ?? (sp.thema === "unternehmen" ? "unternehmen" : null);

  return (
    <section className="mx-3 rounded-[2rem] bg-white sm:mx-5 sm:rounded-[2.5rem]">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            as="h1"
            eyebrow={funnelDict[locale].eyebrow}
            title={funnelDict[locale].title}
            lede={funnelDict[locale].lede}
          />

          <div className="mt-8 flex items-start gap-3 rounded-3xl border border-brand-700/30 bg-brand-50 p-5">
            <IconMail className="h-5 w-5 shrink-0 text-brand-800" />
            <div className="text-sm text-ink-soft">
              <p className="font-medium text-ink">{t.directEmailLabel}</p>
              <a href={`mailto:${site.contactEmail}`} className="underline hover:text-brand-800">
                {site.contactEmail}
              </a>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-3xl border border-line-soft bg-cream p-5">
            <IconSpark className="h-5 w-5 shrink-0 text-brand-800" />
            <div className="text-sm text-ink-soft">
              <p className="font-medium text-ink">{t.noPricesTitle}</p>
              <p>{t.noPricesText}</p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-3xl border border-line-soft bg-cream p-5">
            <IconBuilding className="h-5 w-5 shrink-0 text-brand-800" />
            <div className="text-sm text-ink-soft">
              <p className="font-medium text-ink">{t.b2bTitle}</p>
              <p>{t.b2bText}</p>
              <Link
                href={localeHref(locale, "/fuer-unternehmen")}
                className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
              >
                {t.b2bLink}
              </Link>
            </div>
          </div>
        </div>

        <AnliegenFunnel locale={locale} defaultArea={defaultArea} />
      </Container>
    </section>
  );
}
