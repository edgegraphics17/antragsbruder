import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { CTASection } from "@/components/sections/CTASection";
import { IconCheck } from "@/components/ui/icons";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/so-funktionierts-i18n";

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

export default async function SoFunktioniertsPage({ params }: { params: Promise<{ locale: string }> }) {
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.steps.map((s, i) => (
              <div key={s.title} className="rounded-3xl border border-line-soft bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-sm font-semibold text-cream">
                  {i + 1}
                </span>
                <h3 className="font-display mt-4 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 py-20 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t.approachEyebrow} title={t.approachTitle} lede={t.approachLede} />
            <ul className="mt-6 space-y-3">
              {t.approachBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-ink-soft">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <DisclaimerBox title={t.disclaimerTitle}>
            <p>{t.disclaimerText}</p>
          </DisclaimerBox>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimaryLabel}
        primaryHref={href("/hilfe-starten")}
        secondaryLabel={t.ctaSecondaryLabel}
        secondaryHref={href("/preise")}
      />
    </>
  );
}
