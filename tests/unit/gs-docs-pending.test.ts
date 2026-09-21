// Unit-Tests: Nachreichen von Unterlagen (Abgeschickt ≠ alle Nachweise da).
// Deckt die Status-Ableitung ab, die Dashboard, Autosave und Einreichen nutzen.

import { describe, expect, it, vi } from 'vitest';

// Supabase-Client mocken (Store importiert ihn auf Modulebene).
vi.mock('../../src/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      update: vi.fn(() => ({ eq: vi.fn(async () => ({ error: null })) })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({ single: vi.fn(async () => ({ data: null, error: null })) })),
      })),
    })),
  },
}));

import { derivedStatus, missingAnlagen, type GsUploadedDoc } from '../../src/lib/grundsicherung/store';
import { anlagenHint, ANLAGEN_HINTS, requiredAnlagen } from '../../src/lib/grundsicherung/antrag-form';

function doc(anlage: string, path = `/tmp/${anlage}.pdf`): GsUploadedDoc {
  return {
    id: path,
    filename: 'nachweis.pdf',
    storagePath: path,
    mimeType: 'application/pdf',
    fileSize: 1024,
    anlage,
    uploadedAt: '2026-09-21T10:00:00.000Z',
  };
}

const antrag = { firstName: 'Karim', lastName: 'Azzaoui' };
const formState = { children: [{ age: 8 }] };

/** Alle Pflicht-Anlagen für diesen Antrag (inkl. Kinder aus dem Schnellcheck). */
const kernAnlagen = requiredAnlagen(antrag, [8]);

describe('missingAnlagen', () => {
  it('meldet alle Pflicht-Anlagen, wenn nichts hochgeladen ist', () => {
    expect(missingAnlagen(antrag, formState, [])).toEqual(kernAnlagen);
  });

  it('zählt Dokumente ohne Anlagen-Zuordnung (—) nicht als Nachweis', () => {
    const missing = missingAnlagen(antrag, formState, [doc('—', '/tmp/sonstiges.pdf')]);
    expect(missing).toEqual(kernAnlagen);
  });

  it('entfernt hochgeladene Anlagen aus der Liste', () => {
    const missing = missingAnlagen(antrag, formState, [doc(kernAnlagen[0])]);
    expect(missing).not.toContain(kernAnlagen[0]);
    expect(missing).toHaveLength(kernAnlagen.length - 1);
  });

  it('ist leer, wenn alle Pflicht-Anlagen vorliegen', () => {
    expect(missingAnlagen(antrag, formState, kernAnlagen.map((a) => doc(a)))).toEqual([]);
  });

  it('bezieht Kinder-Anlagen aus dem Schnellcheck (Alter) mit ein', () => {
    const withChild = missingAnlagen({ ...antrag, children: [] }, formState, []);
    expect(withChild.some((a) => a.startsWith('Anlage KI'))).toBe(true);
    expect(missingAnlagen({ ...antrag, children: [] }, {}, [])).not.toContain(
      'Geburtsurkunden der Kinder',
    );
  });
});

describe('derivedStatus', () => {
  it('ist IN_PROGRESS, solange nicht abgeschickt wurde', () => {
    expect(derivedStatus({ submitted: false, antrag, formState, anlagenDocs: [] })).toBe(
      'IN_PROGRESS',
    );
  });

  it('ist DOCS_PENDING, wenn abgeschickt aber Nachweise fehlen (nachreichbar)', () => {
    expect(derivedStatus({ submitted: true, antrag, formState, anlagenDocs: [] })).toBe(
      'DOCS_PENDING',
    );
    expect(
      derivedStatus({
        submitted: true,
        antrag,
        formState,
        anlagenDocs: [doc(kernAnlagen[0])],
      }),
    ).toBe('DOCS_PENDING');
  });

  it('ist SUBMITTED, sobald abgeschickt und alle Nachweise vorhanden sind', () => {
    expect(
      derivedStatus({
        submitted: true,
        antrag,
        formState,
        anlagenDocs: kernAnlagen.map((a) => doc(a)),
      }),
    ).toBe('SUBMITTED');
  });
});

describe('anlagenHint (Erklärtexte in der Upload-Box)', () => {
  it('erklärt jede Anlage, die der Antrag verlangen kann', () => {
    const moegliche = requiredAnlagen(
      {
        hasGuardian: true,
        hasResidenceTitle: true,
        receivesAsylbLG: true,
        familyStatus: 'GESCHIEDEN',
        pregnant: true,
        u25ParentOutsideBg: true,
        isStudentOrTrainee: true,
        schoolBookCosts: true,
        expensiveDiet: true,
        disabled: true,
        disabledSgb9Benefits: true,
        specialNeed: true,
        accidentThirdParty: true,
        specialInsuranceStatus: true,
        claimsAgainstThirdParty: true,
        singleParent: true,
        selfEmployedLast5Years: true,
        healthInsuranceName: 'TK',
        children: [{ firstName: 'Lina', birthDate: '2010-05-01', kindergeld: true }],
        pastEmployers: [{ outstandingWages: true } as never],
      },
      [17],
      // Kinder unter 15 zusätzlich über den Schnellcheck
    );
    const ohneEigenenText = moegliche.filter(
      (a) => !ANLAGEN_HINTS[a] && !/^Anlage (WEP|KI) je Kind/.test(a),
    );
    expect(ohneEigenenText).toEqual([]);
    for (const a of moegliche) {
      expect(anlagenHint(a).length).toBeGreaterThan(60);
    }
  });
});