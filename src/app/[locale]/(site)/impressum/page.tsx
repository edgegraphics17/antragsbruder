import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalSection } from "@/components/ui/LegalSection";
import { legal, site } from "@/content/site";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/impressum-i18n";
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
  const t = dict[locale];
  return buildPageMetadata({ locale, path: "/impressum", title: t.metaTitle, description: t.metaDescription });
}

// Impressum nach § 5 DDG. Hinweise zur Vollständigkeit:
// - Telefon: nicht Pflicht, sofern eine schnelle elektronische Kontaktaufnahme
//   über die E-Mail-Adresse möglich ist (§ 5 Abs. 1 Nr. 2 DDG).
// - Registergericht: ein Einzelunternehmen ohne kaufmännische Einrichtung ist
//   nicht handelsregisterpflichtig – daher kein Registereintrag angegeben.
// - USt-IdNr.: nur anzugeben, wenn vorhanden – hier nicht vorhanden.
export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];

  return (
    <section>
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">{t.pageTitle}</h1>
        <p className="mt-4 text-sm text-ink-soft">{t.subtitle}</p>

        <div className="mt-8">
          <LegalSection title={t.anbieterHeading}>
            <p>{legal.companyName}</p>
            <p>{legal.owner}</p>
            <p>{legal.street}</p>
            <p>{legal.zipCity}</p>
            <p>{legal.country}</p>
          </LegalSection>

          <LegalSection title={t.vertretenDurchHeading}>
            <p>{legal.owner}</p>
          </LegalSection>

          <LegalSection title={t.kontaktHeading}>
            <p>
              {t.emailLabel}{" "}
              <a href={`mailto:${legal.email}`} className="text-brand-800 underline">
                {legal.email}
              </a>
            </p>
          </LegalSection>

          <LegalSection title={t.responsibleHeading}>
            <p>{legal.owner}</p>
            <p>{legal.street}</p>
            <p>{legal.zipCity}</p>
          </LegalSection>

          <LegalSection title={t.disputeHeading}>
            <p>
              {t.disputeTextBefore}{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
                className="text-brand-800 underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              {t.disputeTextAfter}
            </p>
          </LegalSection>

          <LegalSection title={t.consumerDisputeHeading}>
            <p>{t.consumerDisputeText(site.name)}</p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}
