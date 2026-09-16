// ============================================================
// DOCUMENT CATEGORIZER — Regelbasiert + Keyword-Matching (MVP)
// ============================================================
// Kategorisiert hochgeladene Dokumente nach Typ
// (Lohnzettel, Mietvertrag, Kündigung, …) ohne externe API.

export type DocumentCategory =
  | 'LOHNZETTEL'
  | 'MIETVERTRAG'
  | 'KUÜDIGUNG'
  | 'GEHALTSBONUS'
  | 'SONSTIGE_GEHA LTS'
  | 'KINDERGELD_BESCHEID'
  | 'SCHULZEUGNIS'
  | 'AUSBILDUNGSVERTRAG'
  | 'PERSONALAUSWEIS'
  | 'KONTOAUSZUG'
  | 'ANDERES';

export interface CategorizationResult {
  category: DocumentCategory;
  confidence: number; // 0..1
  matchedSignals: string[];
  suggestedApplications: string[]; // BenefitType[]
  reClassificationHint?: string; // falls Mehrdeutigkeit
}

// ---------- Signal-Definitionen ----------
// Jedes Signal: { keywords[], patterns[], mustAll?: true } –
// alle Keywords müssen vorkommen, sonst Match.

const SIGNALS: Array<{
  category: DocumentCategory;
  signals: Array<{ keywords: string[]; patterns?: RegExp[]; mustAll?: boolean }>;
  applications: string[];
  priority: number; // niedriger = wichtiger
}> = [
  // Lohnzettel
  {
    category: 'LOHNZETTEL',
    signals: [
      {
        keywords: ['Lohnzettel', 'gehalt', 'abrechnung', 'brutto', 'netto', 'steuerklasse',
                   'kirche', 'arbeitgeber', 'arbeitsvertrag', 'geld', 'lohn', 'liste', 'posten'],
        patterns: [/hr\s*\h?aupt-?/i, /\b\d{1,2}\s*[\.\s]\s*\d{3,4}\s*[\.\s]\s*\d{3,4}\b/],
      },
    ],
    applications: ['ALG1', 'GRUNDSICHERUNG'],
    priority: 1,
  },
  // Mietvertrag
  {
    category: 'MIETVERTRAG',
    signals: [
      {
        keywords: ['mietvertrag', 'mietrecht', 'miete', 'kaltmiete', 'nebenkosten',
                   'heizkosten', 'mietpreisbremse', 'civ', 'mieter', 'vermieter',
                   'mietdauer', 'kaution', 'briefmarken', 'vorratskiller'],
        patterns: [/§\s*\d{1,2}\s*[a-z]?\s*miet/i],
      },
    ],
    applications: ['GRUNDSICHERUNG', 'WOHNGELD', 'KINDERZUSCHLAG', 'UNTERHALTSVORSCHUSS'],
    priority: 2,
  },
  // Kündigung
  {
    category: 'KUÜDIGUNG',
    signals: [
      {
        keywords: ['kündigung', 'kündigungsschreiben', 'arbeitsplatz', 'arbeitsverhältnis',
                   'kündigungsschutz', 'missbrauch', 'zum nächsten monat', 'letzter Arbeitstag',
                   'aufhebungsvertrag', 'aufhebung'],
        patterns: [/dienstbesprechung/i, /kündigungsfrist\s*\d+/i],
      },
    ],
    applications: ['ALG1', 'GRUNDSICHERUNG'],
    priority: 1,
  },
  // Kindergeld-Bescheid
  {
    category: 'KINDERGELD_BESCHEID',
    signals: [
      {
        keywords: ['kindergeld', 'familienkasse', 'kindergeldnummer', 'kind-',
                   'bescheid', 'guillestro', 'kipp', 'bam'],
        patterns: [/kindergeld\s*\d{6,}/i],
      },
    ],
    applications: ['KINDEGELD', 'KINDERZUSCHLAG'],
    priority: 3,
  },
  // Schulzeugnis / Immatrikulationsbescheinigung
  {
    category: 'SCHULZEUGNIS',
    signals: [
      {
        keywords: ['schulzeugnis', 'zeugnis', 'schule', 'abitur', 'realschule',
                   'gymnasium', 'lehre', 'ausbildung', 'immatrikulationsbescheinigung',
                   'hochschule', 'studiengang', 'semester'],
        patterns: [/\bnote\s*\d{1,2}\/\d{1,2}\b/i],
      },
    ],
    applications: ['ALG1', 'KINDEGELD'],
    priority: 4,
  },
  // Ausbildungsvertrag
  {
    category: 'AUSBILDUNGSVERTRAG',
    signals: [
      {
        keywords: ['ausbildungsvertrag', 'ausbildungsvergütung', 'lehrling', 'praktikum',
                   'duale ausbildung', 'berufsschule', 'lehrbetrieb', 'verbe', 'ita'],
        patterns: [/ausbildungsvergütung\s*\d+/i],
      },
    ],
    applications: ['ALG1', 'KINDEGELD'],
    priority: 4,
  },
  // Personalausweis
  {
    category: 'PERSONALAUSWEIS',
    signals: [
      {
        keywords: ['personalausweis', 'ausweisnummer', 'ausweis', 'staatsbürger',
                   'ausweisdokument', 'hoehe', 'gueltig', 'geboren'],
        patterns: [], // allein durch keywords okay
      },
    ],
    applications: [],
    priority: 10,
  },
  // Kontoauszug
  {
    category: 'KONTOAUSZUG',
    signals: [
      {
        keywords: ['kontoauszug', 'konto', 'kontostand', 'bank', 'blz', 'konto-nr',
                   'gebühren', 'saldo', 'überweisung', 'einzug', 'auszug'],
        patterns: [],
      },
    ],
    applications: ['GRUNDSICHERUNG'],
    priority: 5,
  },
  // Gehaltsbonus
  {
    category: 'GEHALTSBONUS',
    signals: [
      {
        keywords: ['bonus', 'prämie', 'vergütung', 'aufwärts', 'lohnzahlung'],
        patterns: [],
      },
    ],
    applications: ['ALG1', 'GRUNDSICHERUNG'],
    priority: 6,
  },
];

// ---------- Kategorisierungsfunktion ----------

export function categorizeDocument(
  rawText: string,
  filename: string,
): CategorizationResult {
  const lowered = rawText.toLowerCase();
  const fnameLower = filename.toLowerCase();

  // Signal-Matches sammeln
  const matchedSignals: Array<{
    category: DocumentCategory;
    keywords: string[];
    confidence: number;
    applications: string[];
  }> = [];

  for (const entry of SIGNALS) {
    for (const sig of entry.signals) {
      const kwHitCount = sig.keywords.filter((kw) =>
        lowered.includes(kw.toLowerCase()),
      ).length;
      const minRequired = sig.mustAll ? sig.keywords.length : 1;

      if (kwHitCount < minRequired) continue;

      // Pattern-Match
      let patternHit = 0;
      if (sig.patterns) {
        for (const p of sig.patterns) {
          if (p.test(lowered)) patternHit++;
        }
      }

      // Konfidenz: Verhältnis Keyword-Matches zu erforderlichen
      const kwRatio = kwHitCount / Math.max(minRequired, 1);
      const patternRatio = sig.patterns && sig.patterns.length > 0
        ? patternHit / sig.patterns.length
        : 1;

      const confidence = Math.min(1, 0.5 * kwRatio + 0.5 * patternRatio);

      matchedSignals.push({
        category: entry.category,
        keywords: sig.keywords.filter((kw) =>
          lowered.includes(kw.toLowerCase()),
        ),
        confidence,
        applications: entry.applications,
      });
    }
  }

  // Sortiere nach Konfidenz; nimm das Beste
  matchedSignals.sort((a, b) => b.confidence - a.confidence);

  const best = matchedSignals[0];

  if (!best || best.confidence < 0.35) {
    return {
      category: 'ANDERES',
      confidence: 0,
      matchedSignals: [],
      suggestedApplications: [],
      reClassificationHint: 'Kein starker Signal-Status; manuelle Prüfung empfohlen.',
    };
  }

  // Mehrdeutigkeit? Zwei Kategorien nahe Konfidenz → Hinweis
  let hint: string | undefined;
  if (matchedSignals.length > 1) {
    const second = matchedSignals[1];
    if (second && second.confidence > 0.3) {
      hint = `Möglicherweise auch "${second.category}" (Konfidenz ${Math.round(second.confidence * 100)}%). Bitte prüfen.`;
    }
  }

  return {
    category: best.category,
    confidence: Math.min(1, best.confidence),
    matchedSignals: best.keywords,
    suggestedApplications: best.applications,
    reClassificationHint: hint,
  };
}

// ---------- Hilfsfunktionen ----------

function entryPriority(cat: DocumentCategory): number {
  const entry = SIGNALS.find((e) => e.category === cat);
  return entry ? entry.priority : 50;
}

/**
 * Map von Dokument-Kategorie auf Liste von Benefit-Typen,
 * die dieses Dokument typischerweise benötigen.
 */
export function categoryToApplications(category: DocumentCategory): string[] {
  const entry = SIGNALS.find((e) => e.category === category);
  return entry ? entry.applications : [];
}

/**
 * Extrahiert den Dateinamen-Text aus dem filename-Eintrag,
 * z.B. "Lohnzettel_Firma_2026.pdf" → "Lohnzettel_Firma_2026".
 * Bei Bedarf auch direkt als Text-Signal verwenden.
 */
export function filenameToSignal(filename: string): string {
  // Entferne Endung
  return filename.replace(/\.[^.]+$/, '');
}
