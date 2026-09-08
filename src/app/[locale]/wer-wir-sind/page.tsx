import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { CTASection } from "@/components/sections/CTASection";
import { MascotFull } from "@/components/ui/Logo";
import { dict } from "@/content/wer-wir-sind-i18n";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";

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

export default async function WerWirSindPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      <section>
        <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
          <SectionHeading eyebrow={t.heroEyebrow} title={t.heroTitle} lede={t.heroLede} />
          <MascotFull priority className="mx-auto w-48 sm:w-56 lg:mx-0" />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16 sm:py-20">
          <SectionHeading title={t.warumTitle} align="center" className="mx-auto" />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
            {t.warumGruende.map((g) => (
              <div key={g.title} className="rounded-3xl border border-line-soft bg-white p-6">
                <h3 className="font-display text-lg font-bold text-ink">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={t.grenzenTitle} lede={t.grenzenLede} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {t.grenzen.map((item) => (
              <div key={item.title} className="rounded-2xl border border-line-soft bg-white p-6">
                <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
          <DisclaimerBox title={t.grenzenDisclaimerTitle} className="mt-8">
            {t.grenzenDisclaimerText}
          </DisclaimerBox>
        </Container>
      </section>

      <section className="bg-cream-deep/60 py-16 sm:py-20">
        <Container>
          <SectionHeading title={t.werteTitle} align="center" className="mx-auto" />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
            {t.werte.map((w) => (
              <div key={w.title} className="rounded-3xl border border-line-soft bg-white p-6 text-center">
                <h3 className="font-display text-lg font-bold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimaryLabel}
        primaryHref={href("/hilfe-starten")}
        secondaryLabel={t.ctaSecondaryLabel}
        secondaryHref={href("/kontakt")}
      />
    </>
  );
}
