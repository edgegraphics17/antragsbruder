import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClusterArticle } from "@/components/seo/ClusterArticle";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { bafoegPillar } from "@/content/bafoeg-cluster";

// BAföG-Content-Cluster: Phase 1 nur Deutsch (keine Indexierung schwacher
// Maschinenübersetzungen). Andere Locales → 404.
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
    deOnly: true,
    locale: "de",
    path: "/bafoeg",
    title: bafoegPillar.title,
    description: bafoegPillar.metaDescription,
  });
}

export default async function BafoegPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  return <ClusterArticle content={bafoegPillar} />;
}
