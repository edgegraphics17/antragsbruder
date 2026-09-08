import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { IconCheck } from "@/components/ui/icons";
import { pricingTiers } from "@/content/pricing";
import { dict } from "@/content/preise-i18n";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";

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

export default async function PreisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const tiers = pricingTiers[locale];

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
        </Container>
      </section>

      <section className="bg-cream-deep/60 pb-20">
        <Container className="grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className={`flex flex-col rounded-3xl border p-6 ${
                tier.highlight ? "border-brand-800 bg-brand-900 text-cream" : "border-line-soft bg-white"
              }`}
            >
              {tier.badge ? (
                <span className="mb-3 inline-flex w-fit rounded-full bg-cream-deep px-3 py-1 text-xs font-semibold text-ink-soft">
                  {tier.badge}
                </span>
              ) : null}
              <h3 className="font-display text-lg font-bold">{tier.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${tier.highlight ? "text-brand-100" : "text-ink-soft"}`}>
                {tier.description}
              </p>
              <p className="mt-5 text-xl font-semibold">{tier.priceLabel}</p>
              {tier.priceNote ? (
                <p className={`text-xs ${tier.highlight ? "text-brand-200" : "text-ink-soft"}`}>{tier.priceNote}</p>
              ) : null}
              <ul className="mt-5 flex-1 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <IconCheck className={`mt-0.5 h-4 w-4 shrink-0 ${tier.highlight ? "text-brand-300" : "text-brand-700"}`} />
                    <span className={tier.highlight ? "text-brand-100" : "text-ink-soft"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                href={localeHref(locale, tier.ctaHref)}
                variant={tier.highlight ? "secondary" : "outline"}
                size="md"
                className="mt-6"
              >
                {tier.ctaLabel}
              </Button>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <DisclaimerBox title={t.disclaimerTitle}>{t.disclaimerText}</DisclaimerBox>
        </Container>
      </section>
    </>
  );
}
