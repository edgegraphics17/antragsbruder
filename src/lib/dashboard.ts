// ============================================================
// DASHBOARD — Case-Daten-Modell
// ============================================================

export type CaseStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED';
export type CaseEssentialStatus = 'Erstellen' | 'Fragen beantworten' | 'Unterlagen prüfen' | 'Ergebnis' | 'Fertig';

export interface CaseSummary {
  id: string;
  status: CaseStatus;
  benefitType?: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  essentialStatus: CaseEssentialStatus;
  factCount: number;
  documentCount: number;
  benefitCount: number;
}

export function mapStatusToEssential(status: CaseStatus, hasQuestion: boolean, hasDocuments: boolean): CaseEssentialStatus {
  if (status === 'COMPLETED') return 'Fertig';
  if (hasQuestion) return 'Fragen beantworten';
  if (hasDocuments) return 'Unterlagen prüfen';
  return 'Erstellen';
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
