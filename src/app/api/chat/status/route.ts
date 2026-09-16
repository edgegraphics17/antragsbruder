// ============================================================
// API: Chat — Status-Check (ob API-Key konfiguriert ist)
// GET /api/chat/status
// ============================================================

import { NextResponse } from "next/server";

export async function GET() {
  const hasAnthropic = !!(process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY.trim());
  const hasOpenAI = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim());

  return NextResponse.json({
    configured: hasAnthropic || hasOpenAI,
    provider: hasAnthropic ? "anthropic" : hasOpenAI ? "openai" : null,
    note: hasAnthropic
      ? "Anthropic API konfiguriert"
      : hasOpenAI
      ? "OpenAI API konfiguriert"
      : "Kein API-Key konfiguriert — setze ANTHROPIC_API_KEY oder OPENAI_API_KEY in .env.local",
  });
}
