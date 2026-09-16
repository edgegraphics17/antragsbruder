// ============================================================
// API: Dashboard — Förderergebnisse des Nutzers
// GET /api/dashboard/results
// Liefert alle benefit_results über alle Cases des eingeloggten
// Nutzers. Reine DB-Abfrage — Förder-Matching ist regelbasiert
// (Benefit Engines), kein LLM/Vektor-Suche.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/auth-server';
import { supabase } from '@/lib/supabase';
import { trackError } from '@/lib/sentry';

export async function GET(_request: NextRequest) {
  try {
    const supabaseAuth = createAuthServerClient();
    const { data: sessionData, error: sessionError } = await supabaseAuth.auth.getSession();

    if (sessionError || !sessionData.session) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const userId = sessionData.session.user.id;

    // Case-IDs des Nutzers
    const { data: cases, error: casesError } = await supabase
      .from('cases')
      .select('id, status, metadata')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (casesError) {
      throw new Error(casesError.message);
    }

    const caseIds = (cases ?? []).map((c) => c.id);
    if (caseIds.length === 0) {
      return NextResponse.json({ results: [] });
    }

    const { data: results, error: resultsError } = await supabase
      .from('benefit_results')
      .select(
        'id, case_id, benefit_type, status, confidence, discovery_reasons, blocking_facts, unresolved_questions, calculation, amount_quality, next_actions',
      )
      .in('case_id', caseIds);

    if (resultsError) {
      throw new Error(resultsError.message);
    }

    return NextResponse.json({
      results: (results ?? []).map((r) => ({
        ...r,
        caseStatus: (cases ?? []).find((c) => c.id === r.case_id)?.status ?? 'ACTIVE',
        caseTitle:
          ((cases ?? []).find((c) => c.id === r.case_id)?.metadata as Record<string, unknown> | null)
            ?.title ?? null,
      })),
    });
  } catch (err: unknown) {
    trackError(err, { route: 'dashboard.results' });
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Fehler beim Laden' },
      { status: 500 },
    );
  }
}
