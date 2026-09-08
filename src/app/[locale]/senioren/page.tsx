import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";
import { IconHeart } from "@/components/ui/icons";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/senioren-i18n";

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

export default async function SeniorenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <IconHeart className="h-8 w-8 text-brand-800" />
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.heroLede}</p>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading eyebrow={t.supportEyebrow} title={t.supportTitle} />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.cards.map((card) => (
              <div key={card} className="rounded-3xl border border-line-soft bg-white p-5 text-sm text-ink-soft">
                {card}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <StatusBadge status="vision" label={t.visionLabel} />
          <h2 className="font-display mt-4 text-2xl font-bold text-ink sm:text-3xl">{t.visionTitle}</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">{t.visionText}</p>
        </Container>
      </section>

      <CTASection title={t.ctaTitle} primaryLabel={t.ctaButton} primaryHref={href("/hilfe-starten")} />
    </>
  );
}
