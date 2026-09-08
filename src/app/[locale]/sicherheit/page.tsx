import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { CTASection } from "@/components/sections/CTASection";
import { IconCheck, IconLock } from "@/components/ui/icons";
import { sicherheitsPrinzipien } from "@/content/pillars";
import { dict } from "@/content/sicherheit-i18n";
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

export default async function SicherheitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <IconLock className="h-8 w-8 text-brand-800" />
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.lede}</p>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading title={t.principlesTitle} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sicherheitsPrinzipien[locale].map((p) => (
              <div key={p.title} className="rounded-3xl border border-line-soft bg-white p-5">
                <IconCheck className="h-5 w-5 text-brand-700" />
                <h3 className="font-display mt-3 text-base font-bold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <DisclaimerBox title={t.disclaimerTitle}>
            <p>{t.disclaimerText}</p>
          </DisclaimerBox>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-line-soft bg-white p-6">
            <h3 className="font-display text-lg font-bold text-ink">{t.rightsTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {t.rightsText}{" "}
              <Link href={localeHref(locale, "/datenschutz")} className="text-brand-800 underline">
                {t.rightsLink}
              </Link>
              .
            </p>
          </div>
          <div className="rounded-3xl border border-line-soft bg-white p-6">
            <h3 className="font-display text-lg font-bold text-ink">{t.controlTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.controlText}</p>
          </div>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimary}
        primaryHref={localeHref(locale, "/kontakt")}
        secondaryLabel={t.ctaSecondary}
        secondaryHref={localeHref(locale, "/datenschutz")}
      />
    </>
  );
}
