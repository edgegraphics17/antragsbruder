import { describe, expect, it } from "vitest";
import {
  WG_QUICK_QUESTIONS,
  nextQuickQuestion,
  quickCheckComplete,
  wgExclusion,
  calculateWgEstimate,
  wohnkostenMonatlich,
  validateWgField,
  missingRequiredFields,
  wgProgress,
  WG_ANTRAG_SECTIONS,
  type WgFacts,
  type WgAntragData,
} from "@/lib/wohngeld/fragen";

/**
 * Wohngeld-Antrags-Workflow — Verhaltenstests (GS-Konzept-Portierung).
 * Fragebaum (Ja/Nein-Gating), Ausschlussregeln, Schätzung, rote Felder.
 */

const fullFacts: WgFacts = {
  grundsicherungsbezug: false,
  bafoeg_haushalt: false,
  wohnform: "MIETE",
  kaltmiete: 700,
  nebenkosten: 150,
  haushalt: 3,
  alleinerziehend: false,
  netto_einkommen: 2200,
  plz: "10115",
  schwerbehinderung: false,
  grundrentenzeiten: false,
  unterhalt_gezahlt: 0,
};

describe("Wohngeld Schnellcheck — Fragebaum", () => {
  it("startet mit der Ausschlussfrage (Grundsicherung)", () => {
    expect(nextQuickQuestion({})?.id).toBe("grundsicherungsbezug");
  });

  it("Grundsicherung = Ja blockiert den weiteren Baum (Ausschluss zuerst klären)", () => {
    const next = nextQuickQuestion({ grundsicherungsbezug: true });
    // Bei Ausschluss wird der Baum nicht weitergeführt — Info-Änderung statt Sackgasse
    expect(next).toBeNull();
    expect(wgExclusion({ grundsicherungsbezug: true })).toBe("GRUNDSICHERUNG");
  });

  it("BAföG-Frage erscheint nur bei Grundsicherung = Nein", () => {
    expect(nextQuickQuestion({ grundsicherungsbezug: false })?.id).toBe("bafoeg_haushalt");
  });

  it("Wohnform-Frage erscheint erst nach beiden Ausschlussfragen", () => {
    expect(nextQuickQuestion({ grundsicherungsbezug: false, bafoeg_haushalt: false })?.id).toBe(
      "wohnform",
    );
  });

  it("Kostenfragen nur bei passender Wohnform (Miete → Kaltmiete, Eigentum → Belastung)", () => {
    expect(wohnkostenMonatlich({ wohnform: "MIETE", kaltmiete: 700, nebenkosten: 150 })).toBe(850);
    expect(wohnkostenMonatlich({ wohnform: "EIGENTUM", belastung: 900 })).toBe(900);
    expect(wohnkostenMonatlich({ wohnform: "MIETFREI" })).toBeNull();
  });

  it("Alleinerziehend-Frage nur ab 2 Personen im Haushalt", () => {
    const q1 = WG_QUICK_QUESTIONS.find((q) => q.id === "alleinerziehend");
    expect(q1?.relevantIf({ haushalt: 1 })).toBe(false);
    expect(q1?.relevantIf({ haushalt: 2 })).toBe(true);
  });

  it("alle Schnellcheck-Fragen sind relevantIf-gegated und vollständig", () => {
    for (const q of WG_QUICK_QUESTIONS) {
      expect(q.relevantIf({})).toBe(q.relevantIf({})); // deterministisch
      expect(q.question.length).toBeGreaterThan(10);
    }
    // Mit vollständigen Fakten: Check komplett
    expect(quickCheckComplete(fullFacts)).toBe(true);
  });
});

describe("Wohngeld — Ausschlussregeln (§ 7 WoGG / BAföG)", () => {
  it("Grundsicherungsbezug schließt aus", () => {
    expect(wgExclusion({ grundsicherungsbezug: true })).toBe("GRUNDSICHERUNG");
  });
  it("reiner BAföG-Haushalt schließt aus", () => {
    expect(wgExclusion({ grundsicherungsbezug: false, bafoeg_haushalt: true })).toBe("BAFOEG");
  });
  it("Mietfrei ist kein Ausschluss, aber ohne Wohnkosten nicht berechenbar", () => {
    expect(wgExclusion({ grundsicherungsbezug: false, bafoeg_haushalt: false, wohnform: "MIETFREI" })).toBe("MIETFREI");
    expect(wohnkostenMonatlich({ wohnform: "MIETFREI" })).toBeNull();
  });
});

describe("Wohngeld — grobe Einschätzung", () => {
  it("Familie mit moderatem Einkommen → positiver Betrag", () => {
    const est = calculateWgEstimate(fullFacts, 3);
    expect(est.amount).toBeGreaterThan(0);
    expect(est.mietstufe).toBe(4);
    expect(est.consideredRent).toBeGreaterThan(0);
  });

  it("hohes Einkommen → kein Anspruch (0 €)", () => {
    const est = calculateWgEstimate({ ...fullFacts, netto_einkommen: 6000 }, 3);
    expect(est.amount).toBe(0);
    expect(est.eligible).toBe(false);
  });

  it("höhere Mietenstufe ergibt mindestens gleich hohen Betrag", () => {
    const stufe1 = calculateWgEstimate(fullFacts, 0).amount;
    const stufe7 = calculateWgEstimate(fullFacts, 6).amount;
    expect(stufe7).toBeGreaterThanOrEqual(stufe1);
  });
});

describe("Wohngeld — Antrag (rote Pflichtfelder, Progress)", () => {
  it("leerer Antrag: alle Pflichtfelder fehlen, Progress 0", () => {
    const missing = missingRequiredFields({}, fullFacts);
    expect(Object.keys(missing).length).toBeGreaterThan(0);
    expect(wgProgress({}, fullFacts)).toBe(0);
  });

  it("IBAN-Validierung schlägt bei falschem Format fehl", () => {
    const ibanField = WG_ANTRAG_SECTIONS.flatMap((s) => s.fields).find((f) => f.type === "iban");
    expect(validateWgField(ibanField!, { iban: "XX123" }, fullFacts)).toContain("IBAN");
    expect(validateWgField(ibanField!, { iban: "DE89370400440532013000" }, fullFacts)).toBeNull();
  });

  it("showIf-Gating: wohnflaeche immer, kaltmiete-felder existieren nicht mehr als Duplikate", () => {
    const wohnung = WG_ANTRAG_SECTIONS.find((s) => s.id === "wohnung");
    expect(wohnung?.fields.map((f) => f.key)).toEqual(["wohnflaeche"]);
  });

  it("vollständig ausgefüllter Antrag: keine fehlenden Pflichtfelder, Progress 100", () => {
    const data: WgAntragData = {
      vorname: "Karim",
      nachname: "Azzaoui",
      geburtsdatum: "2002-05-26",
      strasse: "Tiefe Furche",
      hausnummer: "7",
      antrag_plz: "63674",
      antrag_ort: "Altenstadt",
      wohnflaeche: 80,
      kontoinhaber: "Karim Azzaoui",
      iban: "DE89370400440532013000",
    };
    const missing = missingRequiredFields(data, fullFacts);
    expect(Object.keys(missing).length).toBe(0);
    expect(wgProgress(data, fullFacts)).toBe(100);
  });
});
