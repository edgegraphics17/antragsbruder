import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GrundsicherungCalculator } from "@/components/sections/GrundsicherungCalculator";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/grundsicherung-i18n";

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
  return { title: t.title, description: t.lede };
}

export default async function GrundsicherungsrechnerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <section>
      <Container className="py-14 sm:py-20">
        <GrundsicherungCalculator locale={locale} />
      </Container>
    </section>
  );
}
