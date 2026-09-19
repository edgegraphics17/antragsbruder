import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { isLocale, defaultLocale } from '@/i18n/config';
import { getAuthPageDict } from '@/content/i18n/authPage';
import { LoginForm } from '@/components/auth/LoginForm';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Link from 'next/link';
import { buildPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// /anmelden zeigt in JEDEM Locale das Login-Formular (Bugfix: zuvor
// renderten nicht-deutsche Locales hier das Registrierungsformular).
// Der Registrierungspfad ist /konto-erstellen; innerhalb des Login-
// Formulars gibt es zusätzlich einen Inline-Tab "Konto erstellen".

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getAuthPageDict(isLocale(locale) ? locale : defaultLocale);
  return buildPageMetadata({
    locale: isLocale(locale) ? locale : defaultLocale,
    path: "/anmelden",
    title: t.signInNow,
    description: t.signInLede,
  });
}

export default async function LoginPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : defaultLocale) as Locale;
  const t = getAuthPageDict(locale);

  return (
    <Container className="flex min-h-[calc(100dvh-6rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-brand-700" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 21a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <SectionHeading eyebrow={t.badge} title={t.signInTitle} lede={t.signInLede} />
        </div>

        <div className="rounded-3xl border border-line-soft bg-paper p-6 shadow-lg">
          <LoginForm locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-ink-soft">
          {t.consentPrefix}{' '}
          <Link href="/de/datenschutz" className="underline underline-offset-2 hover:text-brand-700">
            {t.consentPrivacy}
          </Link>{' '}
          {t.consentAnd}{' '}
          <Link href="/de/agb" className="underline underline-offset-2 hover:text-brand-700">
            {t.consentTerms}
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
