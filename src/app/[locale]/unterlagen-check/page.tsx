import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { CTASection } from "@/components/sections/CTASection";
import { IconCheck, IconClose } from "@/components/ui/icons";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/unterlagen-check-i18n";

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

export default async function UnterlagenCheckPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);
  const ctaHref = href("/hilfe-starten?anliegen=unterlagen");

  return (
    <>
      <section>
        <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
          <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.heroTitle} lede={t.heroLede} />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button href={ctaHref} size="lg">
              {t.heroButtonLabel}
            </Button>
            <span className="text-sm font-semibold text-brand-700">{t.heroPrice}</span>
          </div>
          </div>
          <PhotoFrame src="/images/photos/aktenstapel.jpg" alt="" priority className="aspect-[4/3] w-full" />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
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

      <section>
        <Container className="py-20">
          <SectionHeading title={t.exampleTitle} lede={t.exampleLede} />
          <div className="mt-8 max-w-xl rounded-3xl border border-line-soft bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-700">{t.exampleCaseLabel}</p>
            <ul className="space-y-3">
              {t.exampleItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-line-soft px-4 py-3"
                >
                  <span className="text-sm font-medium text-ink">{item.label}</span>
                  {item.status === "vorhanden" ? (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      <IconCheck className="h-4 w-4" />
                      {t.exampleStatusVorhanden}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
                      <IconClose className="h-4 w-4" />
                      {t.exampleStatusFehlt}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <DisclaimerBox title={t.disclaimerTitle}>{t.disclaimerText}</DisclaimerBox>
        </Container>
      </section>

      <CTASection title={t.ctaTitle} primaryLabel={t.ctaButtonLabel} primaryHref={ctaHref} />
    </>
  );
}
