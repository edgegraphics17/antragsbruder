// ============================================================
// TEMPLATE-FORMATIERUNG für Dict-Strings mit Platzhaltern.
// Convention: {{name}} im String, ersetzt via formatTemplate.
// Beispiel: "Dein Antrag {{id}} ist bereit" + { id: '123' }
// ============================================================

export function formatTemplate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : '',
  );
}
