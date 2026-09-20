import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WohngeldCalculator } from "@/components/sections/WohngeldCalculator";
import { ClusterArticle } from "@/components/seo/ClusterArticle";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/wohngeld-i18n";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { webApplicationJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { wohngeldRechnerSupporting } from "@/content/cluster/wohngeld/rechner";

// SEO-Title/Meta nach STEP-5 §2 (Rechner-Seite). Andere Sprachen nutzen
// die Rechner-i18n-Texte (Supporting Content ist DE-first).
const DE_SEO_TITLE = "Wohngeld Rechner 2026 - Anspruch kostenlos berechnen";
const DE_META_DESCRIPTION =
  "Berechne deinen möglichen Wohngeldanspruch 2026 kostenlos. Gib Haushalt, Einkommen und Wohnkosten ein und erhalte in wenigen Minuten eine erste Einschätzung.";

// WebApplication-Schema für die Rechner-Landingpage (GEO/SEO §21).
const calcJsonLd = webApplicationJsonLd({
  name: "Wohngeld-Rechner",
  description:
    "Kostenloser Wohngeld-Rechner: Prüfe in wenigen Minuten, ob du wahrscheinlich Anspruch auf Wohngeld hast und wie hoch der monatliche Zuschuss ausfallen könnte.",
  path: "/wohngeld/rechner",
});

const breadcrumbItems = [
  { name: "Startseite", href: "/" },
  { name: "Wohngeld", href: "/wohngeld" },
  { name: "Rechner", href: "/wohngeld/rechner" },
];

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
  if (locale === "de") {
    return buildPageMetadata({
      locale,
      path: "/wohngeld/rechner",
      title: DE_SEO_TITLE,
      description: DE_META_DESCRIPTION,
    });
  }
  return buildPageMetadata({ locale, path: "/wohngeld/rechner", title: t.title, description: t.lede });
}

export default async function WohngeldrechnerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <>
      {/* Rechner + Breadcrumb; Supporting Content folgt serverseitig gerendert darunter. */}
      <JsonLd
        data={locale === "de" ? [calcJsonLd, breadcrumbJsonLd(breadcrumbItems)] : calcJsonLd}
      />
      <section>
        <Container className="py-10 sm:py-14">
          {locale === "de" ? <Breadcrumb items={breadcrumbItems} /> : null}
          <WohngeldCalculator locale={locale} />
        </Container>
      </section>
      {/* Supporting SEO-Content (DE-first, Phase-1-Mehrsprachigkeit wie Cluster-Seiten). */}
      {locale === "de" ? <ClusterArticle content={wohngeldRechnerSupporting} variant="body" /> : null}
    </>
  );
}
