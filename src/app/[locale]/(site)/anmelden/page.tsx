import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { commonDict } from '@/content/i18n/common';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ redirect?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = commonDict[locale as Locale];
  return {
    title: t.nav.antragVorbereiten ? 'Konto anlegen — Antragsbruder' : 'Account erstellen — Antragsbruder',
    description: 'Erstelle dein kostenloses Antragsbruder-Konto, um deine Anträge und Unterlagen zu verwalten.',
  };
}

export default async function LoginPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { redirect } = await searchParams;
  const t = commonDict[locale as Locale];

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
          <SectionHeading
            eyebrow="Konto"
            title={locale === 'de' ? 'Willkommen bei Antragsbruder' : 'Welcome to Antragsbruder'}
            lede={
              locale === 'de'
                ? 'Melde dich an oder erstelle ein neues Konto, um deine Anträge und Unterlagen zu verwalten.'
                : 'Sign in or create a new account to manage your applications and documents.'
            }
          />
        </div>

        <div className="rounded-3xl border border-line-soft bg-paper p-6 shadow-lg">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex rounded-full bg-brand-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              {locale === 'de' ? 'Konto' : 'Account'}
            </span>
          </div>

          <div className="mb-6 flex justify-center">
            {locale === 'de' ? (
              <Link href="/de/anmelden"><a className={`rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  redirect ? 'bg-brand-50 text-brand-700' : 'bg-brand-50 text-brand-700'
                }`}
              >
                Anmelden
              </a></Link>
            ) : (
              <Link href="/en/signin"><a className={`rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  redirect ? 'bg-brand-50 text-brand-700' : 'bg-brand-50 text-brand-700'
                }`}
              >
                Sign in
              </a></Link>
            )}
          </div>

          <div className="border-t border-line-soft pt-6">
            {locale === 'de' ? (
              <LoginForm locale={locale as Locale} />
            ) : (
              <RegisterForm locale={locale as Locale} />
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-soft">
          {locale === 'de' ? (
            <>
              Mit der Anmeldung stimmst du unseren{' '}
              <Link href="/de/datenschutz"><a className="underline underline-offset-2 hover:text-brand-700">
                Datenschutzbedingungen
              </a></Link>{' '}
              und{' '}
              <Link href="/de/agb"><a className="underline underline-offset-2 hover:text-brand-700">
                Allgemeinen Geschäftsbedingungen
              </a></Link>{' '}
              zu.
            </>
          ) : (
            <>
              By signing in, you agree to our{' '}
              <Link href="/en/privacy"><a className="underline underline-offset-2 hover:text-brand-700">
                Privacy Policy
              </a></Link>{' '}
              and{' '}
              <Link href="/en/terms"><a className="underline underline-offset-2 hover:text-brand-700">
                Terms of Service
              </a></Link>.
            </>
          )}
        </p>
      </div>
    </Container>
  );
}
