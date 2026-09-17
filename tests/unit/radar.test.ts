import { describe, it, expect } from 'vitest';
import {
  matchBenefits,
  readinessIndex,
  docLabelToRole,
  ALL_RADAR_BENEFITS,
} from '../../src/lib/benefits/radar';

const emptyProfile = { employmentStatus: null, housingType: null, childrenCount: null };
const unemployedRenting = { employmentStatus: 'UNEMPLOYED', housingType: 'RENT', childrenCount: 0 };
const student = { employmentStatus: 'STUDENT', housingType: 'PARENTS', childrenCount: 0 };

describe('radar', () => {
  it('lädt den vollständigen Benefit-Index', () => {
    expect(ALL_RADAR_BENEFITS.length).toBeGreaterThanOrEqual(130);
    expect(ALL_RADAR_BENEFITS[0].id).toBeTruthy();
  });

  it('matcht ALG1 für Arbeitslose (qualified) ohne Profil-Signale nicht', () => {
    const res = matchBenefits(emptyProfile, []);
    const ids = res.qualified.map((m) => m.benefit.id);
    expect(ids).not.toContain('arbeitslosengeld-i');
  });

  it('matcht ALG1 für Arbeitslose (qualified)', () => {
    const res = matchBenefits(unemployedRenting, []);
    const ids = res.qualified.map((m) => m.benefit.id);
    expect(ids).toContain('arbeitslosengeld-i');
  });

  it('erzeugt Klärungsfragen bei unbekanntem Profil', () => {
    const res = matchBenefits(emptyProfile, []);
    const fields = res.questions.map((q) => q.field);
    expect(fields).toContain('employment');
    expect(fields).toContain('children');
  });

  it('schließt Rentner-only-Leistungen für Studierende aus, matcht sie für Rentner', () => {
    // altersrente hat ausschließlich exklusive Rente-Tags → für Studenten ausgeschlossen
    const studentRes = matchBenefits(student, []);
    expect(studentRes.excluded).toContain('altersrente');

    const retiredRes = matchBenefits({ ...student, employmentStatus: 'RETIRED' }, []);
    expect(retiredRes.excluded).not.toContain('altersrente');
  });

  it('mappt Pflicht-Dokument-Labels auf Tresor-Rollen', () => {
    expect(docLabelToRole('Personalausweis')).toBe('ID_CARD');
    expect(docLabelToRole('Letzte 3 Gehaltsabrechnungen')).toBe('PAYSLIP');
    expect(docLabelToRole('Mietvertrag')).toBe('CONTRACT');
    expect(docLabelToRole('Kündigung oder Aufhebungsvertrag')).toBe('TERMINATION');
  });

  it('zählt vorhandene Tresor-Dokumente als erfüllt', () => {
    const res = matchBenefits(unemployedRenting, [
      { document_role: 'ID_CARD', filename: 'ausweis.pdf' },
      { document_role: 'PAYSLIP', filename: 'gehalt.pdf' },
    ]);
    const alg = res.qualified.find((m) => m.benefit.id === 'arbeitslosengeld-i');
    expect(alg).toBeTruthy();
    expect(alg!.docsPresent).toContain('ID_CARD');
    expect(alg!.docsMissing.some((m) => m.label.includes('Personalausweis'))).toBe(false);
  });

  it('Readiness liegt zwischen 0 und 100', () => {
    const r = readinessIndex(unemployedRenting, []);
    expect(r.percent).toBeGreaterThanOrEqual(0);
    expect(r.percent).toBeLessThanOrEqual(100);
    expect(Array.isArray(r.missing)).toBe(true);
  });
});
