import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillarCard } from "@/components/sections/Cards";
import { VisionDiagramHeute, VisionDiagramZukunft } from "@/components/sections/VisionDiagram";
import { CTASection } from "@/components/sections/CTASection";
import { sozialePfeiler, betroffeneGruppen } from "@/content/pillars";
import { dict } from "@/content/vision-i18n";
import { LockupStacked } from "@/components/ui/Logo";
import { isLocale, defaultLocale, locales, localeHref, type Locale } from "@/i18n/config";
import {
  IconCompass,
  IconDocument,
  IconFolder,
  IconHeart,
  IconLock,
  IconSpark,
} from "@/components/ui/icons";

const pfeilerIcons = [IconSpark, IconCompass, IconFolder, IconLock, IconHeart];

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

export default async function VisionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];

  return (
    <>
      <section>
        <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
          <SectionHeading eyebrow={t.heroEyebrow} title={t.heroTitle} lede={t.heroLede} />
          <LockupStacked className="mx-auto w-52 lg:mx-0" />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t.thesisTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.thesisText}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <VisionDiagramHeute />
            <VisionDiagramZukunft />
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base font-medium text-ink">{t.diagramCaption}</p>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading eyebrow={t.lifeEventEyebrow} title={t.lifeEventTitle} lede={t.lifeEventLede} />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {t.lifeEvents.map((e) => (
              <div key={e.title} className="rounded-3xl border border-dashed border-brand-400 bg-brand-50 p-6">
                <IconDocument className="h-6 w-6 text-brand-800" />
                <h3 className="font-display mt-3 text-lg font-bold text-ink">„{e.title}“</h3>
                <ul className="mt-3 space-y-1.5">
                  {e.items.map((i) => (
                    <li key={i} className="text-sm text-ink-soft">
                      · {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-ink-soft">{t.lifeEventDisclaimer}</p>
        </Container>
      </section>

      <section className="bg-brand-950 py-20 text-cream">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">{t.socialVisionEyebrow}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">{t.socialVisionTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-200">{t.socialVisionText}</p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {betroffeneGruppen[locale].map((g) => (
              <li key={g} className="rounded-2xl border border-brand-800 bg-brand-900/60 px-4 py-3 text-sm">
                {g}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading title={t.pfeilerTitle} align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sozialePfeiler[locale].map((p, i) => {
              const Icon = pfeilerIcons[i];
              return <PillarCard key={p.title} icon={<Icon className="h-5 w-5" />} title={p.title} text={p.text} />;
            })}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="rounded-3xl border border-line-soft bg-white p-8 text-center">
            <p className="font-display text-xl font-bold text-ink sm:text-2xl">{t.missionLabel}</p>
            <p className="mx-auto mt-3 max-w-2xl text-ink-soft">{t.missionText}</p>
          </div>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimary}
        primaryHref={localeHref(locale, "/roadmap")}
        secondaryLabel={t.ctaSecondary}
        secondaryHref={localeHref(locale, "/verantwortung")}
      />
    </>
  );
}
