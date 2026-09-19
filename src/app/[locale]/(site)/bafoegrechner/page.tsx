import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BafoegCalculator } from "@/components/sections/BafoegCalculator";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/bafoeg-i18n";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { webApplicationJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";

// WebApplication-Schema für die Rechner-Landingpage (GEO/SEO §21).
const calcJsonLd = webApplicationJsonLd({
  name: "BAföG-Rechner",
  description:
    "Kostenloser BAföG-Rechner: Prüfe in wenigen Minuten, wie viel BAföG du wahrscheinlich bekommen könntest.",
  path: "/bafoegrechner",
});

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
  return buildPageMetadata({ locale, path: "/bafoegrechner", title: t.title, description: t.lede });
}

export default async function BafoegrechnerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <section>
      <JsonLd data={calcJsonLd} />
      <Container className="py-14 sm:py-20">
        <BafoegCalculator locale={locale} />
      </Container>
    </section>
  );
}
