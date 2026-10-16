// ============================================================
// HTML-ESCAPING — für alle Stellen, an denen Nutzereingaben in
// HTML oder E-Mail-Vorlagen landen.
// ============================================================
// Nutzereingaben sind in E-Mails nicht "nur Text": Namen aus dem Profil und
// Dateinamen aus einem Upload landen ungeprüft im HTML. Damit ließ sich Markup
// einschleusen (z. B. ein gefälschter Link oder ein unsichtbares <img>).
// Diese Funktion gehört an jede Einfügestelle.

const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ENTITIES[char]);
}
