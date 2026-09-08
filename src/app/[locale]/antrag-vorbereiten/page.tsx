import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { CTASection } from "@/components/sections/CTASection";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/antrag-vorbereiten-i18n";

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

export default async function AntragVorbereitenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.heroTitle} lede={t.heroLede} />
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-700">{t.priceLabel}</p>
          <div className="mt-6">
            <Button href={href("/hilfe-starten?anliegen=antrag")} size="lg">
              {t.startButtonLabel}
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading title={t.bereicheTitle} />
          <div className="mt-8 flex flex-wrap gap-3">
            {t.bereiche.map((b) => (
              <span
                key={b}
                className="rounded-full border border-line-soft bg-white px-4 py-2 text-sm font-medium text-ink"
              >
                {b}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-ink-soft">{t.bereicheNote}</p>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading title={t.whatWeDoTitle} />
          <ul className="mt-8 space-y-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            {t.whatWeDoItems.map((item, i) => (
              <li key={item.bold} className="flex items-start gap-4 rounded-3xl border border-line-soft bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-900 text-sm font-semibold text-cream">
                  {i + 1}
                </span>
                <p>
                  <strong className="text-ink">{item.bold}</strong> {item.rest}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title={t.beispielTitle} lede={t.beispielIntro} />
          <div className="mt-8 max-w-2xl">
            <ProcessFlow steps={t.beispielSteps} />
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <DisclaimerBox title={t.disclaimerTitle}>
            <p>{t.disclaimerText}</p>
          </DisclaimerBox>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimaryLabel}
        primaryHref={href("/hilfe-starten?anliegen=antrag")}
        secondaryLabel={t.ctaSecondaryLabel}
        secondaryHref={href("/preise")}
      />
    </>
  );
}
