// Vereinfachte Näherung an das Grundsicherungsgeld (früher Bürgergeld) nach SGB II
// (Stand der Parameter: Reformgesetz vom 27.3.2026, in Kraft ab 1. Juli 2026).
// Dient nur als grobe Schätzung, keine amtliche Berechnung.

import { hoechstbetragMiete } from "./wohngeld-calc";

// ---------- Regelbedarf (§ 20 SGB II), 2026 ----------
export const REGELBEDARF = {
  stufe1: 563, // alleinstehend / alleinerziehend
  stufe2: 506, // Partner in Bedarfsgemeinschaft
  stufe3: 451, // 18-24 Jahre, im Haushalt der Eltern / sonstige erwachsene Angehörige
  stufe4: 471, // 14-17 Jahre
  stufe5: 390, // 6-13 Jahre
  stufe6: 357, // 0-5 Jahre
};

export const SOFORTZUSCHLAG_KIND = 25; // gilt für Regelbedarfsstufen 3-6

export const KINDERGELD_DEFAULT = 259; // 2026

// Schonvermögen je Person, altersabhängig (§ 12 SGB II n.F., ab 1.7.2026, keine Karenzzeit mehr)
export function schonvermoegen(alter: number): number {
  if (alter <= 30) return 5000;
  if (alter <= 40) return 10000;
  if (alter <= 50) return 12500;
  return 20000;
}

export function regelbedarfKind(alter: number): { betrag: number; stufe: number } {
  if (alter >= 18 && alter <= 24) return { betrag: REGELBEDARF.stufe3, stufe: 3 };
  if (alter >= 14 && alter <= 17) return { betrag: REGELBEDARF.stufe4, stufe: 4 };
  if (alter >= 6 && alter <= 13) return { betrag: REGELBEDARF.stufe5, stufe: 5 };
  return { betrag: REGELBEDARF.stufe6, stufe: 6 }; // 0-5
}

// Erwerbstätigenfreibetrag § 11b Abs. 3 SGB II (vierstufig)
export function erwerbstaetigenfreibetrag(brutto: number, hatMinderjaehrigesKind: boolean): number {
  if (brutto <= 0) return 0;
  const obergrenze = hatMinderjaehrigesKind ? 1500 : 1200;
  let frei = Math.min(brutto, 100); // Grundfreibetrag bis 100 € voll frei
  if (brutto > 100) {
    frei += Math.max(0, Math.min(brutto, 520) - 100) * 0.2; // 100,01–520 €: 20 %
  }
  if (brutto > 520) {
    frei += Math.max(0, Math.min(brutto, 1000) - 520) * 0.3; // 520,01–1000 €: 30 %
  }
  if (brutto > 1000) {
    frei += Math.max(0, Math.min(brutto, obergrenze) - 1000) * 0.1; // 1000,01–1200/1500 €: 10 %
  }
  return frei; // Rest über der Obergrenze ist voll anrechenbar
}

export type CalcInput = {
  hasPartner: boolean;
  ageApplicant: number;
  agePartner: number;
  kidAges: number[];
  singleParent: boolean;
  pregnant: boolean;
  disability: boolean;
  kaltmiete: number;
  heizkosten: number;
  mietstufeIdx: number; // 0..6
  knowsOfficialLimit: boolean;
  officialLimit: number;
  applicantErwerb: number;
  applicantSonst: number;
  partnerErwerb: number;
  partnerSonst: number;
  childIncomes: number[]; // parallel to kidAges
  vermoegen: number;
};

export type CalcResult = {
  eligible: boolean;
  amount: number;
  householdSize: number;
  regelbedarfGesamt: number;
  mehrbedarf: number;
  kdu: number;
  kduCapped: boolean;
  angemessenheitsgrenze: number;
  usedOfficialLimit: boolean;
  gesamtbedarf: number;
  anrechenbaresEinkommen: number;
  schonvermoegenGesamt: number;
  vermoegen: number;
  vermoegenOk: boolean;
  applicantHasNoErwerb: boolean;
  partnerHasNoErwerb: boolean;
  hasKvPvHinweis: boolean;
};

export function calculateGrundsicherung(input: CalcInput): CalcResult {
  const kidAges = input.kidAges;
  const personen = 1 + (input.hasPartner ? 1 : 0) + kidAges.length;
  const hatMinderjaehrigesKind = kidAges.some((a) => a < 18);

  // --- Regelbedarf ---
  const rb1 = input.hasPartner ? REGELBEDARF.stufe2 : REGELBEDARF.stufe1;
  let regelbedarfGesamt = rb1;
  if (input.hasPartner) regelbedarfGesamt += REGELBEDARF.stufe2;
  kidAges.forEach((age) => {
    const { betrag } = regelbedarfKind(age);
    regelbedarfGesamt += betrag + SOFORTZUSCHLAG_KIND;
  });

  // --- Mehrbedarfe (§ 21 SGB II), bezogen auf den maßgeblichen Regelbedarf der antragstellenden Person (rb1) ---
  let mehrbedarf = 0;
  if (input.singleParent && kidAges.length > 0) {
    const unter7 = kidAges.some((a) => a < 7);
    const zweiUnter16 = kidAges.filter((a) => a < 16).length >= 2;
    let proz = kidAges.length * 12;
    if (unter7 || zweiUnter16) proz = Math.max(proz, 36);
    proz = Math.min(proz, 60);
    mehrbedarf += (rb1 * proz) / 100;
  }
  if (input.pregnant) mehrbedarf += rb1 * 0.17;
  if (input.disability) mehrbedarf += rb1 * 0.35;

  // --- Kosten der Unterkunft und Heizung (KdU) ---
  const kaltmiete = Math.max(0, input.kaltmiete);
  const heizkosten = Math.max(0, input.heizkosten);
  let kdu: number;
  let kduCapped: boolean;
  let angemessenheitsgrenze: number;
  const usedOfficialLimit = input.knowsOfficialLimit && input.officialLimit > 0;

  if (usedOfficialLimit) {
    angemessenheitsgrenze = input.officialLimit;
    kduCapped = kaltmiete > angemessenheitsgrenze;
    kdu = Math.min(kaltmiete, angemessenheitsgrenze) + heizkosten;
  } else {
    // Fallback: Wohngeld-Tabellenwert (§ 12 WoGG) zzgl. 10 % Sicherheitszuschlag als
    // defensible bundesweite Schätzung der örtlichen Angemessenheitsgrenze (BSG-Rechtsprechung
    // zum Fehlen eines schlüssigen Konzepts).
    angemessenheitsgrenze = hoechstbetragMiete(personen, input.mietstufeIdx) * 1.1;
    const roh = kaltmiete + heizkosten;
    kduCapped = roh > angemessenheitsgrenze;
    kdu = Math.min(roh, angemessenheitsgrenze);
  }

  const gesamtbedarf = regelbedarfGesamt + mehrbedarf + kdu;

  // --- Einkommensanrechnung (§ 11b SGB II) ---
  let anrechenbaresEinkommen = 0;

  const applicantErwerb = Math.max(0, input.applicantErwerb);
  const applicantFrei = erwerbstaetigenfreibetrag(applicantErwerb, hatMinderjaehrigesKind);
  anrechenbaresEinkommen += Math.max(0, applicantErwerb - applicantFrei);
  const applicantSonst = Math.max(0, input.applicantSonst);
  anrechenbaresEinkommen += applicantErwerb > 0 ? applicantSonst : Math.max(0, applicantSonst - 30);

  if (input.hasPartner) {
    const partnerErwerb = Math.max(0, input.partnerErwerb);
    const partnerFrei = erwerbstaetigenfreibetrag(partnerErwerb, hatMinderjaehrigesKind);
    anrechenbaresEinkommen += Math.max(0, partnerErwerb - partnerFrei);
    const partnerSonst = Math.max(0, input.partnerSonst);
    anrechenbaresEinkommen += partnerErwerb > 0 ? partnerSonst : Math.max(0, partnerSonst - 30);
  }

  input.childIncomes.forEach((k) => {
    anrechenbaresEinkommen += Math.max(0, k);
  });

  // --- Vermögensprüfung (§ 12 SGB II) ---
  let schonvermoegenGesamt = schonvermoegen(input.ageApplicant);
  if (input.hasPartner) schonvermoegenGesamt += schonvermoegen(input.agePartner);
  kidAges.forEach((age) => {
    schonvermoegenGesamt += schonvermoegen(age);
  });
  const vermoegen = Math.max(0, input.vermoegen);
  const vermoegenOk = vermoegen <= schonvermoegenGesamt;

  // --- Ergebnis ---
  const anspruchOhneVermoegen = Math.max(0, gesamtbedarf - anrechenbaresEinkommen);
  const eligible = vermoegenOk && anspruchOhneVermoegen >= 1;
  const amount = eligible ? Math.round(anspruchOhneVermoegen) : 0;

  const applicantHasNoErwerb = applicantErwerb <= 0;
  const partnerHasNoErwerb = input.hasPartner && Math.max(0, input.partnerErwerb) <= 0;
  const hasKvPvHinweis = eligible && (applicantHasNoErwerb || partnerHasNoErwerb);

  return {
    eligible,
    amount,
    householdSize: personen,
    regelbedarfGesamt: Math.round(regelbedarfGesamt * 100) / 100,
    mehrbedarf: Math.round(mehrbedarf * 100) / 100,
    kdu: Math.round(kdu * 100) / 100,
    kduCapped,
    angemessenheitsgrenze: Math.round(angemessenheitsgrenze * 100) / 100,
    usedOfficialLimit,
    gesamtbedarf: Math.round(gesamtbedarf * 100) / 100,
    anrechenbaresEinkommen: Math.round(anrechenbaresEinkommen * 100) / 100,
    schonvermoegenGesamt,
    vermoegen,
    vermoegenOk,
    applicantHasNoErwerb,
    partnerHasNoErwerb,
    hasKvPvHinweis,
  };
}
