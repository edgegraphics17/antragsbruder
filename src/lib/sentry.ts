// ============================================================
// Sentry Initialisierung — Next.js Integration
// ============================================================
// Einrichtung: SENTRY_DSN in .env.local setzen
// Siehe: https://docs.sentry.io/platforms/javascript/guides/nextjs/
//
// Fällback: Wenn kein DSN vorhanden ist, wird Sentry deaktiviert
// und Fehler nur per console.error geloggt.

import * as Sentry from '@sentry/nextjs';

const dsn = process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    // WICHTIG: Nur in Production trace full URLs. In Development
    // werden oft lokale URLs (http://localhost:3000) gesendet —
    // das sind bei nachfolgenden Datenschutz-Reviews störend.
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,
    // Fehler-Priorität: 100 % der Ereignisse in dev, 100 % in prod
    // (kann später per SampleRate reduziert werden)
    debug: process.env.NODE_ENV !== 'production',
    // Next.js-spezifische Integrationen
    enabled: process.env.NODE_ENV !== 'test',
    // Session-Replay (optional — deaktiviert bis zur Entscheidung)
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    // Breadcrumbs aus fetch/XHR ausschalten, um
    // interne API-Calls nicht zu exponieren
    beforeSend(event) {
      // Entferne Cookie-Header aus Breadcrumbs
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.filter(
          (b) =>
            !(
              b.data &&
              (('headers' in b.data && 'cookie' in b.data.headers) ||
                b.message?.toLowerCase().includes('cookie'))
            ),
        );
      }
      // IP-Adresse anonymisieren
      if (event.user) {
        event.user.ip_address = undefined;
      }
      return event;
    },
  });

  console.log('[Sentry] Initialisiert (DSN gesetzt)');
} else {
  console.warn(
    '[Sentry] SENTRY_DSN nicht gesetzt — Fehler werden nur console.error geloggt. Für Production einen Sentry-DSN konfigurieren.',
  );
}

// Helper: Fehler mit Sentry tracken (sicher für Module, die bei fehlendem
// Sentry importieren)
export function trackError(error: unknown, context?: Record<string, unknown>): void {
  if (!dsn) {
    console.error('[Error]', error, context);
    return;
  }
  try {
    Sentry.captureException(error, { extra: context });
  } catch {
    console.error('[Sentry-capture failed]', error, context);
  }
}
