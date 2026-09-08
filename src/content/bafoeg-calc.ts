// Vereinfachte, aber an den §§ 11–13, 21, 23, 25, 29 BAföG orientierte Näherung
// für Studierende an Hochschulen. Stand der Parameter: 1. Januar 2026
// (29. BAföGÄndG vom 1.8.2024, Freibetrag eigenes Einkommen indexiert an der
// Minijob-Grenze 2026 nach § 23 Abs. 1 Nr. 2, Abs. 6 BAföG).
// Dient nur als grobe Schätzung, keine amtliche Berechnung und keine
// Rechtsberatung. BAföG ist Bundesrecht und wird bundesweit einheitlich
// berechnet – das Bundesland spielt für die Höhe keine Rolle, nur dafür,
// welches Amt für Ausbildungsförderung zuständig ist.

// § 12 Abs. 1 Nr. 2, Abs. 2 BAföG – Bedarfssätze für Studierende an Hochschulen
const GRUNDBEDARF = 475;
const WOHNPAUSCHALE_BEI_ELTERN = 59;
const WOHNPAUSCHALE_EIGENE_WOHNUNG = 380;
// § 13a BAföG – Zuschlag zu Kranken- und Pflegeversicherungsbeiträgen
const KV_ZUSCHLAG = 102;
const PV_ZUSCHLAG = 35;

// § 23 Abs. 1 Nr. 2 BAföG – anrechnungsfreier Betrag vom eigenen Einkommen,
// gekoppelt an die Minijob-Grenze (2026: 603 €/Monat)
const EIGENES_EINKOMMEN_FREIBETRAG = 603;
// Grober Abschlag für Werbungskosten- und Sozialversicherungspauschale
// (§ 21 BAföG) auf den Teil des Nebenjob-Einkommens oberhalb der Minijob-Grenze
const EIGENES_EINKOMMEN_ANRECHNUNGSFAKTOR = 0.8;

// § 29 Abs. 1, 3 BAföG – Vermögensfreibeträge
const VERMOEGENSFREIBETRAG_UNTER_30 = 15000;
const VERMOEGENSFREIBETRAG_AB_30 = 45000;
// Vereinfachung: übersteigendes Vermögen wird auf einen 12-monatigen
// Bewilligungszeitraum umgelegt statt einmalig abgezogen.
const BEWILLIGUNGSZEITRAUM_MONATE = 12;

// § 25 Abs. 1 BAföG – Grundfreibeträge vom Elterneinkommen
export type Elternstatus = "verheiratet" | "getrennt" | "einElternteil";
const ELTERN_GRUNDFREIBETRAG: Record<Elternstatus, number> = {
  verheiratet: 2540,
  getrennt: 1690 + 1690,
  einElternteil: 1690,
};

// § 25 Abs. 3 Nr. 2 BAföG – Erhöhung je Kind/Unterhaltsberechtigtem, das/der
// selbst keine förderungsfähige Ausbildung macht
const ELTERN_FREIBETRAG_JE_KIND_OHNE_AUSBILDUNG = 770;

export type CalcInput = {
  // Step 1 – persönliche Situation
  livesWithParents: boolean;
  selfInsured: boolean; // eigene KV/PV, nicht familienversichert
  parentIndependent: boolean; // elternunabhängig nach § 11 Abs. 3 BAföG

  // Step 2 – Eltern (nur relevant wenn !parentIndependent)
  parentStatus: Elternstatus;
  parentNetIncome: number; // gemeinsames/relevantes monatliches Netto der Eltern
  siblingsNotInTraining: number; // Geschwister ohne eigene förderfähige Ausbildung
  siblingsInTrainingCount: number; // Geschwister (inkl. dir) gleichzeitig gefördert

  // Step 3 – eigenes Einkommen & Vermögen
  age: number;
  ownGrossIncome: number; // monatliches Bruttoeinkommen aus Nebenjob
  assets: number; // eigenes Vermögen (Konten, Wertpapiere etc.)
};

export type CalcResult = {
  eligible: boolean;
  amount: number;
  bedarf: number;
  parentDeduction: number;
  ownIncomeDeduction: number;
  assetDeduction: number;
};

export function calculateBafoeg(input: CalcInput): CalcResult {
  const wohnpauschale = input.livesWithParents ? WOHNPAUSCHALE_BEI_ELTERN : WOHNPAUSCHALE_EIGENE_WOHNUNG;
  const versicherungszuschlag = input.selfInsured ? KV_ZUSCHLAG + PV_ZUSCHLAG : 0;
  const bedarf = GRUNDBEDARF + wohnpauschale + versicherungszuschlag;

  // § 25 Abs. 1, 3, 4 + § 11 Abs. 4 BAföG
  let parentDeduction = 0;
  if (!input.parentIndependent) {
    const siblingsOhne = Math.max(0, Math.round(input.siblingsNotInTraining));
    const geteiltDurch = Math.max(1, Math.round(input.siblingsInTrainingCount));
    const freibetrag = ELTERN_GRUNDFREIBETRAG[input.parentStatus] + siblingsOhne * ELTERN_FREIBETRAG_JE_KIND_OHNE_AUSBILDUNG;
    const uebersteigend = Math.max(0, input.parentNetIncome - freibetrag);
    const anrechnungssatzProzent = Math.max(0, 50 - 5 * siblingsOhne);
    const gesamtAnrechnung = uebersteigend * (anrechnungssatzProzent / 100);
    parentDeduction = gesamtAnrechnung / geteiltDurch;
  }

  // § 21, § 23 Abs. 1 Nr. 2 BAföG
  const einkommenUeberschuss = Math.max(0, input.ownGrossIncome - EIGENES_EINKOMMEN_FREIBETRAG);
  const ownIncomeDeduction = einkommenUeberschuss * EIGENES_EINKOMMEN_ANRECHNUNGSFAKTOR;

  // § 29 BAföG
  const vermoegensfreibetrag = input.age >= 30 ? VERMOEGENSFREIBETRAG_AB_30 : VERMOEGENSFREIBETRAG_UNTER_30;
  const vermoegensueberschuss = Math.max(0, input.assets - vermoegensfreibetrag);
  const assetDeduction = vermoegensueberschuss / BEWILLIGUNGSZEITRAUM_MONATE;

  const roh = bedarf - parentDeduction - ownIncomeDeduction - assetDeduction;
  const amount = Math.max(0, Math.min(bedarf, Math.round(roh)));

  return {
    eligible: amount > 0,
    amount,
    bedarf: Math.round(bedarf),
    parentDeduction: Math.round(parentDeduction),
    ownIncomeDeduction: Math.round(ownIncomeDeduction),
    assetDeduction: Math.round(assetDeduction),
  };
}
