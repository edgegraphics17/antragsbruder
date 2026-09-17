// ============================================================
// SKELETON — Ladezustand-Platzhalter (statt Spinner).
// ============================================================

interface SkeletonProps {
  className?: string;
  /** Explizite Höhe als Tailwind-Klasse, z. B. "h-4" */
  height?: string;
  /** Explizite Breite als Tailwind-Klasse, z. B. "w-1/2" */
  width?: string;
}

export function Skeleton({ className = '', height = 'h-4', width = 'w-full' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-brand-100/70 ${height} ${width} ${className}`}
      aria-busy="true"
      aria-label="Wird geladen"
      role="status"
    />
  );
}

// Mehrzeiliger Skeleton für Formulare (Label-Zeile + Feld pro Zeile)
export function SkeletonForm({ rows = 4, className = '' }: { rows?: number; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`} aria-busy="true" role="status">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <Skeleton height="h-3" width="w-24" />
          <Skeleton height="h-12" className="rounded-xl" />
        </div>
      ))}
    </div>
  );
}
