import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { IconCheck, IconBuilding } from "@/components/ui/icons";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";
import { getFuerUnternehmenDict } from "@/content/fuer-unternehmen-i18n";
import { buildPageMetadata } from "@/lib/seo/metadata";

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
  const t = getFuerUnternehmenDict(locale);
  return buildPageMetadata({ locale, path: "/fuer-unternehmen", title: t.metaTitle, description: t.metaDescription });
}

export default async function FuerUnternehmenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = getFuerUnternehmenDict(locale);
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      {/* HERO */}
      <section>
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-800">
              <IconBuilding className="h-3.5 w-3.5" />
              {t.eyebrow}
            </div>
            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{t.lede}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={href("/kontakt")} size="lg">
                {t.ctaPrimary}
              </Button>
              <Button href={href("/kontakt")} variant="secondary" size="lg">
                {t.ctaSecondary}
              </Button>
            </div>
          </div>
          <PhotoFrame src="/images/photos/coworking-blau.jpg" alt="" priority className="aspect-[4/3] w-full" />
        </Container>
      </section>

      {/* WARUM */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title={t.whyTitle} align="center" className="mx-auto" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {t.whyItems.map((item) => (
              <div key={item.title} className="rounded-3xl border border-line-soft bg-white p-6">
                <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* LEISTUNGEN */}
      <section>
        <Container className="py-20">
          <SectionHeading title={t.servicesTitle} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.servicesItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-line-soft bg-white p-5">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                <span className="text-sm font-medium text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* PROZESS */}
      <section className="bg-cream-deep/60">
        <Container className="py-20">
          <SectionHeading title={t.processTitle} align="center" className="mx-auto" />
          <ol className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {t.processSteps.map((step, i) => (
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

      {/* CTA */}
      <section>
        <Container className="py-20">
          <div className="rounded-3xl border border-brand-700/30 bg-brand-50 p-8 sm:p-12">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{t.ctaText}</p>
            <Button href={href("/kontakt")} size="lg" className="mt-8">
              {t.ctaPrimary}
            </Button>
          </div>
        </Container>
      </section>

      {/* HINWEIS */}
      <section className="pb-20">
        <Container>
          <DisclaimerBox title={t.noteTitle}>{t.noteText}</DisclaimerBox>
        </Container>
      </section>
    </>
  );
}
