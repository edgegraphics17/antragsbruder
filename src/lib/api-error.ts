// ============================================================
// API-FEHLER — interne Details bleiben intern
// ============================================================
// Vorher gaben etwa 27 Stellen in den API-Routen `error.message` direkt an
// den Client zurück. Das verrät Tabellen-, Spalten- und Provider-Interna
// (Supabase-, Storage- und Fremd-API-Meldungen) und erleichtert gezielte
// Angriffe. In Produktion antworten wir deshalb allgemein; in der Entwicklung
// bleibt die Meldung sichtbar, damit Debugging nicht leidet.

const GENERIC = "Interner Fehler. Bitte versuche es in Kürze erneut.";

/** Meldung für die Antwort an den Client — in Produktion ohne Interna. */
export function safeMessage(error: unknown): string {
  if (process.env.NODE_ENV !== "production") {
    return error instanceof Error ? error.message : String(error);
  }
  return GENERIC;
}

/**
 * Einheitlicher Fehler-Logger für API-Routen.
 * Gibt die interne Ursache serverseitig aus (Logs) und nie an den Client.
 */
export function logApiError(context: string, error: unknown): void {
  console.error(`[api:${context}]`, error instanceof Error ? error.message : error);
}

// ============================================================
// AUTH-MELDUNGEN — bekannte Fälle verständlich, Rest allgemein
// ============================================================
// Bei der Anmeldung ist eine allgemeine Meldung für den Nutzer nutzlos
// ("Passwort falsch" hilft, "Interner Fehler" nicht). Deshalb wird hier eine
// feste Zuordnung bekannter Fälle verwendet: nur diese Texte gehen nach außen,
// alles Unbekannte bleibt allgemein. Nebeneffekt: Die Texte verraten nicht, ob
// eine E-Mail-Adresse existiert.

const AUTH_MESSAGES: { match: string; text: string }[] = [
  { match: "Invalid login credentials", text: "E-Mail-Adresse oder Passwort stimmt nicht." },
  { match: "Email not confirmed", text: "Bitte bestätige zuerst deine E-Mail-Adresse." },
  { match: "User already registered", text: "Für diese E-Mail-Adresse gibt es bereits ein Konto. Melde dich an oder setze das Passwort zurück." },
  { match: "already been registered", text: "Für diese E-Mail-Adresse gibt es bereits ein Konto. Melde dich an oder setze das Passwort zurück." },
  { match: "Password should be at least", text: "Das Passwort ist zu kurz." },
  { match: "Unable to validate email address", text: "Diese E-Mail-Adresse sieht ungültig aus." },
  { match: "Email rate limit exceeded", text: "Zu viele E-Mails angefordert. Bitte warte einige Minuten." },
  { match: "Token has expired", text: "Der Link ist abgelaufen. Bitte fordere einen neuen an." },
  { match: "invalid or has expired", text: "Der Link ist ungültig oder abgelaufen. Bitte fordere einen neuen an." },
];

/** Meldung für Anmelde-/Registrierungsfehler — verständlich, aber ohne Interna. */
export function safeAuthMessage(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error ?? "");
  const hit = AUTH_MESSAGES.find((entry) => raw.toLowerCase().includes(entry.match.toLowerCase()));
  if (hit) return hit.text;
  return safeMessage(error);
}
