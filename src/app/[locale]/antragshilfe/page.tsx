import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { CTASection } from "@/components/sections/CTASection";
import { IconCheck } from "@/components/ui/icons";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/antragshilfe-i18n";

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

export default async function AntragshilfePage({ params }: { params: Promise<{ locale: string }> }) {
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
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.whatWeDoItems.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-3xl border border-line-soft bg-white p-5">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                <p className="text-sm text-ink-soft">{item}</p>
              </div>
            ))}
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
        secondaryHref={href("/services")}
      />
    </>
  );
}
