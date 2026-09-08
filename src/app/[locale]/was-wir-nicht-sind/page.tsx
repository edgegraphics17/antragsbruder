import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { wasWirNichtSind } from "@/content/pillars";
import { dict } from "@/content/was-wir-nicht-sind-i18n";
import { isLocale, defaultLocale, locales, localeHref, type Locale } from "@/i18n/config";

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

export default async function WasWirNichtSindPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <div className="grid gap-5 sm:grid-cols-2">
            {wasWirNichtSind[locale].map((w) => (
              <div key={w.title} className="rounded-3xl border border-line-soft bg-white p-6">
                <h3 className="font-display text-lg font-bold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-2xl">
          <p className="text-lg leading-relaxed text-ink-soft">{t.bodyText}</p>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimary}
        primaryHref={localeHref(locale, "/faq")}
        secondaryLabel={t.ctaSecondary}
        secondaryHref={localeHref(locale, "/kontakt")}
      />
    </>
  );
}
