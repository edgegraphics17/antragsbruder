// ============================================================
// CHAT WIDGET — KI-Assistent im Dashboard
// Nutzt OpenAI oder Anthropic API (je nach verfügbarem Env-Var)
// ============================================================

"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

interface ChatWidgetProps {
  caseId?: string;
  userName?: string;
}

// ─── Help / Welcome Messages ──────────────────────────────────
const WELCOME_GERMAN =
  "Hallo! Ich bin der Antragsbruder-Assistent. 👋 Ich kann dir bei Fragen zu deinen Anträgen, Unterlagen und Förderungen helfen. Stell mir einfach deine Frage — ich antworte dir Schritt für Schritt.";

const LIMITATION_GERMAN =
  "⚠️ Hinweis: Ich bin ein KI-Assistent und habe keinen Zugriff auf deine persönlichen Daten. Für bindende Auskünfte wende dich bitte an die zuständige Behörde oder eine Beratungsstelle.";

// ─── Help offer banner ────────────────────────────────────────

function HelpOfferBanner() {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm">
      <p className="mb-2 font-semibold text-red-800">🔴 Akute Hilfe</p>
      <ul className="list-disc pl-4 text-red-700 space-y-0.5">
        <li><strong>Telefonseelsorge:</strong> 0800 111 0 111 oder 0800 111 0 222 — kostenlos, anonym, 24/7.</li>
        <li><strong>Notruf:</strong> 112 — im akuten Notfall.</li>
        <li><strong>Schuldnerberatung:</strong> Kostenlose Beratungsstellen (Caritas, Diakonie, AWO).</li>
      </ul>
    </div>
  );
}

// ─── Chat message row ─────────────────────────────────────────

function MessageRow({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} rounded-2xl px-4 py-2.5 max-w-[85%] ${
        isUser
          ? "rounded-br-md bg-brand-700 text-cream"
          : "rounded-bl-md bg-brand-50 text-ink"
      }`}
    >
      <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
        {msg.content}
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex justify-start rounded-2xl bg-brand-50 px-4 py-3">
      <div className="flex gap-1.5">
        <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400" style={{ animationDelay: "150ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export function ChatWidget({ caseId, userName = "Nutzer" }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [mountTime] = useState(() => Date.now());

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check API config on mount
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/chat/status");
        const data = await res.json();
        setApiConfigured(data.configured);
      } catch {
        setApiConfigured(false);
      }
    };
    check();
  }, []);

  // Welcome message is computed during render rather than set in an effect
  const displayedMessages: ChatMessage[] = useMemo(() => {
    if (isOpen && messages.length === 0) {
      return [
        {
          id: "welcome",
          role: "assistant",
          content: WELCOME_GERMAN,
          timestamp: mountTime,
        },
      ];
    }
    return messages;
  }, [isOpen, messages, mountTime]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, caseId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Antwort fehlgeschlagen");
      }

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.response || data.text || "Ohne Antwort.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Etwas ist schiefgelaufen');

      // Show limitation message if API is not configured
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("nicht konfiguriert") || msg.includes("not configured")) {
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: "assistant",
            content: LIMITATION_GERMAN,
            timestamp: Date.now(),
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, caseId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleOpen = () => setIsOpen((v) => !v);

  // ── Render ─────────────────────────────────────────────────

  return (
    <>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-cream shadow-lg transition-all hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
        aria-label={isOpen ? "Chat schließen" : "Chat öffnen"}
        title={isOpen ? "Chat schließen" : "Chat öffnen"}
      >
        {isOpen ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl border border-line-soft bg-paper shadow-2xl ring-1 ring-black/5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line-soft/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100">
                <svg className="h-4 w-4 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Antragsbruder-Assistent</p>
                <p className="text-xs text-ink-soft">{userName}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleOpen}
              className="rounded-full p-1 text-ink-soft transition-colors hover:bg-brand-100 hover:text-ink"
              aria-label="Chat schließen"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: "320px", maxHeight: "400px" }}>
            {displayedMessages.map((msg) => (
              <MessageRow key={msg.id} msg={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* API status bar (only when not configured) */}
          {apiConfigured === false && (
            <div className="border-t border-line-soft/60 bg-amber-50 px-4 py-2 text-xs text-amber-700">
              KI-API nicht konfiguriert — bitte ANTHROPIC_API_KEY oder OPENAI_API_KEY in .env.local setzen.
            </div>
          )}

          {/* Help Offer */}
          {messages.length === 0 && <div className="mt-2"><HelpOfferBanner /></div>}

          {/* Input */}
          <div className="border-t border-line-soft/80 px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Frage stellen…"
                rows={1}
                className="flex-1 resize-none rounded-xl border border-line-soft bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-brand-400"
                disabled={isLoading}
                style={{ fieldSizing: "content" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="shrink-0 rounded-xl bg-brand-700 px-3 py-2 text-sm font-semibold text-cream transition-colors hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Senden"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
