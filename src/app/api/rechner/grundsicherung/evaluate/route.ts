// ============================================================
// API — POST /api/rechner/grundsicherung/evaluate
// Zustandslose Rechtsbewertung: Facts/FormData rein → Ergebnis +
// priorisierte Aktionen raus. Keine Rechtslogik im Frontend
// (Playbook §2, §25.2).
// ============================================================

import { NextResponse } from 'next/server';
import {
  calculateGrundsicherung,
  factsToCalcInput,
  type GsCalcInput,
} from '@/engine/benefit-engines/grundsicherung';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      input?: Partial<GsCalcInput>;
      form?: unknown;
    };

    const today = new Date().toISOString().split('T')[0];
    let result;

    if (body.input) {
      // Direkter Engine-Input (vollständige Kontrolle, u. a. für Tests)
      result = calculateGrundsicherung({
        ...body.input,
        housing: body.input.housing ?? {},
        persons: body.input.persons ?? [],
        assessmentMonth: body.input.assessmentMonth ?? today.slice(0, 7),
        legalReferenceDate: body.input.legalReferenceDate || today,
      } as GsCalcInput);
    } else if (body.form) {
      // Kompaktes Antragsformular-Schema (Dashboard-Flow)
      const input = factsToCalcInput({ 'gs.form': body.form }, today);
      result = calculateGrundsicherung(input);
    } else {
      return NextResponse.json({ error: 'input oder form erforderlich' }, { status: 400 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('GS evaluate failed:', error);
    return NextResponse.json({ error: 'Rechtsbewertung fehlgeschlagen' }, { status: 500 });
  }
}
