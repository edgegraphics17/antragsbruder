import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClusterArticle } from "@/components/seo/ClusterArticle";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { wohngeldEinkommensgrenze } from "@/content/wohngeld-cluster";

// Wohngeld-Content-Cluster: Phase 1 nur Deutsch (SEO-Strategie §19 –
// keine Indexierung schwacher Maschinenübersetzungen). Andere Locales → 404.
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
    path: "/wohngeld/einkommensgrenze",
    title: wohngeldEinkommensgrenze.title,
    description: wohngeldEinkommensgrenze.metaDescription,
  });
}

export default async function WohngeldEinkommensgrenzePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Guard in der Page-Komponente: echter HTTP-404 statt Soft-404.
  const { locale } = await params;
  if (locale !== "de") notFound();
  return <ClusterArticle content={wohngeldEinkommensgrenze} />;
}
