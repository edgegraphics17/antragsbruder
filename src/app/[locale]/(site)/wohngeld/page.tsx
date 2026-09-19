import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { WohngeldCalculator } from "@/components/sections/WohngeldCalculator";
import { ClusterArticle } from "@/components/seo/ClusterArticle";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { webApplicationJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { wohngeldPillar } from "@/content/wohngeld-cluster";

// Wohngeld-Content-Cluster: Phase 1 nur Deutsch (SEO-Strategie §19 – keine
// Indexierung schwacher Maschinenübersetzungen). Andere Locales → 404.
export function generateStaticParams() {
  return [{ locale: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") notFound();
  return buildPageMetadata({
    locale: "de",
    path: `/${wohngeldPillar.slug}`,
    title: wohngeldPillar.title,
    description: wohngeldPillar.metaDescription,
  });
}

// Der eingebettete Rechner wird zusätzlich als WebApplication markiert.
const calcJsonLd = webApplicationJsonLd({
  name: "Wohngeld-Rechner",
  description:
    "Kostenloser Wohngeld-Rechner: Prüfe in wenigen Minuten, ob du wahrscheinlich Anspruch auf Wohngeld hast und wie hoch der monatliche Zuschuss ausfallen könnte.",
  path: "/wohngeld/rechner",
});

export default async function WohngeldPillarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Guard in der Page-Komponente: nur so wird ein echter HTTP-404 ausgelöst
  // (nicht nur die Not-Found-UI) – Soft-404s wären ein SEO-Problem.
  if (locale !== "de") notFound();
  return (
    <>
      <JsonLd data={calcJsonLd} />
      <ClusterArticle content={wohngeldPillar} />

      {/* Rechner-Modul direkt auf der Pillar-Page (Conversion-Architektur §26) */}
      <section aria-labelledby="wohngeld-rechner-modul" className="pb-20">
        <Container>
          <h2 id="wohngeld-rechner-modul" className="font-display mb-6 text-center text-2xl font-bold text-ink">
            Prüfe jetzt deinen Anspruch
          </h2>
          <WohngeldCalculator locale="de" headingLevel="h2" />
        </Container>
      </section>
    </>
  );
}
