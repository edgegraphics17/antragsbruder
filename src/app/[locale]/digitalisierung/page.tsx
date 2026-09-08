import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";
import { IconFolder, IconLock, IconUsers } from "@/components/ui/icons";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/digitalisierung-i18n";

const visionIcons = [IconLock, IconFolder, IconUsers, IconFolder, IconFolder, IconFolder];

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

export default async function DigitalisierungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.heroTitle} lede={t.heroLede} />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <StatusBadge status="jetzt" label={t.statusJetztLabel} />
          <h2 className="font-display mt-4 text-2xl font-bold text-ink sm:text-3xl">{t.heuteTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.heute.map((item) => (
              <div key={item} className="rounded-3xl border border-line-soft bg-white p-5 text-sm text-ink-soft">
                {item}
              </div>
            ))}
          </div>
          <Button href={href("/hilfe-starten?anliegen=papierkram")} size="lg" className="mt-8">
            {t.heuteButtonLabel}
          </Button>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <StatusBadge status="vision" label={t.statusVisionLabel} />
          <h2 className="font-display mt-4 text-2xl font-bold text-ink sm:text-3xl">{t.visionTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-soft">{t.visionLede}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.vision.map((v, i) => {
              const Icon = visionIcons[i];
              return (
                <div key={v.title} className="rounded-3xl border border-dashed border-brand-400 bg-brand-50 p-6">
                  <Icon className="h-6 w-6 text-brand-800" />
                  <h3 className="font-display mt-3 text-base font-bold text-ink">{v.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{v.text}</p>
                  <StatusBadge status="vision" label={t.statusVisionLabel} className="mt-4" />
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimaryLabel}
        primaryHref={href("/hilfe-starten?anliegen=papierkram")}
        secondaryLabel={t.ctaSecondaryLabel}
        secondaryHref={href("/roadmap")}
      />
    </>
  );
}
