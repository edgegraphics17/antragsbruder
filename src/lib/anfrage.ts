// ============================================================
// ANFRAGE (Kontakt-Funnel) — Validierung und Aufbereitung
// ============================================================
// Was hier NICHT passiert: keine Speicherung in der Datenbank, keine
// Bewertung des Anliegens, keine Anlage eines Vorgangs. Die Anfrage wird
// ausschließlich per E-Mail an das Postfach des Betreibers übermittelt.
// Damit fallen für den Funnel keine Sozialdaten in eigenen Systemen an.
//
// Rechtlicher Rahmen: Der Funnel erhebt nur Kontaktdaten und die vom
// Nutzer selbst gewählte Beschreibung. Es werden keine Gesundheitsdaten
// und keine Angaben zu Rechtsansprüchen abgefragt (siehe AGB § 2 und § 6).

import { z } from "zod";
import { locales } from "@/i18n/config";

const trimmed = (max: number) => z.string().trim().max(max);

export const anfrageSchema = z.object({
  locale: z.enum(locales),
  area: z.string().trim().min(1).max(64),
  areaLabel: trimmed(120),
  problems: z.array(z.string().trim().min(1).max(64)).min(1).max(20),
  problemLabels: z.array(trimmed(200)).min(1).max(20),
  requester: z.string().trim().min(1).max(64),
  requesterLabel: trimmed(120),
  wish: z.string().trim().min(1).max(64),
  wishLabel: trimmed(200),
  name: z.string().trim().min(2, "Name erforderlich").max(120),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(200),
  phone: trimmed(60).optional().default(""),
  message: trimmed(4000).optional().default(""),
  consent: z.literal(true, { error: "Einverständnis erforderlich" }),
  sentAt: z.string().trim().max(40).optional(),
});

export type Anfrage = z.infer<typeof anfrageSchema>;

/**
 * Klartextfassung der Anfrage. Wird als Plaintext-Teil der E-Mail und als
 * Basis für die Rückfallebene (mailto) verwendet.
 */
export function anfrageToPlainText(anfrage: Anfrage): string {
  return [
    `Bereich: ${anfrage.areaLabel}`,
    `Schwierigkeit: ${anfrage.problemLabels.join("; ")}`,
    `Anfrage von: ${anfrage.requesterLabel}`,
    `Gewünscht: ${anfrage.wishLabel}`,
    `Sprache: ${anfrage.locale}`,
    "",
    `Name: ${anfrage.name}`,
    `E-Mail: ${anfrage.email}`,
    anfrage.phone ? `Telefon: ${anfrage.phone}` : "Telefon: –",
    "",
    "Beschreibung:",
    anfrage.message || "–",
    "",
    "---",
    "Eingegangen über den Kontakt-Funnel auf antragsbruder.de.",
    "Hinweis für die Bearbeitung: Es handelt sich um eine organisatorische",
    "Anfrage, nicht um ein Mandat. Keine Rechtsberatung zusagen, keine",
    "Erfolgsaussichten bewerten, keine Fristen verbindlich bestätigen.",
  ].join("\n");
}
