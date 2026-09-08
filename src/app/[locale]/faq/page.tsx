import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { faqGroups } from "@/content/faq";
import { dict } from "@/content/faq-i18n";
import { locales, isLocale, defaultLocale, localeHref, type Locale } from "@/i18n/config";

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

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const groups = faqGroups[locale];

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
        </Container>
      </section>

      <section className="pb-20">
        <Container className="space-y-12">
          {groups.map((g) => (
            <div key={g.group}>
              <h2 className="font-display mb-4 text-xl font-bold text-ink">{g.group}</h2>
              <FaqAccordion items={g.items} />
            </div>
          ))}
        </Container>
      </section>

      <CTASection
        title={t.ctaTitle}
        primaryLabel={t.ctaPrimaryLabel}
        primaryHref={localeHref(locale, "/kontakt")}
        secondaryLabel={t.ctaSecondaryLabel}
        secondaryHref={localeHref(locale, "/hilfe-starten")}
      />
    </>
  );
}
