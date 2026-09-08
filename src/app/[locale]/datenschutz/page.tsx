import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { LegalSection } from "@/components/ui/LegalSection";
import { legalPlaceholder, site } from "@/content/site";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";
import { dict } from "@/content/datenschutz-i18n";

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
  return { title: t.metaTitle, description: t.metaDescription(site.name) };
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];

  return (
    <section>
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">{t.pageTitle}</h1>

        <DisclaimerBox title={t.noticeTitle} className="mt-8">
          {t.noticeText(site.name)}
        </DisclaimerBox>

        <div className="mt-8">
          <LegalSection title={t.section1Heading}>
            <p>{legalPlaceholder.companyName}</p>
            <p>{legalPlaceholder.street}</p>
            <p>{legalPlaceholder.zipCity}</p>
            <p>
              {t.emailLabel}{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-brand-800 underline">
                {site.contactEmail}
              </a>
            </p>
          </LegalSection>

          <LegalSection title={t.section2Heading}>
            <p>{t.section2Text}</p>
          </LegalSection>

          <LegalSection title={t.section3Heading}>
            <ul className="list-disc space-y-1 pl-5">
              {t.section3Items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title={t.section4Heading}>
            <p>{t.section4Text}</p>
          </LegalSection>

          <LegalSection title={t.section5Heading}>
            <p>{t.section5Text}</p>
          </LegalSection>

          <LegalSection title={t.section6Heading}>
            <p>{t.section6Text}</p>
          </LegalSection>

          <LegalSection title={t.section7Heading}>
            <p>
              {t.section7TextBefore}{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-brand-800 underline">
                {site.contactEmail}
              </a>
              {t.section7TextAfter}
            </p>
          </LegalSection>

          <LegalSection title={t.section8Heading}>
            <p>{t.section8Text}</p>
          </LegalSection>

          <LegalSection title={t.section9Heading}>
            <p>
              {t.section9TextBefore}{" "}
              <Link href={localeHref(locale, "/wer-wir-sind")} className="text-brand-800 underline">
                {t.section9LinkText}
              </Link>
              {t.section9TextAfter}
            </p>
          </LegalSection>

          <LegalSection title={t.section10Heading}>
            <p>{t.section10Text}</p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}
