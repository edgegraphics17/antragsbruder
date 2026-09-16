// ============================================================
// API: Antwort absenden & nächste Frage
// POST /api/question
// Body: { caseId, questionId, answer }
// ============================================================

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { masterOrchestrator } from '@/engine';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { questionSubmitSchema } from '@/lib/api-validation';
import { trackError } from '@/lib/sentry';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Ungültiger Anfrage-Body' }, { status: 400 });
    }

    // Zod-Validierung
    const parsed = questionSubmitSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? 'Validierungsfehler' },
        { status: 400 },
      );
    }

    const { caseId, questionId, answer } = parsed.data;

    const state = await masterOrchestrator.submitAnswer(caseId, questionId, answer);

    return NextResponse.json({
      caseId: state.case.id,
      currentQuestion: state.currentQuestion,
      crisis: state.crisisResult,
      isComplete: state.isComplete,
      result: state.resultView,
    });
  } catch (error: unknown) {
    trackError(error, { route: 'question.submit' });
    return NextResponse.json({
      error: 'Failed to process answer',
      details: error instanceof Error ? error.message : String(error),
      stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined,
    }, { status: 500 });
  }
}
