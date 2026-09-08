import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { MascotFull } from "@/components/ui/Logo";
import { dict } from "@/content/ueber-uns-i18n";
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

export default async function UeberUnsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const href = (path: string) => localeHref(locale, path);

  return (
    <>
      <section>
        <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
          <MascotFull priority className="mx-auto w-48 sm:w-56 lg:mx-0" />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="grid gap-10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{t.observeTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.observeText}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{t.changeTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.changeText}</p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title={t.prinzipienTitle} align="center" className="mx-auto" />
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {t.prinzipien.map((p) => (
              <div
                key={p}
                className="rounded-2xl border border-line-soft bg-white px-5 py-4 text-center text-sm font-medium text-ink"
              >
                {p}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimaryLabel}
        primaryHref={href("/so-funktionierts")}
        secondaryLabel={t.ctaSecondaryLabel}
        secondaryHref={href("/vision")}
      />
    </>
  );
}
