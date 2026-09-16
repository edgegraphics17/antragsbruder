import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { LegalSection } from "@/components/ui/LegalSection";
import { legalPlaceholder, site } from "@/content/site";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/impressum-i18n";

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
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];

  return (
    <section>
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">{t.pageTitle}</h1>
        <p className="mt-4 text-sm text-ink-soft">{t.subtitle}</p>

        <DisclaimerBox title={t.placeholderTitle} className="mt-8">
          {t.placeholderText}
        </DisclaimerBox>

        <div className="mt-8">
          <LegalSection title={t.anbieterHeading}>
            <p>{legalPlaceholder.companyName}</p>
            <p>{legalPlaceholder.street}</p>
            <p>{legalPlaceholder.zipCity}</p>
          </LegalSection>

          <LegalSection title={t.vertretenDurchHeading}>
            <p>{legalPlaceholder.owner}</p>
          </LegalSection>

          <LegalSection title={t.kontaktHeading}>
            <p>
              {t.phoneLabel} {legalPlaceholder.phone}
            </p>
            <p>
              {t.emailLabel}{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-brand-800 underline">
                {site.contactEmail}
              </a>
            </p>
          </LegalSection>

          <LegalSection title={t.registerHeading}>
            <p>{legalPlaceholder.register}</p>
          </LegalSection>

          <LegalSection title={t.vatHeading}>
            <p>{legalPlaceholder.vatId}</p>
          </LegalSection>

          <LegalSection title={t.responsibleHeading}>
            <p>{legalPlaceholder.owner}</p>
            <p>{legalPlaceholder.street}</p>
            <p>{legalPlaceholder.zipCity}</p>
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
