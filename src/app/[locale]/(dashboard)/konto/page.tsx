'use client';

// ============================================================
// KONTO & DATEN
// ============================================================
// Gegenstück zu den gesetzlichen Rechten aus der Datenschutzerklärung:
// Auskunft (Art. 15 DSGVO) und Löschung (Art. 17 DSGVO) – bedienbar ohne
// E-Mail an uns. Vorher stand in der Datenschutzerklärung nur der Verweis auf
// eine Kontaktanfrage.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { localeHref } from '@/i18n/config';

const CONFIRMATION = 'KONTO LÖSCHEN';

export default function KontoPage() {
  const router = useRouter();
  const locale = useLocaleFromPath();

  const [confirmation, setConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmationMatches = confirmation.trim() === CONFIRMATION;

  const handleDelete = async () => {
    if (!confirmationMatches || isDeleting) return;
    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: confirmation.trim() }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Die Löschung ist fehlgeschlagen.');
        setIsDeleting(false);
        return;
      }

      // Sitzung beenden und zur Startseite – der Zugang existiert nicht mehr.
      await supabase.auth.signOut();
      router.push(localeHref(locale, '/'));
    } catch {
      setError('Die Löschung ist fehlgeschlagen. Bitte versuche es erneut.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="font-display text-4xl text-ink sm:text-5xl">Konto &amp; Daten</h1>
      <p className="mt-4 text-ink-soft">
        Hier kannst du deine gespeicherten Daten abrufen oder dein Konto vollständig löschen.
      </p>

      {/* Auskunft */}
      <section className="mt-10 rounded-2xl border border-line-soft bg-white p-6">
        <h2 className="font-display text-2xl text-ink">Datenauskunft herunterladen</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Du erhältst eine Datei mit allen Angaben, die zu deinem Konto gespeichert sind: Profil,
          Verfahren, erfasste Fakten, Ergebnisse, Dokument-Informationen und eine Liste deiner
          hochgeladenen Dateien.
        </p>
        {/* Direkter Datei-Download über den Endpunkt – bewusst ein echter Anker
            und kein <Link>: next/link würde client-seitig navigieren statt die
            Datei zu speichern. Die Lint-Regel zielt auf interne Seitenrouten
            und ist hier nicht anwendbar. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/api/account/export"
          className="mt-5 inline-flex items-center rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-brand-800"
        >
          Datei herunterladen
        </a>
      </section>

      {/* Löschung */}
      <section className="mt-6 rounded-2xl border border-red-200 bg-red-50/60 p-6">
        <h2 className="font-display text-2xl text-ink">Konto löschen</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Gelöscht werden dein Zugang, dein Profil, alle Verfahren mit ihren Angaben und alle
          hochgeladenen Dateien. Dieser Schritt ist <strong>unwiderruflich</strong>.
        </p>

        <label htmlFor="confirmation" className="mt-5 block text-sm font-medium text-ink">
          Zur Bestätigung bitte <span className="font-mono">{CONFIRMATION}</span> eingeben:
        </label>
        <input
          id="confirmation"
          type="text"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          autoComplete="off"
          className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-600"
        />

        {error ? (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleDelete}
          disabled={!confirmationMatches || isDeleting}
          className="mt-5 inline-flex items-center rounded-xl bg-red-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isDeleting ? 'Wird gelöscht …' : 'Konto und alle Daten löschen'}
        </button>
      </section>

      <p className="mt-6 text-xs text-ink-soft">
        Die Rechtsgrundlagen findest du in der Datenschutzerklärung (Auskunft nach Art. 15 DSGVO,
        Löschung nach Art. 17 DSGVO).
      </p>
    </div>
  );
}
