import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillarCard } from "@/components/sections/Cards";
import { CTASection } from "@/components/sections/CTASection";
import { betroffeneGruppen, sozialePfeiler } from "@/content/pillars";
import { dict } from "@/content/verantwortung-i18n";
import { isLocale, defaultLocale, locales, localeHref, type Locale } from "@/i18n/config";
import { IconCompass, IconFolder, IconHeart, IconLock, IconSpark } from "@/components/ui/icons";

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

export default async function VerantwortungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.heroEyebrow} title={t.heroTitle} lede={t.heroLede} />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{t.affectedIntro}</p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {betroffeneGruppen[locale].map((g) => (
              <li key={g} className="rounded-2xl border border-line-soft bg-white px-4 py-3 text-sm text-ink">
                {g}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <SectionHeading title={t.ideaTitle} lede={t.ideaLede} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sozialePfeiler[locale].map((p, i) => {
              const Icon = pfeilerIcons[i];
              return <PillarCard key={p.title} icon={<Icon className="h-5 w-5" />} title={p.title} text={p.text} />;
            })}
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title={t.themesTitle} align="center" className="mx-auto" />
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {t.themen.map((th) => (
              <span key={th} className="rounded-full border border-line-soft bg-white px-4 py-2 text-sm text-ink">
                {th}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="rounded-3xl border border-brand-700/40 bg-brand-50 p-8 sm:p-10">
            <p className="font-display text-xl font-bold text-ink sm:text-2xl">{t.boxTitle}</p>
            <p className="mt-3 max-w-2xl text-ink-soft">{t.boxText}</p>
          </div>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimary}
        primaryHref={localeHref(locale, "/hilfe-starten")}
        secondaryLabel={t.ctaSecondary}
        secondaryHref={localeHref(locale, "/vision")}
      />
    </>
  );
}
