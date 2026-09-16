// ============================================================
// API: Chat — Nachricht senden & Antwort holen
// POST /api/chat/message
// Body: { message: string, caseId?: string }
// ============================================================

import { NextResponse } from "next/server";
import { createAuthServerClient } from "@/lib/auth-server";

// ─── Streaming helpers ─────────────────────────────────────────

async function streamText(
  readableStream: ReadableStream<Uint8Array> | null
): Promise<string> {
  if (!readableStream) return "";
  const reader = readableStream.getReader();
  const chunks: number[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    for (let i = 0; i < value.length; i++) chunks.push(value[i]);
  }
  reader.releaseLock();
  return new TextDecoder().decode(new Uint8Array(chunks));
}

// ─── OpenAI (Streaming) ────────────────────────────────────────

async function callOpenAI(messages: { role: string; content: string }[]): Promise<string> {
  const key = process.env.OPENAI_API_KEY!;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Du bist der Antragsbruder-Assistent. Du hilfst Menschen in Deutschland bei Sozialleistungsanträgen (Bürgergeld, Wohngeld, Kindergeld, etc.). Antworte freundlich, kurz und direkt auf Deutsch. Wenn du unsicher bist, sag das. Du hast keinen Zugriff auf persönliche Daten des Nutzers.",
        },
        ...messages,
      ],
      stream: true,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenAI Fehler (${res.status}): ${errBody.slice(0, 200)}`);
  }

  const stream = res.body;
  return streamText(stream);
}

// ─── Anthropic (Streaming) ────────────────────────────────────

async function callAnthropic(messages: { role: string; content: string }[]): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY!;
  const systemPrompt =
    "Du bist der Antragsbruder-Assistent. Du hilfst Menschen in Deutschland bei Sozialleistungsanträgen (Bürgergeld, Wohngeld, Kindergeld, etc.). Antworte freundlich, kurz und direkt auf Deutsch. Wenn du unsicher bist, sag das. Du hast keinen Zugriff auf persönliche Daten des Nutzers.";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "anthropic-beta": "messages.stream", // optional but recommended
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: systemPrompt,
      stream: true,
      messages,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Anthropic Fehler (${res.status}): ${errBody.slice(0, 200)}`);
  }

  // Anthropic streaming: SSE (Server-Sent Events)
  const reader = res.body?.getReader();
  if (!reader) return "";

  let fullText = "";
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });

    // Parse SSE events: "data: ..."
    for (const line of chunk.split("\n")) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") break;
        try {
          const parsed = JSON.parse(data);
          if (parsed.type === "content_block_delta" && parsed.delta?.text) {
            fullText += parsed.delta.text;
          }
        } catch {
          // ignore malformed SSE chunks
        }
      }
    }
  }

  return fullText;
}

// ─── Handler ───────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, caseId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message (string) erforderlich" }, { status: 400 });
    }

    // Auth check (optional — anonymer Chat auch möglich, aber kein caseId)
    const supabase = createAuthServerClient();
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    // Use caseId from body or try to get from session (if logged in)
    const resolvedCaseId = caseId || undefined;

    // Build message array for API
    const apiMessages: { role: string; content: string }[] = [
      { role: "user", content: message },
    ];

    // Which provider?
    const hasAnthropic = !!(process.env.ANTHROPIC_API_KEY?.trim());
    const hasOpenAI = !!(process.env.OPENAI_API_KEY?.trim());

    if (!hasAnthropic && !hasOpenAI) {
      return NextResponse.json(
        {
          error: "Kein KI-API konfiguriert. Setze ANTHROPIC_API_KEY oder OPENAI_API_KEY in .env.local.",
        },
        { status: 503 }
      );
    }

    let response: string;
    try {
      if (hasAnthropic) {
        response = await callAnthropic(apiMessages);
      } else {
        response = await callOpenAI(apiMessages);
      }
    } catch (err: unknown) {
      console.error("Chat API error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      return NextResponse.json(
        {
          error: msg || "KI-API Aufruf fehlgeschlagen",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      response,
      provider: hasAnthropic ? "anthropic" : "openai",
    });
  } catch (err: unknown) {
    console.error("Chat API route error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        error: msg || "Interner Fehler",
      },
      { status: 500 }
    );
  }
}
