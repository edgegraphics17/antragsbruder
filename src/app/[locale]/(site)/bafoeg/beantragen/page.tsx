import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClusterArticle } from "@/components/seo/ClusterArticle";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { bafoegBeantragen } from "@/content/bafoeg-cluster";

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
    path: "/bafoeg/beantragen",
    title: bafoegBeantragen.title,
    description: bafoegBeantragen.metaDescription,
  });
}

export default async function BafoegBeantragenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  return <ClusterArticle content={bafoegBeantragen} />;
}
