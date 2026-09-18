// Server-sichere UI-Helfer fürs Admin-Dashboard (keine Client-Interaktion).
export const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Entwurf',
  IN_PROGRESS: 'In Bearbeitung',
  DOCS_PENDING: 'Dokumente fehlen',
  READY: 'Bereit zur Übertragung',
  SUBMITTED: 'Eingereicht',
  PROCESSING: 'In Prüfung (Agentur)',
  APPROVED: 'Bewilligt',
  REJECTED: 'Abgelehnt',
};

const STATUS_STYLES: Record<string, string> = {
  DRAFT: 'bg-neutral-100 text-neutral-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  DOCS_PENDING: 'bg-amber-100 text-amber-700',
  READY: 'bg-brand-100 text-brand-700',
  SUBMITTED: 'bg-green-100 text-green-700',
  PROCESSING: 'bg-green-100 text-green-700',
  APPROVED: 'bg-green-200 text-green-800',
  REJECTED: 'bg-red-100 text-red-700',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        STATUS_STYLES[status] ?? 'bg-neutral-100 text-neutral-700'
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

// camelCase → lesbares Label ("houseNumber" → "House Number")
export function prettifyKey(key: string): string {
  const spaced = key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());
  return spaced;
}

// Werte lesbar machen (Arrays, Objekte, Booleans, null)
export function prettifyValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.map((v) => prettifyValue(v)).join(', ');
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nein';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
