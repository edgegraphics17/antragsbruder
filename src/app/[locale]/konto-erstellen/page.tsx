import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { commonDict } from '@/content/i18n/common';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Konto erstellen — Antragsbruder',
    description: 'Erstelle dein kostenloses Antragsbruder-Konto, um deine Anträge und Unterlagen zu verwalten.',
  };
}

export default async function RegisterPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <Container className="flex min-h-[calc(100dvh-6rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-ink">Konto erstellen</h1>
          <p className="mt-2 text-ink-soft">
            Registriere kostenlos und verwalte deine Anträge.
          </p>
        </div>

        <div className="rounded-3xl border border-line-soft bg-paper p-6 shadow-lg">
          <RegisterForm locale={locale as Locale} />
        </div>

        <p className="mt-6 text-center text-xs text-ink-soft">
          Du hast schon ein Konto?{' '}
          <a href="/de/anmelden" className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800">
            Jetzt anmelden
          </a>
        </p>
      </div>
    </Container>
  );
}
