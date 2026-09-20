import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GrundsicherungPublicCheck } from "@/components/grundsicherung/GrundsicherungPublicCheck";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/grundsicherung-i18n";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { webApplicationJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";

// WebApplication-Schema für die Rechner-Landingpage (GEO/SEO §21).
const calcJsonLd = webApplicationJsonLd({
  name: "Grundsicherungsgeld-Rechner",
  description:
    "Kostenloser Rechner für Grundsicherungsgeld (früher Bürgergeld): Prüfe in wenigen Minuten, ob dir wahrscheinlich Grundsicherung zusteht.",
  path: "/grundsicherungsrechner",
  applicationCategory: "GovernmentApplication",
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
  return buildPageMetadata({ locale, path: "/grundsicherungsrechner", title: t.title, description: t.lede });
}

export default async function GrundsicherungsrechnerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <section>
      <JsonLd data={calcJsonLd} />
      <Container className="py-14 sm:py-20">
        <GrundsicherungPublicCheck locale={locale} />
      </Container>
    </section>
  );
}
