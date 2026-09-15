// ============================================================
// AUTH ICONS & DASHBOARD ICONS
// stroke-current, strokeWidth 1.5–1.7, viewBox 0 0 24 24
// ============================================================

type IconProps = { className?: string };

const base = "stroke-current";

/* ------------------------------------------------------------------ */
/* IconPerson — einfaches Avatar-Icon (bestehend, unverändert)       */
/* ------------------------------------------------------------------ */

export function IconPerson({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke={base} strokeWidth="1.5" />
      <path d="M4 21a7 7 0 0 1 14 0" stroke={base} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* IconUser — Person mit Kreis (für Navbar Anmelded Zustand)         */
/* ------------------------------------------------------------------ */

export function IconUser({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="12" cy="8" r="4" strokeWidth="1.7" />
      <path d="M4 21a7 7 0 0 1 14 0" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* IconLogout — Tür-Symbol für Abmelden                              */
/* ------------------------------------------------------------------ */

export function IconLogout({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M8 16V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10l8 5 8-5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 15v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="17" r="1" fill={base} stroke="none" />
      <circle cx="15" cy="17" r="1" fill={base} stroke="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* IconSignOut — alternatives Ausgangssymbol (Tür, kombiniert)       */
/* ------------------------------------------------------------------ */

export function IconSignOut({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <rect x="3" y="11" width="18" height="10" rx="1.5" strokeWidth="1.7" />
      <path d="M7 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15 15l3 3-3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* IconFolder — Ordner (Dashboard, Unterlagen)                       */
/* ------------------------------------------------------------------ */

export function IconFolder({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* IconCalendar — Termin / Terminkalender                             */
/* ------------------------------------------------------------------ */

export function IconCalendar({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="2" strokeWidth="1.7" />
      <path d="M4 10h16M8 2v4M16 2v4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* IconFile — Datei-Dokument                                          */
/* ------------------------------------------------------------------ */

export function IconFile({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 3v5h5" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 13h6M9 17h4M9 9h2" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
