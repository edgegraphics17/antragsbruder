import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/Badge";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { EntryCard, PillarCard } from "@/components/sections/Cards";
import { CTASection } from "@/components/sections/CTASection";
import { IconClock, IconCoin, IconDocument, IconFolder, IconMail, IconSpark, IconCompass } from "@/components/ui/icons";
import { warumPillars } from "@/content/pillars";
import { site } from "@/content/site";
import { languages } from "@/content/wohngeld-i18n";
import { dict } from "@/content/home-i18n";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";

const pillarIcons = [IconSpark, IconFolder, IconMail];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const href = (path: string) => localeHref(locale, path);
  const t = dict[locale];

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
          <HeroVisual locale={locale} />
        </Container>
      </section>

      {/* EINSTIEG */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title={t.einstiegTitle} align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            <EntryCard
              icon={<IconCompass className="h-6 w-6" />}
              title={t.entryAnspruecheTitle}
              text={t.entryAnspruecheText}
              ctaLabel={t.entryAnspruecheCta}
              href={href("/ansprueche-checken")}
            />
          </div>
        </Container>
      </section>

      {/* RECHNER (zusammengeführt) */}
      <section>
        <Container className="py-20">
          <SectionHeading eyebrow={t.rechnerEyebrow} title={t.rechnerTitle} lede={t.rechnerLede} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-brand-700/30 bg-brand-50 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  {t.toolBadge}
                </span>
                <span className="text-xs text-ink-soft">Beispielrechnung</span>
              </div>
              <h3 className="font-display mt-4 text-xl font-bold text-ink">{t.wohngeldTitle}</h3>
              <div className="mt-4 flex items-end gap-2">
                <IconCoin className="mb-1 h-6 w-6 shrink-0 text-brand-700" />
                <p className="font-display text-3xl font-extrabold tracking-tight text-ink">
                  {t.wohngeldAmount} <span className="text-sm font-semibold text-ink-soft">{t.wohngeldUnit}</span>
                </p>
              </div>
              <p className="mt-1 text-xs text-ink-soft">{t.wohngeldCaption}</p>
              <Button href={href("/wohngeldrechner")} size="md" className="mt-6">
                {t.wohngeldCta}
              </Button>
            </div>

            <div className="rounded-3xl border border-brand-700/30 bg-brand-50 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  {t.toolBadge}
                </span>
                <span className="text-xs text-ink-soft">Beispielrechnung</span>
              </div>
              <h3 className="font-display mt-4 text-xl font-bold text-ink">{t.grundsicherungTitle}</h3>
              <div className="mt-4 flex items-end gap-2">
                <IconCoin className="mb-1 h-6 w-6 shrink-0 text-brand-700" />
                <p className="font-display text-3xl font-extrabold tracking-tight text-ink">
                  {t.grundsicherungAmount}{" "}
                  <span className="text-sm font-semibold text-ink-soft">{t.grundsicherungUnit}</span>
                </p>
              </div>
              <p className="mt-1 text-xs text-ink-soft">{t.grundsicherungCaption}</p>
              <Button href={href("/grundsicherungsrechner")} size="md" className="mt-6">
                {t.grundsicherungCta}
              </Button>
            </div>

            <div className="rounded-3xl border border-brand-700/30 bg-brand-50 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  {t.toolBadge}
                </span>
                <span className="text-xs text-ink-soft">Beispielrechnung</span>
              </div>
              <h3 className="font-display mt-4 text-xl font-bold text-ink">{t.bafoegTitle}</h3>
              <div className="mt-4 flex items-end gap-2">
                <IconCoin className="mb-1 h-6 w-6 shrink-0 text-brand-700" />
                <p className="font-display text-3xl font-extrabold tracking-tight text-ink">
                  {t.bafoegAmount} <span className="text-sm font-semibold text-ink-soft">{t.bafoegUnit}</span>
                </p>
              </div>
              <p className="mt-1 text-xs text-ink-soft">{t.bafoegCaption}</p>
              <Button href={href("/bafoegrechner")} size="md" className="mt-6">
                {t.bafoegCta}
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
            <span className="font-semibold uppercase tracking-wide">{t.availableLanguages}:</span>
            {languages.map((l) => (
              <span key={l.code} className="rounded-full border border-line bg-cream px-2.5 py-1 font-medium text-ink">
                {l.label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* WARUM ANTRAGSBRUDER */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title={t.warumTitle} align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {warumPillars[locale].map((p, i) => {
              const Icon = pillarIcons[i];
              return <PillarCard key={p.title} icon={<Icon className="h-5 w-5" />} title={p.title} text={p.text} />;
            })}
          </div>
        </Container>
      </section>

      {/* FOTOSTREIFEN */}
      <section className="overflow-hidden">
        <Container className="py-16 sm:py-20">
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            <PhotoFrame
              src="/images/photos/coworking-warm.jpg"
              alt=""
              className="col-span-2 aspect-[4/3] sm:aspect-[16/9]"
            />
            <PhotoFrame src="/images/photos/ordner-regal.jpg" alt="" className="aspect-[3/4]" />
          </div>
        </Container>
      </section>

      {/* SO FUNKTIONIERT'S */}
      <section>
        <Container className="py-20">
          <SectionHeading eyebrow={t.howItWorksEyebrow} title={t.howItWorksTitle} align="center" className="mx-auto" />
          <ol className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {t.howItWorksSteps.map((step, i) => (
              <li key={step} className="rounded-3xl border border-line-soft bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-xs font-semibold text-cream">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step}</p>
              </li>
            ))}
          </ol>
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
