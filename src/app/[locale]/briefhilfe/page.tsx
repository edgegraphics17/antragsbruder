import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { LetterMockup } from "@/components/sections/LetterMockup";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { CTASection } from "@/components/sections/CTASection";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/briefhilfe-i18n";

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

export default async function BriefhilfePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.heroTitle} lede={t.heroLede} />
          <div className="mt-6">
            <Button href={href("/hilfe-starten?anliegen=brief")} size="lg">
              {t.uploadButtonLabel}
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <LetterMockup />
        </Container>
      </section>

      <section>
        <Container className="grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <SectionHeading title={t.whatWeShowTitle} />
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
              {t.whatWeShowItems.map((item) => (
                <li key={item.bold}>
                  <strong className="text-ink">{item.bold}</strong> – {item.rest}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={t.howItWorksTitle} />
            <div className="mt-6">
              <ProcessFlow steps={t.processSteps} />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <DisclaimerBox title={t.disclaimerTitle}>{t.disclaimerText}</DisclaimerBox>
        </Container>
      </section>

      <CTASection title={t.ctaTitle} primaryLabel={t.ctaButtonLabel} primaryHref={href("/hilfe-starten?anliegen=brief")} />
    </>
  );
}
