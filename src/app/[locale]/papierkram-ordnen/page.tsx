import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { CTASection } from "@/components/sections/CTASection";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/papierkram-ordnen-i18n";

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

export default async function PapierkramOrdnenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.heroTitle} lede={t.heroLede} />
          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button href={href("/hilfe-starten?anliegen=papierkram")} size="lg">
              {t.heroButtonLabel}
            </Button>
            <span className="text-lg font-semibold text-brand-800">{t.priceLabel}</span>
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading title={t.whatWeDoTitle} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.whatWeDoItems.map((item) => (
              <div key={item.title} className="rounded-3xl border border-line-soft bg-white p-6">
                <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading title={t.processTitle} />
          <div className="mt-8 max-w-xl">
            <ProcessFlow steps={t.processSteps} />
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading title={t.exampleTitle} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-line-soft bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                {t.exampleBeforeLabel}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.exampleBefore}</p>
            </div>
            <div className="rounded-3xl border border-brand-400 bg-brand-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-800">
                {t.exampleAfterLabel}
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {t.exampleAfterCategories.map((category) => (
                  <li
                    key={category}
                    className="rounded-full bg-white px-3 py-1.5 text-center text-sm font-medium text-ink"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <DisclaimerBox title={t.disclaimerTitle}>{t.disclaimerText}</DisclaimerBox>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimaryLabel}
        primaryHref={href("/hilfe-starten?anliegen=papierkram")}
      />
    </>
  );
}
