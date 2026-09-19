import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { isLocale, defaultLocale } from '@/i18n/config';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const TITLE: Record<string, string> = { de: 'Neues Passwort', en: 'New password' };
const LEDE: Record<string, string> = {
  de: 'Setze ein neues Passwort und melde dich danach wie gewohnt an.',
  en: 'Set a new password and log in as usual afterwards.',
};
const BADGE: Record<string, string> = { de: 'Konto', en: 'Account' };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : defaultLocale;
  return { title: TITLE[l] ?? TITLE.de, robots: { index: false } };
}

export default async function ResetPasswordPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : defaultLocale) as Locale;
  const t = (key: Record<string, string>) => key[locale] ?? key.de;

  return (
    <Container className="flex min-h-[calc(100dvh-6rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-brand-700" aria-hidden="true">
              <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="15" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <SectionHeading eyebrow={t(BADGE)} title={t(TITLE)} lede={t(LEDE)} />
        </div>

        <div className="rounded-3xl border border-line-soft bg-paper p-6 shadow-lg">
          <ResetPasswordForm locale={locale} />
        </div>
      </div>
    </Container>
  );
}
