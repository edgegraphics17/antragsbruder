// ============================================================
// DEEP-MERGE & PARTIAL-TYPES für Dictionary-Fallbacks.
// Deutsch (dashboard-de.ts) ist Source of Truth; jede Locale-Datei
// überschreibt nur ihre Keys — alles Fehlende fällt zur Laufzeit
// auf Deutsch zurück. So kann eine Sprache aktiviert werden,
// bevor sie zu 100 % übersetzt ist.
// ============================================================

/** Rekursiv optionale Variante von T (Objekte partiell, Blätter unverändert). */
export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

/**
 * Verschachtelt `override` in `base`. Objekte werden rekursiv gemergt,
 * Arrays und alle Blätter (Strings, Zahlen, booleans, null) werden
 * komplett ersetzt — nie konkateniert.
 */
export function deepMerge<T>(base: T, override?: DeepPartial<T>): T {
  if (override === undefined || override === null) return base;
  if (typeof base !== 'object' || base === null || Array.isArray(base)) {
    return override as T;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
    if (value === undefined) continue;
    const current = out[key];
    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      typeof current === 'object' &&
      current !== null &&
      !Array.isArray(current)
    ) {
      out[key] = deepMerge(current, value as DeepPartial<typeof current>);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}
