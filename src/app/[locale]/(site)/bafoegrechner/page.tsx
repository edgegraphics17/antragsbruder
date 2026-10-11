import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BafoegCalculator } from "@/components/sections/BafoegCalculator";
import { ClusterArticle } from "@/components/seo/ClusterArticle";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/bafoeg-i18n";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { webApplicationJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { bafoegRechnerSupporting } from "@/content/bafoeg-cluster";

// SEO-Title/Meta nach Rechner-Muster (Supporting Content ist DE-first).
const DE_SEO_TITLE = "BAföG Rechner 2026 - Anspruch kostenlos berechnen";
const DE_META_DESCRIPTION =
  "Berechne deinen möglichen BAföG-Anspruch 2026 kostenlos. Gib Ausbildung, Einkommen und Vermögen ein und erhalte in wenigen Minuten eine erste Einschätzung.";

// WebApplication-Schema für die Rechner-Landingpage (GEO/SEO §21).
const calcJsonLd = webApplicationJsonLd({
  name: "BAföG-Rechner",
  description:
    "Kostenloser BAföG-Rechner: Prüfe in wenigen Minuten, wie viel BAföG du wahrscheinlich bekommen könntest.",
  path: "/bafoegrechner",
});

const breadcrumbItems = [
  { name: "Startseite", href: "/" },
  { name: "BAföG", href: "/bafoeg" },
  { name: "Rechner", href: "/bafoegrechner" },
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
      path: "/bafoegrechner",
      title: DE_SEO_TITLE,
      description: DE_META_DESCRIPTION,
    });
  }
  return buildPageMetadata({ locale, path: "/bafoegrechner", title: t.title, description: t.lede });
}

export default async function BafoegrechnerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <>
      {/* Rechner + Breadcrumb; Supporting Content folgt serverseitig gerendert darunter. */}
      <JsonLd data={locale === "de" ? [calcJsonLd, breadcrumbJsonLd(breadcrumbItems)] : calcJsonLd} />
      <section>
        <Container className="py-10 sm:py-14">
          {locale === "de" ? <Breadcrumb items={breadcrumbItems} /> : null}
          <BafoegCalculator locale={locale} />
        </Container>
      </section>
      {/* Supporting SEO-Content (DE-first, Phase-1-Mehrsprachigkeit wie Cluster-Seiten). */}
      {locale === "de" ? <ClusterArticle content={bafoegRechnerSupporting} variant="body" /> : null}
    </>
  );
}
