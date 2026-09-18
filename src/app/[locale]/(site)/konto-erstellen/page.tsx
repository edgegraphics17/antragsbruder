import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { isLocale, defaultLocale, localeHref } from '@/i18n/config';
import { getAuthPageDict } from '@/content/i18n/authPage';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getAuthPageDict(isLocale(locale) ? locale : defaultLocale);
  return {
    title: `${t.signupTitle} — Antragsbruder`,
    description: t.signupLede,
  };
}

export default async function RegisterPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : defaultLocale) as Locale;
  const t = getAuthPageDict(locale);

  return (
    <Container className="flex min-h-[calc(100dvh-6rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <SectionHeading eyebrow={t.badge} title={t.signupTitle} lede={t.signupLede} />
        </div>

        <div className="rounded-3xl border border-line-soft bg-paper p-6 shadow-lg">
          <RegisterForm locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-ink-soft">
          {t.alreadyAccount}{' '}
          <Link href={localeHref(locale, '/anmelden')} className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800">
            {t.signInNow}
          </Link>
        </p>
      </div>
    </Container>
  );
}
