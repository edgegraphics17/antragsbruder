// ============================================================
// CRISIS KEYWORD DETECTION — Scant Dokumenttext auf Krisenindikatoren
// Ergänzt den bestehenden CrisisEngine (der nur fact-basierte Scan hat)
// ============================================================

/**
 * Keywords und ihre zugehörigen Krisen-Indikator-Codes.
 * Diese Codes werden als 'crisis.indicators' Fact gespeichert
 * und vom CrisisEngine ausgewertet.
 */
export const CRISIS_KEYWORDS: Record<string, string[]> = {
  // Geld/Kredit/Arbeitslosigkeit
  MONEY_SHORT: [
    'arbeitslos', 'arbeitslosigkeit', 'kündigung', 'kündigungs',
    'arbeitslosengeld', 'bußgeld', 'strafe', 'schulden', 'schuldenberg',
    'zahlungsunfähigkeit', 'konkurs', 'insolvenz', 'überschuldet',
    'geldproblem', 'geldnot', 'armut', 'einkommensverlust',
    'einkommen weg', 'job verloren', 'arbeitsplatz weg',
    'weniger verdienen', 'lohn gekürzt', 'gehalt gekürzt',
    'arbeitszeit reduziert', 'kurzarbeit', 'freiwillig entlassen',
    'auf stocken', 'kauf auf ab', 'ratenzahlung nicht möglich',
  ],
  // Miete/Mieterhöhung/Zwangsvolleitung
  RENT_ARREARS: [
    'mietrückstand', 'miete offen', 'miete nicht bezahlt',
    'mietenschulden', 'mietzahlung fehlend', 'miete hinterher',
    'rückstände bei miete', 'mieterückstand', 'mieten rückständig',
  ],
  RENT_UNPAYABLE: [
    'miete zu hoch', 'miete nicht mehr zahlbar', 'miete unbezahlbar',
    'mietprüfung', 'mietenanpassung', 'mieterhöhung', 'mieterhöhungsklage',
    'mietnebenkosten', 'kaltmiete zu hoch', 'wohnkosten überlasten',
    'wohnkostenüberschreitung', 'mietlasten', 'mietbelastung',
  ],
  TERMINATION_THREAT: [
    'kündigung bedroht', 'kündigung angedroht', 'abmeldung droht',
    'bestellung zur kündigung', 'kündigung kommt', 'kündigung droht',
    'wohnungsentziehung', 'raummeldung', 'abmeldung wegen miete',
    'ablaufmiete', 'zeitlicher kündigungsvorbehalt',
    'duldungende miete', '-toleranzmiete ende', 'toleranz ende',
  ],
  TERMINATION_RECEIVED: [
    'kündigung erhalten', 'kündigung zugeschickt', 'kündigung kommt',
    'schriftliche kündigung', 'mieterkündigung', 'räume ich weg',
    'ich soll ausziehen', 'mietvertrag gekündigt', 'kündigung hat',
    'kündigung ist da', 'wohnung kündigen', 'kündigung schriftlich',
  ],
  EVICTION_LAWSUIT: [
    'ziegelhaftung', 'angezeigte kündigung', 'gerichtliche kündigung',
    'krissverfahren', 'ausweisung', 'raumweisung', 'gericht entschieden',
    'gericht hat entschieden', 'klage auf raumung', 'ausweisung gekommen',
    'vollstreckungsbeamter', 'raumsieg', 'richter hat entschieden',
    'mieterklage', 'räumungsklage', 'zwangsvolleitung', 'zwangsvollstreckung',
  ],
  UTILITY_SHUTOFF: [
    'strom aus', 'strom abgestellt', 'strom gesperrt', 'stromd aus',
    'strom abgeklemmt', 'strömung', 'energie abgestellt',
    'strom aussteuerung', 'stromgesellschaft', 'strom sperre',
    'wasser abgestellt', 'wasser aus', 'strom und wasser weg',
    'heizung aus', 'heizung abgestellt', 'heizung gesperrt',
    'stromrechnung nicht bezahlt', 'strom preis zu hoch',
  ],
  INSURANCE_UNCLEAR: [
    'versicherung', 'krankenkasse', 'gesetzliche versicherung',
    'private versicherung', 'unfallversicherung', 'haftpflicht',
    'krankenversicherung', 'pflegeversicherung', 'rentenversicherung',
    'versicherungsfrage', 'versicherungsschutz', 'versichert',
  ],
};

/**
 * Scantext auf Krisen-Keywords. Gibt eindeutige Indikator-Codes zurück.
 * Case-insensitive, Wörterbuchtrennung berücksichtigt.
 */
export function scanTextForCrisis(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  
  const lower = text.toLowerCase();
  const found: string[] = [];
  const seen = new Set<string>();

  for (const [indicator, keywords] of Object.entries(CRISIS_KEYWORDS)) {
    for (const keyword of keywords) {
      if (seen.has(indicator)) break; // Einmal pro Indikator genug
      // Wortstersuch oder Teilwort-Match
      const regex = new RegExp(`\\b${escapeRegex(keyword)}`, 'i');
      if (regex.test(lower)) {
        found.push(indicator);
        seen.add(indicator);
        break;
      }
    }
  }

  return found;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Zusammenführt Keyword-Erkennung aus Dokumenttext mit bestehenden
 * crisis.indicators Facts, ohne Duplikate zu erzeugen.
 */
export function mergeCrisisIndicators(
  existing: string[] | undefined,
  fromText: string[]
): string[] {
  const base = new Set(existing || []);
  for (const i of fromText) base.add(i);
  return Array.from(base);
}
