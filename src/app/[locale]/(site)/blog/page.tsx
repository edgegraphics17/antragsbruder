import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogFeed } from "@/components/blog/BlogFeed";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/content/site";
import { blogPosts } from "@/content/blog";

// Blog ist Phase 1 Deutsch (die Cluster-Artikel sind DE-only). Andere Locales
// bekommen einen echten HTTP-404 – keine Indexierung schwacher Übersetzungen.
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
    path: "/blog",
    title: "Blog: Ratgeber zu Leistungen, Anträgen & Behörden",
    description:
      "Alle Ratgeber von Antragsbruder im Überblick: Wohngeld-Anspruch, Einkommensgrenzen, Unterlagen und Antrag – verifiziert an Primärquellen, mit sichtbarem Rechtsstand.",
  });
}

const breadcrumb = [
  { name: "Start", href: "/" },
  { name: "Blog", href: "/blog" },
];

// CollectionPage + ItemList: signalisiert Google/LLMs den Artikel-Überblick.
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(breadcrumb),
    {
      "@type": "CollectionPage",
      "@id": `https://${site.domain}/blog`,
      name: "Blog: Ratgeber zu Leistungen, Anträgen & Behörden",
      url: `https://${site.domain}/blog`,
      inLanguage: "de-DE",
      isPartOf: { "@id": `https://${site.domain}/#website` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: blogPosts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: post.title,
          url: `https://${site.domain}/${post.slug}`,
        })),
      },
    },
  ],
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "de") notFound();

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <section>
        <Container className="py-14 sm:py-20">
          <Breadcrumb items={breadcrumb} />
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Blog: Ratgeber zu Leistungen, Anträgen &amp; Behörden
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Verständliche Erklärungen zu staatlichen Leistungen – jede Angabe an Primärquellen
            geprüft, mit sichtbarem Rechtsstand. Wähle eine Kategorie oder stöbere im Feed.
          </p>
        </Container>
      </section>

      <section className="pb-20" aria-label="Alle Blogartikel">
        <Container>
          <BlogFeed />
        </Container>
      </section>
    </>
  );
}
