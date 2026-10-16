// ============================================================
// WIDERRUFSBELEHRUNG
// ============================================================
// Warum diese Seite bis 2026-10-16 fehlte: Vorher gab es Festpreis-Angebote.
// Seit der Umstellung auf den Kontakt-Funnel kommt der Vertrag individuell
// zustande — damit ist er ein Fernabsatzvertrag mit Verbrauchern, und die
// Widerrufsbelehrung ist Pflicht (§ 312g, § 355 BGB, Art. 246a EGBGB).
//
// Der Text folgt dem gesetzlichen Muster (Anlage 1 zu Art. 246a § 1 Abs. 2
// EGBGB) und ergänzt die für Dienstleistungen einschlägigen Absätze.
// Die Belehrung ist auf Deutsch verfasst: maßgeblich ist die deutsche Fassung,
// Verträge kommen auf Deutsch zustande.
//
// Offen (siehe Audit-Dossier): Eine Übersetzung in die übrigen Sprachen der
// Seite und ein anwaltliches Gegenlesen stehen aus.

import { legal, site } from "./site";

export type WiderrufBlock = {
  heading: string;
  /** Absätze des Blocks. */
  paragraphs: string[];
  /** Optionaler hervorgehobener Hinweis. */
  note?: string;
};

export const widerrufProvider = {
  name: legal.companyName,
  owner: legal.owner,
  street: legal.street,
  zipCity: legal.zipCity,
  country: legal.country,
  email: legal.email,
};

export const widerrufBlocks: WiderrufBlock[] = [
  {
    heading: "Widerrufsrecht",
    paragraphs: [
      `Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.`,
      `Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.`,
      `Um dein Widerrufsrecht auszuüben, musst du uns (${widerrufProvider.name}, ${widerrufProvider.owner}, ${widerrufProvider.street}, ${widerrufProvider.zipCity}, ${widerrufProvider.country}, E-Mail: ${widerrufProvider.email}) mittels einer eindeutigen Erklärung (zum Beispiel ein Brief mit der Post oder eine E-Mail) über deinen Entschluss informieren, diesen Vertrag zu widerrufen. Du kannst dafür das unten stehende Muster-Widerrufsformular verwenden; vorgeschrieben ist es nicht.`,
      `Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absendest.`,
    ],
  },
  {
    heading: "Folgen des Widerrufs",
    paragraphs: [
      `Wenn du diesen Vertrag widerrufst, erstatten wir dir alle Zahlungen, die wir von dir erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem die Mitteilung über deinen Widerruf bei uns eingegangen ist.`,
      `Für die Rückzahlung verwenden wir dasselbe Zahlungsmittel, das du bei der ursprünglichen Zahlung eingesetzt hast, es sei denn, wir haben mit dir ausdrücklich etwas anderes vereinbart. Für diese Rückzahlung berechnen wir dir keine Entgelte.`,
    ],
  },
  {
    heading: "Besonderheit bei Dienstleistungen",
    paragraphs: [
      `Hast du verlangt, dass wir mit der Leistung schon während der Widerrufsfrist beginnen, so zahlst du uns einen angemessenen Betrag, der dem Anteil der bis zu dem Zeitpunkt bereits erbrachten Leistungen im Vergleich zum vereinbarten Gesamtumfang entspricht. Dieser Anteil richtet sich nach dem Verhältnis des bis dahin angefallenen Aufwands zum Gesamtaufwand.`,
      `Dem entgegenstehende Rechte, insbesondere das Recht auf Minderung, bleiben unberührt.`,
    ],
    note:
      "Für die kostenlosen Inhalte dieser Website (Ratgeber, Rechner, Datenbank) besteht kein Widerrufsrecht: dort kommt kein Vertrag zustande.",
  },
  {
    heading: "Erlöschen des Widerrufsrechts",
    paragraphs: [
      `Bei Leistungen, die wir vollständig erbracht haben, erlischt das Widerrufsrecht, sobald wir mit der Ausführung begonnen haben, nachdem du dem ausdrücklich zugestimmt hast und du gleichzeitig bestätigt hast, dass du dein Widerrufsrecht mit vollständiger Erfüllung des Vertrags verlierst (§ 356 Abs. 5 BGB).`,
      `Solange wir die Leistung noch nicht vollständig erbracht haben, bleibt dein Widerrufsrecht bestehen.`,
    ],
  },
  {
    heading: "Muster-Widerrufsformular",
    paragraphs: [
      "Wenn du den Vertrag widerrufen willst, kannst du dieses Formular ausfüllen und an uns senden. Es ist nicht vorgeschrieben, erleichtert uns aber die Zuordnung.",
      "— — — — —",
      `An: ${widerrufProvider.name}, ${widerrufProvider.street}, ${widerrufProvider.zipCity}, E-Mail: ${widerrufProvider.email}`,
      "Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung: ______________________",
      "Bestellt am: ______________________",
      "Name der Verbraucherin/des Verbrauchers: ______________________",
      "Anschrift: ______________________",
      "Datum: ______________________",
      "Unterschrift (nur bei Mitteilung auf Papier): ______________________",
    ],
  },
];

/** Kurze Einordnung über dem Belehrungstext. */
export const widerrufIntro =
  `Diese Belehrung gilt für entgeltliche Leistungen, die du über ${site.name} beauftragt hast. ` +
  "Maßgeblich ist die deutsche Fassung dieser Widerrufsbelehrung.";
