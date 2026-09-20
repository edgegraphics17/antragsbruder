import { describe, expect, it } from "vitest";
import { matchBenefits, topRecommendations } from "@/lib/benefits/radar";
import {
  FOERDER_QUESTIONS,
  nextQuestion,
  bogenComplete,
  relevantOpenQuestions,
  type FoerderFacts,
} from "@/lib/benefits/foerderprofil";

/**
 * Förderungs-Radar v2 — Verhaltenstests gegen die übertertigte
 * Falsch-Empfehlung (Migrationsberatung/Sprachförderung/Bildungspaket
 * für Nutzer, auf die das nicht zutrifft).
 */

const profile = (p: Partial<Parameters<typeof matchBenefits>[0]>): Parameters<typeof matchBenefits>[0] => ({
  employmentStatus: null,
  housingType: null,
  childrenCount: null,
  ...p,
});

describe("Radar v2 — Kernregeln", () => {
  it("STUDENT bekommt KEINE Migrationsberatung mehr (früher: Tag-Koinzidenz)", () => {
    const result = matchBenefits(
      { employmentStatus: "STUDENT", housingType: null, childrenCount: 0 },
      [],
    );
    const ids = [...result.qualified, ...result.potential].map((m) => m.benefit.id);
    expect(ids).not.toContain("beratung_migranten");
    expect(ids).not.toContain("deutschkurs");
  });

  it("Migrationshintergrund per Förder-Profil schaltet Migrationsleistungen frei", () => {
    const result = matchBenefits(
      profile({
        employmentStatus: "EMPLOYED",
        housingType: "RENT",
        childrenCount: 0,
        facts: { migrationshintergrund: true },
      }),
      [],
    );
    const ids = [...result.qualified, ...result.potential].map((m) => m.benefit.id);
    expect(ids).toContain("beratung_migranten");
  });

  it("ohne Migrationshintergrund (beantwortet) sind Migrationsleistungen ausgeschlossen", () => {
    const result = matchBenefits(
      profile({
        employmentStatus: "EMPLOYED",
        housingType: "RENT",
        childrenCount: 0,
        facts: { migrationshintergrund: false },
      }),
      [],
    );
    expect(result.excluded).toContain("beratung_migranten");
    expect(result.excluded).toContain("deutschkurs");
  });

  it("Familien-Leistungen (Bildungspaket/KiZ) qualifizieren ohne Kinder NICHT", () => {
    const result = matchBenefits(
      profile({ employmentStatus: "UNEMPLOYED", housingType: null, childrenCount: 0 }),
      [],
    );
    const qualifiedIds = result.qualified.map((m) => m.benefit.id);
    expect(qualifiedIds).not.toContain("bildungspaket");
    expect(qualifiedIds).not.toContain("kinderzuschlag");
  });

  it("mit Kindern + niedrigem Einkommen wird Kinderzuschlag qualifiziert", () => {
    const result = matchBenefits(
      profile({
        employmentStatus: "UNEMPLOYED",
        housingType: null,
        childrenCount: null,
        facts: { kinder_unter_18: 2, netto_einkommen: "1200_1800" },
      }),
      [],
    );
    const ids = result.qualified.map((m) => m.benefit.id);
    expect(ids).toContain("kinderzuschlag");
  });

  it("topRecommendations liefert höchstens N Einträge", () => {
    const result = matchBenefits(
      profile({ employmentStatus: "UNEMPLOYED", housingType: "RENT", childrenCount: 2 }),
      [],
    );
    const all = result.qualified.length + result.potential.length;
    const top = topRecommendations(result, 3);
    expect(top.length).toBe(Math.min(3, all));
  });

  it("qualified-Treffer werden vor potential gerankt", () => {
    const result = matchBenefits(
      profile({
        employmentStatus: "UNEMPLOYED",
        housingType: "RENT",
        childrenCount: 2,
        facts: { migrationshintergrund: true },
      }),
      [],
    );
    const top = topRecommendations(result, 3);
    if (result.qualified.length > 0) {
      expect(result.qualified.map((m) => m.benefit.id)).toContain(top[0].benefit.id);
    }
  });
});

describe("Förder-Profil — adaptive Engine", () => {
  it("Miet-Frage erscheint nur bei Wohnform Miete", () => {
    const rentQs = relevantOpenQuestions(2, { wohnform: "RENT" }).map((q) => q.id);
    const ownQs = relevantOpenQuestions(2, { wohnform: "OWN" }).map((q) => q.id);
    expect(rentQs).toContain("kaltmiete");
    expect(ownQs).not.toContain("kaltmiete");
    expect(ownQs).toContain("belastung_monatlich");
  });

  it("Asyl-Frage erscheint nur nach Migrationshintergrund = Ja", () => {
    expect(relevantOpenQuestions(3, {}).map((q) => q.id)).not.toContain("asyl_schutzsuchend");
    expect(
      relevantOpenQuestions(3, { migrationshintergrund: true }).map((q) => q.id),
    ).toContain("asyl_schutzsuchend");
    expect(
      relevantOpenQuestions(3, { migrationshintergrund: false }).map((q) => q.id),
    ).not.toContain("asyl_schutzsuchend");
  });

  it("Alleinerziehend-Frage nur mit Kindern", () => {
    expect(relevantOpenQuestions(1, { kinder_unter_18: 0 }).map((q) => q.id)).not.toContain(
      "alleinerziehend",
    );
    expect(relevantOpenQuestions(1, { kinder_unter_18: 2 }).map((q) => q.id)).toContain(
      "alleinerziehend",
    );
  });

  it("Bogen 2 schließt adaptiv ab, wenn alle relevanten Fragen beantwortet sind", () => {
    const facts: FoerderFacts = {};
    for (let i = 0; i < 40; i++) {
      const q = nextQuestion(2, facts);
      if (!q) break;
      facts[q.fact] =
        q.type === "bool"
          ? false
          : q.type === "number" || q.type === "money"
            ? (q.min ?? 0)
            : (q.options?.[0]?.value ?? q.multiOptions?.[0]?.value ?? null);
      if (q.fact === "wohnform") facts[q.fact] = "RENT";
    }
    expect(bogenComplete(2, facts)).toBe(true);
  });

  it("Wohnform-Verzweigung: mietfrei → KEINE Kostenfragen; Miete → Kaltmiete/Nebenkosten/Heizung getrennt", () => {
    const mietfreiQs = relevantOpenQuestions(2, { wohnform: "MIETFREI" }).map((q) => q.id);
    expect(mietfreiQs).not.toContain("kaltmiete");
    expect(mietfreiQs).not.toContain("nebenkosten");
    expect(mietfreiQs).not.toContain("heizkosten");
    expect(mietfreiQs).not.toContain("belastung_monatlich");

    const rentQs = relevantOpenQuestions(2, { wohnform: "RENT" }).map((q) => q.id);
    expect(rentQs).toContain("kaltmiete");
    expect(rentQs).toContain("nebenkosten");
    expect(rentQs).toContain("heizkosten");
    expect(rentQs).not.toContain("belastung_monatlich");
    expect(rentQs).toContain("wohnkosten_druecken");

    const ownQs = relevantOpenQuestions(2, { wohnform: "OWN" }).map((q) => q.id);
    expect(ownQs).toContain("belastung_monatlich");
    expect(ownQs).not.toContain("kaltmiete");
  });

  it("jede Frage gehört zu einem Bogen 1-3 und hat validen Aufbau", () => {
    for (const q of FOERDER_QUESTIONS) {
      expect([1, 2, 3]).toContain(q.bogen);
      expect(q.question.length).toBeGreaterThan(8);
      if (q.type === "single") expect(q.options?.length).toBeGreaterThan(1);
      if (q.type === "multi") expect(q.multiOptions?.length).toBeGreaterThan(1);
    }
  });
});
