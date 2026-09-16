import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { IconCheck, IconCoin, IconDocument, IconShield } from "@/components/ui/icons";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { antragDict } from "@/content/wohngeld-antrag-i18n";
import { dict as calculatorDict } from "@/content/wohngeld-i18n";

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
  const t = antragDict[locale];
  return { title: t.title, description: t.lede };
}

const trustIcons = [IconShield, IconCoin, IconDocument];

export default async function WohngeldAntragPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ betrag?: string; haushalt?: string; miete?: string; einkommen?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = antragDict[locale];
  const tc = calculatorDict[locale];
  const sp = await searchParams;

  const hasSummary = Boolean(sp.betrag || sp.haushalt || sp.miete || sp.einkommen);

  const summaryHref = `/hilfe-starten?anliegen=wohngeld${
    hasSummary
      ? `&details=${encodeURIComponent(
          `Wohngeld-Rechner: ca. ${sp.betrag ?? "?"} €/Monat, Haushaltsgröße ${sp.haushalt ?? "?"}, Miete ${
            sp.miete ?? "?"
          } €, Einkommen ${sp.einkommen ?? "?"} €.`
        )}`
      : ""
  }`;
  const ctaHref = localeHref(locale, summaryHref);
  const calculatorHref = localeHref(locale, "/wohngeldrechner");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-cream">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:py-24">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
              {t.eyebrow}
            </span>
            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{t.lede}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={ctaHref} size="lg">
                {t.ctaPrimary}
              </Button>
              <Button href={calculatorHref} variant="secondary" size="lg">
                {t.ctaSecondary}
              </Button>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {t.trust.map((item, i) => {
                const Icon = trustIcons[i % trustIcons.length];
                return (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-3xl border border-line-soft bg-white p-6 shadow-lg shadow-brand-950/5 sm:p-8">
            {hasSummary ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{t.summaryTitle}</p>
                <p className="font-display mt-2 text-4xl font-extrabold tracking-tight text-ink">
                  {sp.betrag ?? "–"} <span className="text-base font-semibold text-ink-soft">{tc.perMonth}</span>
                </p>
                <dl className="mt-5 space-y-2.5 border-t border-line-soft pt-5 text-sm">
                  {sp.haushalt ? (
                    <div className="flex justify-between">
                      <dt className="text-ink-soft">{tc.detailHousehold}</dt>
                      <dd className="font-semibold text-ink">{sp.haushalt}</dd>
                    </div>
                  ) : null}
                  {sp.miete ? (
                    <div className="flex justify-between">
                      <dt className="text-ink-soft">{tc.detailRent}</dt>
                      <dd className="font-semibold text-ink">{sp.miete} €</dd>
                    </div>
                  ) : null}
                  {sp.einkommen ? (
                    <div className="flex justify-between">
                      <dt className="text-ink-soft">{tc.detailIncome}</dt>
                      <dd className="font-semibold text-ink">{sp.einkommen} €</dd>
                    </div>
                  ) : null}
                </dl>
              </>
            ) : (
              <>
                <IconCoin className="h-8 w-8 text-brand-700" />
                <p className="mt-4 text-sm font-semibold text-ink-soft">{t.pricingCardTitle}</p>
              </>
            )}
            <div className="mt-6 border-t border-line-soft pt-6">
              <p className="font-display text-3xl font-extrabold text-ink">{t.priceLabel}</p>
              <p className="mt-1 text-xs text-ink-soft">{t.priceNote}</p>
              <Button href={ctaHref} size="lg" className="mt-5 w-full">
                {t.pricingCardCta}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* INCLUDED */}
      <section>
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">{t.includedTitle}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.includedLede}</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-line-soft bg-white p-4 sm:p-5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                  <IconCheck className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-ink sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CHECKLIST */}
      <section className="bg-cream-deep/60">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">{t.checklistTitle}</p>
              <p className="text-lg leading-relaxed text-ink-soft">{t.checklistLede}</p>
            </div>
            <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
              <ul className="space-y-3">
                {t.checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-line-soft/70 pb-3 text-sm text-ink last:border-0 last:pb-0 sm:text-base">
                    <IconDocument className="h-5 w-5 shrink-0 text-brand-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section>
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">{t.processTitle}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.processLede}</h2>
          </div>
          <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {t.process.map((step, i) => (
              <li key={step.title} className="relative rounded-3xl border border-line-soft bg-white p-6">
                <span className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-base font-bold text-cream">
                  {i + 1}
                </span>
                <p className="mt-4 font-display text-lg font-bold text-ink">{step.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-cream-deep/60">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.faqTitle}</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl">
            <FaqAccordion items={t.faq.map((f) => ({ question: f.q, answer: f.a }))} />
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <CTASection title={t.finalCtaTitle} text={t.finalCtaText} primaryLabel={t.finalCtaButton} primaryHref={ctaHref} />

      <Container className="py-10">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-ink-soft">{t.disclaimer}</p>
      </Container>
    </>
  );
}
