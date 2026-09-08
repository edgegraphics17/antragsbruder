import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { LegalSection } from "@/components/ui/LegalSection";
import { legalPlaceholder, site } from "@/content/site";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";
import { dict } from "@/content/agb-i18n";

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

export default async function AgbPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];

  return (
    <section>
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">{t.pageTitle}</h1>

        <DisclaimerBox title={t.noticeTitle} className="mt-8">
          {t.noticeText}
        </DisclaimerBox>

        <div className="mt-8">
          <LegalSection title={t.s1Heading}>
            <p>{t.s1Text(legalPlaceholder.companyName, site.name)}</p>
          </LegalSection>

          <LegalSection title={t.s2Heading}>
            <p>{t.s2Text(site.name)}</p>
          </LegalSection>

          <LegalSection title={t.s3Heading}>
            <p>{t.s3Text(site.name)}</p>
          </LegalSection>

          <LegalSection title={t.s4Heading}>
            <p>
              {t.s4TextBefore}{" "}
              <Link href={localeHref(locale, "/preise")} className="text-brand-800 underline">
                {t.s4LinkText}
              </Link>
              {t.s4TextAfter}
            </p>
          </LegalSection>

          <LegalSection title={t.s5Heading}>
            <p>{t.s5Text(site.name)}</p>
          </LegalSection>

          <LegalSection title={t.s6Heading}>
            <p>
              {t.s6TextBefore(site.name)}{" "}
              <Link href={localeHref(locale, "/was-wir-nicht-sind")} className="text-brand-800 underline">
                {t.s6LinkText}
              </Link>
              {t.s6TextAfter}
            </p>
          </LegalSection>

          <LegalSection title={t.s7Heading}>
            <p>{t.s7Text}</p>
          </LegalSection>

          <LegalSection title={t.s8Heading}>
            <p>{t.s8Text(site.name)}</p>
          </LegalSection>

          <LegalSection title={t.s9Heading}>
            <p>
              {t.s9TextBefore}{" "}
              <Link href={localeHref(locale, "/datenschutz")} className="text-brand-800 underline">
                {t.s9LinkText}
              </Link>
              {t.s9TextAfter}
            </p>
          </LegalSection>

          <LegalSection title={t.s10Heading}>
            <p>{t.s10Text}</p>
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}
