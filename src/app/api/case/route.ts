// ============================================================
// API: Case erstellen
// POST /api/case
// ============================================================

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { masterOrchestrator } from '@/engine';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { trackError } from '@/lib/sentry';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, 'default');
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  try {
    const state = await masterOrchestrator.startNavigator();
    return NextResponse.json({
      caseId: state.case.id,
      currentQuestion: state.currentQuestion,
      crisis: state.crisisResult,
    });
  } catch (error: unknown) {
    trackError(error, { route: 'case.create' });
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }
}
