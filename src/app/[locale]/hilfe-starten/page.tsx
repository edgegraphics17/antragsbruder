import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IntakeForm } from "@/components/sections/IntakeForm";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { dict } from "@/content/hilfe-starten-i18n";

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

export default async function HilfeStartenPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ anliegen?: string; details?: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const t = dict[locale];

  const sp = await searchParams;
  const validAnliegen = ["brief", "antrag", "wohngeld", "unterlagen", "papierkram", "dringend", "sonstiges"];
  const defaultAnliegen = sp.anliegen && validAnliegen.includes(sp.anliegen) ? sp.anliegen : "";
  const defaultDescription = sp.details ? decodeURIComponent(sp.details) : "";

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.eyebrow} title={t.heroTitle} lede={t.heroLede} />
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-12">
          <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {t.steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-line-soft bg-white p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-xs font-semibold text-cream">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm font-semibold text-ink">{s.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <IntakeForm locale={locale} defaultAnliegen={defaultAnliegen} defaultDescription={defaultDescription} />
          <div className="space-y-5">
            <DisclaimerBox title={t.disclaimer1Title}>{t.disclaimer1Text}</DisclaimerBox>
            <DisclaimerBox title={t.disclaimer2Title}>{t.disclaimer2Text}</DisclaimerBox>
          </div>
        </Container>
      </section>
    </>
  );
}
