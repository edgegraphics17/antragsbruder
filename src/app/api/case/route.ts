// ============================================================
// API: Case erstellen
// POST /api/case
// ============================================================

import { NextResponse } from 'next/server';
import { masterOrchestrator } from '@/engine';

export async function POST() {
  try {
    const state = await masterOrchestrator.startNavigator();
    return NextResponse.json({
      caseId: state.case.id,
      currentQuestion: state.currentQuestion,
      crisis: state.crisisResult,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }
}
