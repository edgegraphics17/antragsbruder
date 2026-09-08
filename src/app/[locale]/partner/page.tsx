import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SimpleContactForm } from "@/components/sections/SimpleContactForm";
import { site } from "@/content/site";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/partner-i18n";

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

export default async function PartnerPage({ params }: { params: Promise<{ locale: string }> }) {
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
          <SectionHeading title={t.audienceTitle} />
          <div className="mt-8 flex flex-wrap gap-3">
            {t.zielgruppen.map((z) => (
              <span key={z} className="rounded-full border border-line-soft bg-white px-4 py-2 text-sm text-ink">
                {z}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <SectionHeading title={t.formTitle} lede={t.formLede} />
          <SimpleContactForm
            locale={locale}
            toEmail={site.partnerEmail}
            subjectPrefix="Partneranfrage über antragsbruder.de"
            submitLabel={t.submitLabel}
          />
        </Container>
      </section>
    </>
  );
}
