import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/Badge";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { EntryCard, PillarCard } from "@/components/sections/Cards";
import { CTASection } from "@/components/sections/CTASection";
import { IconClock, IconDocument, IconFolder, IconMail, IconSpark, IconCompass } from "@/components/ui/icons";
import { warumPillars } from "@/content/pillars";
import { site } from "@/content/site";
import { languages } from "@/content/wohngeld-i18n";
import { dict } from "@/content/home-i18n";
import { commonDict } from "@/content/i18n/common";
import { blogPosts } from "@/content/blog";
import Link from "next/link";
import { locales, localeHref, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

const pillarIcons = [IconSpark, IconFolder, IconMail];

// Die 3 neuesten Blog-Artikel für den Startseiten-Teaser (nach Prüfdatum).
const latestBlogPosts = [...blogPosts]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

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
  // Title bleibt bewusst leer → Root-Default-Title greift (kein doppeltes Suffix).
  return buildPageMetadata({ locale, path: "/" });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const href = (path: string) => localeHref(locale, path);
  const t = dict[locale];

  const rechner = [
    { title: t.wohngeldTitle, amount: t.wohngeldAmount, unit: t.wohngeldUnit, caption: t.wohngeldCaption, cta: t.wohngeldCta, href: "/wohngeld/rechner" },
    { title: t.grundsicherungTitle, amount: t.grundsicherungAmount, unit: t.grundsicherungUnit, caption: t.grundsicherungCaption, cta: t.grundsicherungCta, href: "/grundsicherungsrechner" },
    { title: t.bafoegTitle, amount: t.bafoegAmount, unit: t.bafoegUnit, caption: t.bafoegCaption, cta: t.bafoegCta, href: "/bafoegrechner" },
    { title: t.alg1Title, amount: t.alg1Amount, unit: t.alg1Unit, caption: t.alg1Caption, cta: t.alg1Cta, href: "/alg1" },
  ];

  return (
    <>
      {/* HERO: zentriert, große Serife, zweite Zeile in Markenfarbe */}
      <section className="px-3 sm:px-5">
        <div className="rounded-[2rem] bg-white sm:rounded-[2.5rem]">
          <Container className="pb-8 pt-14 text-center sm:pb-10 sm:pt-20 lg:pt-24">
            <StatusBadge status="jetzt" label={t.heroBadge} />
            <h1 className="font-display mx-auto mt-6 max-w-4xl text-5xl text-ink sm:text-7xl lg:text-[5.5rem]">
              {t.heroTitle1} <span className="block text-brand-600">{t.heroTitle2}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{t.heroLede}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={href("/ansprueche-checken")} size="lg">
                {t.heroCta1}
              </Button>
              <Button href={href("/wohngeld/rechner")} variant="secondary" size="lg">
                {t.heroCta2}
              </Button>
            </div>
            <p className="mx-auto mt-5 max-w-xl text-xs text-ink-soft">{t.heroDisclaimer(site.name)}</p>
          </Container>

          {/* EINSTIEG als Fotokarten direkt unter dem Hero */}
          <Container className="pb-10 sm:pb-14">
            <h2 className="sr-only">{t.einstiegTitle}</h2>
            <div className="grid gap-3 rounded-[1.75rem] bg-cream p-3 sm:grid-cols-2 lg:grid-cols-4">
              <EntryCard
                image="/images/photos/aktenstapel.jpg"
                icon={<IconDocument />}
                title={t.entryBriefTitle}
                text={t.entryBriefText}
                ctaLabel={t.entryBriefCta}
                href={href("/wohngeld")}
              />
              <EntryCard
                image="/images/photos/fassade-muster.jpg"
                icon={<IconFolder />}
                title={t.entryAntragTitle}
                text={t.entryAntragText}
                ctaLabel={t.entryAntragCta}
                href={href("/bafoegrechner")}
              />
              <EntryCard
                image="/images/photos/buecher-markt.jpg"
                icon={<IconClock />}
                title={t.entryChaosTitle}
                text={t.entryChaosText}
                ctaLabel={t.entryChaosCta}
                href={href("/grundsicherungsrechner")}
              />
              <EntryCard
                image="/images/photos/coworking-warm.jpg"
                icon={<IconCompass />}
                title={t.entryAnspruecheTitle}
                text={t.entryAnspruecheText}
                ctaLabel={t.entryAnspruecheCta}
                href={href("/ansprueche-checken")}
              />
            </div>
          </Container>
        </div>
      </section>

      {/* RECHNER */}
      <section>
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={t.rechnerEyebrow} title={t.rechnerTitle} lede={t.rechnerLede} rule />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rechner.map((r) => (
              <div key={r.href} className="flex flex-col rounded-3xl bg-white p-6 sm:p-7">
                <p className="text-sm font-medium text-ink-soft">{r.title}</p>
                <p className="font-display mt-6 text-5xl text-ink">{r.amount}</p>
                <p className="mt-1 text-sm font-medium text-brand-700">{r.unit}</p>
                <p className="mt-4 flex-1 text-xs leading-relaxed text-ink-soft">
                  {r.caption}
                </p>
                <Button href={href(r.href)} size="md" className="mt-6 w-full">
                  {r.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
            <span className="font-medium">{t.availableLanguages}:</span>
            {languages.map((l) => (
              <span key={l.code} className="rounded-full bg-white px-2.5 py-1 font-medium text-ink">
                {l.label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* WARUM ANTRAGSBRUDER */}
      <section className="px-3 sm:px-5">
        <div className="rounded-[2rem] bg-cream-deep/70 sm:rounded-[2.5rem]">
          <Container className="py-20 sm:py-24">
            <SectionHeading title={t.warumTitle} align="center" rule />
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {warumPillars[locale].map((p, i) => {
                const Icon = pillarIcons[i];
                return <PillarCard key={p.title} icon={<Icon className="h-5 w-5" />} title={p.title} text={p.text} />;
              })}
            </div>
          </Container>
        </div>
      </section>

      {/* SO FUNKTIONIERT'S + Foto */}
      <section>
        <Container className="grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <PhotoFrame src="/images/photos/ordner-regal.jpg" alt="" className="aspect-[4/3] lg:aspect-[5/6]" />
          <div>
            <SectionHeading eyebrow={t.howItWorksEyebrow} title={t.howItWorksTitle} rule />
            <ol className="mt-10 space-y-6">
              {t.howItWorksSteps.map((step, i) => (
                <li key={step} className="flex gap-5 border-t border-line pt-6">
                  <span className="font-display text-4xl text-brand-600">{i + 1}</span>
                  <p className="pt-1 text-lg leading-relaxed text-ink-soft">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* BLOG-TEASER: neueste Ratgeber (nur im Default-Locale, da der Blog DE-only ist) */}
      {locale === defaultLocale && (
        <section aria-labelledby="blog-teaser">
          <Container className="py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow={commonDict.de.blogTeaser.eyebrow}
                title={commonDict.de.blogTeaser.title}
              />
              <Button href="/blog" variant="secondary" size="md">
                {commonDict.de.blogTeaser.cta}
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestBlogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${post.slug}`}
                  className="group flex flex-col rounded-3xl bg-white p-7 transition-shadow duration-200 hover:shadow-[0_18px_40px_-22px_rgba(34,33,31,0.35)]"
                >
                  <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-900">
                    {post.category.label}
                  </span>
                  <h3 className="font-display mt-5 text-2xl text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 text-sm font-medium text-ink group-hover:underline">
                    Weiterlesen →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FINAL CTA */}
      <CTASection
        title={t.finalCtaTitle}
        text={t.finalCtaText}
        primaryLabel={t.finalCtaPrimary}
        primaryHref={href("/kontakt")}
        secondaryLabel={t.finalCtaSecondary}
        secondaryHref={href("/datenbank")}
      />
    </>
  );
}
