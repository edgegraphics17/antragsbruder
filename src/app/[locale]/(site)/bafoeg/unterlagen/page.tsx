import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClusterArticle } from "@/components/seo/ClusterArticle";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { bafoegUnterlagen } from "@/content/bafoeg-cluster";

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
    path: "/bafoeg/unterlagen",
    title: bafoegUnterlagen.title,
    description: bafoegUnterlagen.metaDescription,
  });
}

export default async function BafoegUnterlagenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  return <ClusterArticle content={bafoegUnterlagen} />;
}
