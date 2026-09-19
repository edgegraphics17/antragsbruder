/**
 * DirectAnswer-Block für GEO/LLM-Extraktion (SEO-Strategie §11.2, STEP3 §15).
 *
 * Muss direkt unter der H1 stehen: 40–80 Wörter, die die Kernfrage der Seite
 * vollständig, zitierfähig und ohne Einleitung beantworten. Kein CTA, kein
 * Fließtext – nur die belastbare Kernantwort.
 */
export function DirectAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border-2 border-brand-800/25 bg-brand-50 p-5 sm:p-6">
      <p className="text-base leading-relaxed text-ink sm:text-lg">{children}</p>
    </div>
  );
}
