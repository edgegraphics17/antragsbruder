// ============================================================
// API: Antwort absenden & nächste Frage
// POST /api/question
// Body: { caseId, questionId, answer }
// ============================================================

import { NextResponse } from 'next/server';
import { masterOrchestrator } from '@/engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caseId, questionId, answer } = body;

    if (!caseId || !questionId) {
      return NextResponse.json({ error: 'caseId and questionId required' }, { status: 400 });
    }

    const state = await masterOrchestrator.submitAnswer(caseId, questionId, answer);

    return NextResponse.json({
      caseId: state.case.id,
      currentQuestion: state.currentQuestion,
      crisis: state.crisisResult,
      isComplete: state.isComplete,
      result: state.resultView,
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to process answer',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
