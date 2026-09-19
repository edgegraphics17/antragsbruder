// ============================================================
// KDU LOCAL RULE STORE — Örtliche Angemessenheitsgrenzen (Playbook §12.3)
// KDU_RULE: Bruttokaltmiete-Grenzen je Kommune und Haushaltsgröße,
// versioniert mit Quelle und Prüfdatum. Heizkosten sind NICHT enthalten
// (§ 22 SGB II: separate Betrachtung).
//
// Datenstand: 2026-09-19, verifiziert gegen die amtlichen Jobcenter-Quellen
// (sourceUrl je Regel). Eine fehlende Regel → null → Engine liefert
// ESTIMATED + KDU_LOCAL_RULE_MISSING, es wird niemals ein Betrag erfunden.
// ============================================================

export interface KduRule {
  municipality: string;
  /** PLZ-Präfixe (2–3 Stellen), die diese Regel abdecken */
  plzPrefixes: string[];
  /** Bruttokaltmiete-Grenze je Haushaltsgröße (1-basiert) */
  limitsByHouseholdSize: Record<number, number>;
  /** Zuschlag je weiterer Person oberhalb der größten Tabelle (falls amtlich) */
  additionalPerPerson?: number;
  sourceUrl: string;
  /** Seit wann gilt die Grenze lt. Quelle (YYYY-MM) */
  validFrom: string;
  retrievedAt: string;
}

export const KDU_RULES_2026: KduRule[] = [
  {
    municipality: 'Aachen',
    plzPrefixes: ['520', '521', '522'],
    limitsByHouseholdSize: { 1: 543.0, 2: 657.15, 3: 782.4, 4: 955.7, 5: 1122.1, 6: 1275.1 },
    additionalPerPerson: 153.0,
    sourceUrl: 'https://www.jobcenter-staedteregion-aachen.de/geldleistungen/geld-zum-wohnen',
    validFrom: '2026-01',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Berlin',
    plzPrefixes: ['10', '11', '12', '13', '14'],
    limitsByHouseholdSize: { 1: 449.0, 2: 543.4, 3: 668.8, 4: 752.4, 5: 903.72, 6: 1010.04 },
    additionalPerPerson: 106.32,
    sourceUrl:
      'https://sozialrecht.berlin.de/kategorie/ausfuehrungsvorschriften/av-wohnen-571939-v9-anlage-1.html',
    validFrom: '2026-01',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Bochum',
    plzPrefixes: ['447', '448'],
    limitsByHouseholdSize: { 1: 439.25, 2: 546.26, 3: 654.88, 4: 791.16, 5: 964.3, 6: 1081.3 },
    additionalPerPerson: 117.0,
    sourceUrl: 'https://jobcenter-bochum.de/geld-wohnen/wohnung-heizung',
    validFrom: '2025-07',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Bremen',
    plzPrefixes: ['28'],
    limitsByHouseholdSize: { 1: 568.0, 2: 593.0, 3: 731.0, 4: 833.0, 5: 1027.0, 6: 1245.0 },
    additionalPerPerson: 114.0,
    sourceUrl: 'https://www.jobcenter-bremen.de/finanzielle-hilfe/rund-ums-wohnen',
    validFrom: '2026-03',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Chemnitz',
    plzPrefixes: ['091', '092'],
    limitsByHouseholdSize: { 1: 313.44, 2: 388.2, 3: 465.0, 4: 531.25, 5: 600.4, 6: 663.6 },
    additionalPerPerson: 63.2,
    sourceUrl: 'https://jobcenter-chemnitz.de/wohnen-und-miete/',
    validFrom: '2025-09',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Dortmund',
    plzPrefixes: ['440', '441', '442', '443'],
    limitsByHouseholdSize: { 1: 610.0, 2: 740.0, 3: 910.0, 4: 1110.0, 5: 1340.0, 6: 1500.0 },
    sourceUrl: 'https://jobcenterdortmund.de/artikel/miete-heiz-betriebskosten',
    validFrom: '2026-07',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Dresden',
    plzPrefixes: ['010', '011', '012', '013'],
    limitsByHouseholdSize: { 1: 450.5, 2: 557.64, 3: 715.73, 4: 813.85, 5: 962.5, 6: 1079.1 },
    additionalPerPerson: 116.6,
    sourceUrl:
      'https://www.dresden.de/de/rathaus/dienstleistungen/kosten-unterkunft-heizung-d115.php',
    validFrom: '2025-01',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Duisburg',
    plzPrefixes: ['470', '471', '472'],
    limitsByHouseholdSize: { 1: 446.0, 2: 538.2, 3: 644.0, 4: 776.15, 5: 947.1, 6: 1076.25 },
    additionalPerPerson: 129.15,
    sourceUrl: 'https://jobcenter-du.de/geldleistungen/',
    validFrom: '2025-08',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Düsseldorf',
    plzPrefixes: ['402', '404', '405', '406'],
    limitsByHouseholdSize: { 1: 565.0, 2: 654.0, 3: 803.0, 4: 1038.0, 5: 1363.0, 6: 1549.0 },
    additionalPerPerson: 186.0,
    sourceUrl:
      'https://www.jobcenter-duesseldorf.de/finanzen/rund-ums-wohnen/geld-fuer-wohnung-und-heizung/',
    validFrom: '2026-07',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Essen',
    plzPrefixes: ['450', '451', '452', '453'],
    limitsByHouseholdSize: { 1: 499.0, 2: 649.0, 3: 798.5, 4: 948.5, 5: 1098.0, 6: 1198.0 },
    additionalPerPerson: 100.0,
    sourceUrl:
      'https://www.essen.de/leben/soziales_und_arbeit/jobcenter/arbeitslosengeld_ii/kosten_der_unterkunft_und_heizung.de.html',
    validFrom: '2026-09',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Frankfurt am Main',
    plzPrefixes: ['603', '604', '605', '659'],
    limitsByHouseholdSize: { 1: 786.0, 2: 903.0, 3: 1078.0, 4: 1219.0, 5: 1360.0, 6: 1501.0 },
    additionalPerPerson: 158.0,
    sourceUrl: 'https://www.jc-frankfurt.de/geld/wohnen-in-frankfurt',
    validFrom: '2024-06',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Gelsenkirchen',
    plzPrefixes: ['458'],
    limitsByHouseholdSize: { 1: 424.0, 2: 525.0, 3: 636.0, 4: 787.0, 5: 928.0, 6: 1032.0 },
    additionalPerPerson: 104.0,
    sourceUrl: 'https://www.jobcenter-gelsenkirchen.de/kosten-fuer-unterkunft-und-heizung',
    validFrom: '2025-01',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Hamburg',
    plzPrefixes: ['20', '21', '22'],
    limitsByHouseholdSize: { 1: 574.0, 2: 697.8, 3: 860.25, 4: 1036.8, 5: 1480.5, 6: 1668.0 },
    additionalPerPerson: 208.5,
    sourceUrl:
      'https://www.hamburg.de/politik-und-verwaltung/behoerden/sozialbehoerde/themen/soziales/sozialhilfe/kosten-der-unterkunft-41098',
    validFrom: '2026-04',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Hannover',
    plzPrefixes: ['301', '302', '303', '304', '305', '306'],
    limitsByHouseholdSize: { 1: 499.0, 2: 634.0, 3: 755.0, 4: 901.0, 5: 1022.0 },
    sourceUrl:
      'https://www.hannover.de/Leben-in-der-Region-Hannover/Soziales/Jobcenter-Region-Hannover',
    validFrom: '2026-07',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Köln',
    plzPrefixes: ['506', '507', '508', '509', '510', '511'],
    limitsByHouseholdSize: { 1: 677.0, 2: 820.0, 3: 976.0, 4: 1139.0, 5: 1302.0, 6: 1466.0 },
    additionalPerPerson: 164.0,
    sourceUrl: 'https://www.jobcenterkoeln.de/geld-zum-wohnen/',
    validFrom: '2025-01',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Leipzig',
    plzPrefixes: ['041', '042', '043', '044'],
    limitsByHouseholdSize: { 1: 358.0, 2: 466.0, 3: 603.0, 4: 690.0, 5: 802.0 },
    sourceUrl: 'https://jobcenter-leipzig.de/',
    validFrom: '2026-09',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'München',
    plzPrefixes: ['80', '81'],
    limitsByHouseholdSize: { 1: 911.0, 2: 1108.0, 3: 1286.0, 4: 1569.0, 5: 1939.0, 6: 2188.0 },
    additionalPerPerson: 310.0,
    sourceUrl: 'https://stadt.muenchen.de/infos/mietobergrenzen.html',
    validFrom: '2026-01',
    retrievedAt: '2026-09-19',
  },
  {
    municipality: 'Wuppertal',
    plzPrefixes: ['421', '422', '423'],
    limitsByHouseholdSize: { 1: 466.0, 2: 568.1, 3: 699.2, 4: 830.3, 5: 933.9, 6: 1061.25 },
    additionalPerPerson: 127.35,
    sourceUrl:
      'https://jobcenter.wuppertal.de/grundsicherung/content/geld-fuers-wohnen-und-die-heizung.php',
    validFrom: '2025-01',
    retrievedAt: '2026-09-19',
  },
];

export interface ResolvedKduRule {
  rule: KduRule;
  /** Bruttokaltmiete-Grenze für die Haushaltsgröße */
  abstractColdCostLimit: number;
  householdSize: number;
}

/**
 * Löst die örtliche Angemessenheitsgrenze anhand PLZ + Haushaltsgröße auf.
 * Keine Regel für die PLZ oder keine Angabe für die Haushaltsgröße → null
 * (die Engine behandelt das als KDU_LOCAL_RULE_MISSING).
 */
export function resolveKduRule(
  plz: string | undefined,
  householdSize: number,
  onDate = '2026-12-31'
): ResolvedKduRule | null {
  if (!plz || !/^\d{5}$/.test(plz) || !Number.isFinite(householdSize) || householdSize < 1) {
    return null;
  }
  const rule = KDU_RULES_2026.find((r) =>
    r.plzPrefixes.some((p) => plz.startsWith(p))
  );
  if (!rule) return null;

  // Zeitliche Gültigkeit (validFrom = "YYYY-MM")
  if (onDate.slice(0, 7) < rule.validFrom) return null;

  const size = Math.max(1, Math.floor(householdSize));
  const direct = rule.limitsByHouseholdSize[size];
  if (direct !== undefined) {
    return { rule, abstractColdCostLimit: direct, householdSize: size };
  }

  const sizes = Object.keys(rule.limitsByHouseholdSize)
    .map(Number)
    .sort((a, b) => a - b);
  const maxSize = sizes[sizes.length - 1];
  if (size > maxSize && rule.additionalPerPerson !== undefined) {
    return {
      rule,
      abstractColdCostLimit:
        Math.round(
          (rule.limitsByHouseholdSize[maxSize] +
            rule.additionalPerPerson * (size - maxSize)) *
            100
        ) / 100,
      householdSize: size,
    };
  }

  // Zwischengrößen ohne Tabelle → bewusst null (keine Interpolation erfinden)
  return null;
}
