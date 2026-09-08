import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoadmapTimeline } from "@/components/sections/RoadmapTimeline";
import { CTASection } from "@/components/sections/CTASection";
import { IconArrowRight } from "@/components/ui/icons";
import { roadmapPhases, automationSteps } from "@/content/roadmap";
import { dict } from "@/content/roadmap-page-i18n";
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

export default async function RoadmapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-14">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-ink-soft">
            {t.philosophyLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {automationSteps[locale].map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className="rounded-full border border-line-soft bg-white px-4 py-2 text-sm font-medium text-ink">
                  {s}
                </span>
                {i < automationSteps[locale].length - 1 ? (
                  <IconArrowRight className="h-4 w-4 text-brand-700" />
                ) : null}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink-soft">{t.philosophyNote}</p>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <RoadmapTimeline phases={roadmapPhases[locale]} />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="rounded-3xl border border-line-soft bg-white p-6 text-sm leading-relaxed text-ink-soft sm:p-8">
            {t.disclaimer}
          </div>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimaryLabel}
        primaryHref={href("/hilfe-starten")}
        secondaryLabel={t.ctaSecondaryLabel}
        secondaryHref={href("/vision")}
      />
    </>
  );
}
