import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { KontaktForm } from "@/components/sections/KontaktForm";
import { IconMail } from "@/components/ui/icons";
import { LockupHorizontal } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { dict } from "@/content/kontakt-i18n";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";

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
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function KontaktPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ thema?: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];
  const sp = await searchParams;
  const defaultThema = sp.thema && ["allgemein", "support", "partner"].includes(sp.thema)
    ? sp.thema
    : "allgemein";

  return (
    <section>
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <LockupHorizontal priority className="mb-8 w-56" />
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
          <div className="mt-8 flex items-start gap-3 rounded-3xl border border-line-soft bg-white p-5">
            <IconMail className="h-5 w-5 shrink-0 text-brand-800" />
            <div className="text-sm text-ink-soft">
              <p className="font-medium text-ink">{t.directEmailLabel}</p>
              <a href={`mailto:${site.contactEmail}`} className="underline hover:text-brand-800">
                {site.contactEmail}
              </a>
            </div>
          </div>
        </div>
        <KontaktForm defaultThema={defaultThema} locale={locale} />
      </Container>
    </section>
  );
}
