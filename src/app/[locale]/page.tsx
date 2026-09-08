import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/Badge";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { EntryCard, PillarCard } from "@/components/sections/Cards";
import { CTASection } from "@/components/sections/CTASection";
import {
  IconCheck,
  IconClock,
  IconCoin,
  IconCompass,
  IconDocument,
  IconFolder,
  IconHeart,
  IconLock,
  IconSpark,
  IconUsers,
} from "@/components/ui/icons";
import { warumPillars, betroffeneGruppen } from "@/content/pillars";
import { site } from "@/content/site";
import { languages } from "@/content/wohngeld-i18n";
import { dict } from "@/content/home-i18n";
import { commonDict } from "@/content/i18n/common";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";

const pillarIcons = [IconSpark, IconHeart, IconFolder, IconCompass, IconLock, IconUsers];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const href = (path: string) => localeHref(locale, path);
  const t = dict[locale];
  const nav = commonDict[locale].nav;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <StatusBadge status="jetzt" label={t.heroBadge} />
            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t.heroTitle1} <br className="hidden sm:block" />
              {t.heroTitle2}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{t.heroLede}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={href("/hilfe-starten")} size="lg">
                {t.heroCta1}
              </Button>
              <Button href={href("/so-funktionierts")} variant="secondary" size="lg">
                {t.heroCta2}
              </Button>
            </div>
            <p className="mt-6 text-xs text-ink-soft">{t.heroDisclaimer(site.name)}</p>
          </div>
          <HeroVisual />
        </Container>
      </section>

      {/* PROBLEM */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading eyebrow={t.problemEyebrow} title={t.problemTitle} lede={t.problemLede} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.problemItems.map((text) => (
              <div key={text} className="rounded-3xl border border-line-soft bg-white p-5 text-sm text-ink-soft">
                {text}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* LÖSUNG */}
      <section>
        <Container className="grid items-start gap-12 py-20 lg:grid-cols-2">
          <SectionHeading eyebrow={t.loesungEyebrow} title={t.loesungTitle} lede={t.loesungLede} />
          <ProcessFlow steps={t.loesungSteps} />
        </Container>
      </section>

      {/* EINSTIEGSMÖGLICHKEITEN */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title={t.einstiegTitle} align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <EntryCard
              icon={<IconDocument className="h-6 w-6" />}
              title={t.entryBriefTitle}
              text={t.entryBriefText}
              ctaLabel={t.entryBriefCta}
              href={href("/hilfe-starten?anliegen=brief")}
            />
            <EntryCard
              icon={<IconFolder className="h-6 w-6" />}
              title={t.entryAntragTitle}
              text={t.entryAntragText}
              ctaLabel={t.entryAntragCta}
              href={href("/hilfe-starten?anliegen=antrag")}
            />
            <EntryCard
              icon={<IconClock className="h-6 w-6" />}
              title={t.entryChaosTitle}
              text={t.entryChaosText}
              ctaLabel={t.entryChaosCta}
              href={href("/hilfe-starten?anliegen=papierkram")}
            />
          </div>
        </Container>
      </section>

      {/* WOHNGELD-RECHNER */}
      <section>
        <Container className="py-20">
          <div className="grid items-center gap-10 rounded-3xl border border-brand-700/30 bg-brand-50 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                {t.toolBadge}
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {t.wohngeldTitle}
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">{t.wohngeldText}</p>
              <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                {t.wohngeldFeatures.map((text) => (
                  <li key={text} className="flex items-start gap-2">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={href("/wohngeldrechner")} size="lg">
                  {t.wohngeldCta}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
              <IconCoin className="h-8 w-8 text-brand-700" />
              <p className="mt-4 text-sm font-semibold text-ink-soft">{t.wohngeldCardLabel}</p>
              <p className="font-display mt-1 text-5xl font-extrabold tracking-tight text-ink">
                {t.wohngeldAmount} <span className="text-lg font-semibold text-ink-soft">{t.wohngeldUnit}</span>
              </p>
              <p className="mt-2 text-xs text-ink-soft">{t.wohngeldCaption}</p>
              <div className="mt-6 border-t border-line-soft pt-5">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {t.availableLanguages}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((l) => (
                    <span
                      key={l.code}
                      className="rounded-full border border-line bg-cream px-2.5 py-1 text-xs font-medium text-ink"
                    >
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* GRUNDSICHERUNGSGELD-RECHNER */}
      <section>
        <Container className="py-20">
          <div className="grid items-center gap-10 rounded-3xl border border-brand-700/30 bg-brand-50 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                {t.toolBadge}
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {t.grundsicherungTitle}
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">{t.grundsicherungText}</p>
              <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                {t.grundsicherungFeatures.map((text) => (
                  <li key={text} className="flex items-start gap-2">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={href("/grundsicherungsrechner")} size="lg">
                  {t.grundsicherungCta}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-line-soft bg-white p-6 sm:p-8">
              <IconCoin className="h-8 w-8 text-brand-700" />
              <p className="mt-4 text-sm font-semibold text-ink-soft">{t.grundsicherungCardLabel}</p>
              <p className="font-display mt-1 text-5xl font-extrabold tracking-tight text-ink">
                {t.grundsicherungAmount}{" "}
                <span className="text-lg font-semibold text-ink-soft">{t.grundsicherungUnit}</span>
              </p>
              <p className="mt-2 text-xs text-ink-soft">{t.grundsicherungCaption}</p>
              <div className="mt-6 border-t border-line-soft pt-5">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {t.availableLanguages}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((l) => (
                    <span
                      key={l.code}
                      className="rounded-full border border-line bg-cream px-2.5 py-1 text-xs font-medium text-ink"
                    >
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* BEISPIELABLAUF */}
      <section>
        <Container className="py-20">
          <SectionHeading eyebrow={t.beispielEyebrow} title={t.beispielTitle} lede={t.beispielLede} />
          <div className="mt-10 max-w-xl">
            <ProcessFlow steps={t.beispielSteps} />
          </div>
        </Container>
      </section>

      {/* WARUM ANTRAGSBRUDER */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title={t.warumTitle} align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {warumPillars[locale].map((p, i) => {
              const Icon = pillarIcons[i];
              return <PillarCard key={p.title} icon={<Icon className="h-5 w-5" />} title={p.title} text={p.text} />;
            })}
          </div>
        </Container>
      </section>

      {/* VISION TEASER */}
      <section>
        <Container className="grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <StatusBadge status="vision" label={nav.visionMain} />
            <h2 className="font-display mt-4 text-3xl font-bold text-ink sm:text-4xl">{t.visionTeaserTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t.visionTeaserText}</p>
            <Button href={href("/vision")} variant="outline" size="lg" className="mt-6">
              {t.visionTeaserCta}
            </Button>
          </div>
          <div className="rounded-3xl border border-brand-700/40 bg-brand-50 p-8">
            <IconCompass className="h-8 w-8 text-brand-800" />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{t.visionTeaserBoxText}</p>
          </div>
        </Container>
      </section>

      {/* SOZIALE MISSION */}
      <section className="bg-brand-950">
        <Container className="grid items-center gap-10 py-20 text-cream lg:grid-cols-2">
          <div>
            <IconHeart className="h-8 w-8 text-brand-300" />
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">{t.missionTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-200">{t.missionText}</p>
            <Button
              href={href("/verantwortung")}
              variant="outline"
              size="lg"
              className="mt-6 border-brand-400 text-cream hover:bg-brand-800"
            >
              {t.missionCta}
            </Button>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {betroffeneGruppen[locale].map((g) => (
              <li key={g} className="rounded-2xl border border-brand-800 bg-brand-900/60 px-4 py-3 text-sm">
                {g}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FINAL CTA */}
      <CTASection
        title={t.finalCtaTitle}
        text={t.finalCtaText}
        primaryLabel={t.finalCtaPrimary}
        primaryHref={href("/hilfe-starten")}
        secondaryLabel={t.finalCtaSecondary}
        secondaryHref={href("/so-funktionierts")}
      />
    </>
  );
}
