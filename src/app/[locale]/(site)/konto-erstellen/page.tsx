import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { isLocale, defaultLocale, localeHref } from '@/i18n/config';
import { getAuthPageDict } from '@/content/i18n/authPage';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconMail, IconLock } from '@/components/ui/icons';
import { buildPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// ============================================================
// ÖFFENTLICHE REGISTRIERUNG GESPERRT (seit 2026-10-12)
// Das Dashboard ist ein internes Projekt. Besucher werden hier
// nicht zum Konto-Erstellen geführt, sondern zum Kontakt.
// Der Code bleibt erhalten, um die Registrierung später wieder
// freizuschalten (siehe auch src/app/api/auth/signup/route.ts).
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    noindex: true,
    locale: isLocale(locale) ? locale : defaultLocale,
    path: "/konto-erstellen",
    title: "Registrierung geschlossen",
    description: "Die Registrierung bei Antragsbruder ist derzeit geschlossen. Kontaktiere uns für Unterstützung.",
  });
}

export default async function RegisterPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : defaultLocale) as Locale;
  const t = getAuthPageDict(locale);

  return (
    <Container className="flex min-h-[calc(100dvh-6rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <IconLock className="h-8 w-8 text-brand-700" />
        </div>
        <SectionHeading as="h1"
          eyebrow={t.badge}
          title="Registrierung geschlossen"
          lede="Das Dashboard ist ein internes Projekt. Wir sind aber gerne für dich da – schreib uns einfach, wenn du Unterstützung bei deinen Anträgen und Ansprüchen brauchst."
        />

        <div className="mt-8 flex flex-col gap-3">
          <Button href={localeHref(locale, "/kontakt")} size="lg" className="w-full">
            <IconMail className="h-4 w-4" />
            {locale === "de" ? "Kontakt aufnehmen" : "Get in touch"}
          </Button>
          <Button href={localeHref(locale, "/")} variant="outline" size="lg" className="w-full">
            Zurück zur Startseite
          </Button>
        </div>

        <p className="mt-6 text-xs text-ink-soft">
          Bereits Konto? Der Login für das Team bleibt über{" "}
          <a href={localeHref(locale, "/anmelden")} className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800">
            /anmelden
          </a>{" "}
          erreichbar.
        </p>
      </div>
    </Container>
  );
}
