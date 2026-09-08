import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/Badge";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { CTASection } from "@/components/sections/CTASection";
import { IconSpark } from "@/components/ui/icons";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/sprachen-i18n";

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

export default async function SprachenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <IconSpark className="h-8 w-8 text-brand-800" />
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.heroLede}</p>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <StatusBadge status="jetzt" label={t.todayLabel} />
          <h2 className="font-display mt-4 text-2xl font-bold text-ink sm:text-3xl">{t.todayTitle}</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">{t.todayText}</p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <StatusBadge status="vision" label={t.visionLabel} />
          <h2 className="font-display mt-4 text-2xl font-bold text-ink sm:text-3xl">{t.visionTitle}</h2>
          <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
            {t.visionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <DisclaimerBox title={t.disclaimerTitle}>{t.disclaimerText}</DisclaimerBox>
        </Container>
      </section>

      <CTASection title={t.ctaTitle} primaryLabel={t.ctaButton} primaryHref={href("/hilfe-starten?anliegen=brief")} />
    </>
  );
}
