// ============================================================
// PROFIL-FLOW ERROR BOUNDARY — Fängt Fehler in Profil/Dokumenten-
// Komponenten und bietet einen sauberen Fallback mit Reset.
// Wiederverwendet die bestehende ErrorBoundary-Klasse.
// ============================================================

'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';

export function ProfileFlowErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      onReset={() => window.location.reload()}
      locale="de"
    >
      {children}
    </ErrorBoundary>
  );
}
