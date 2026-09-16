// src/lib/alg1/logic.ts
// SLICE 2 — Pure ALG1-Berechnungslogik. Keine Nebeneffekte, keine I/O.
import type { Alg1FormData, Alg1SchnellCheckResult, SchnellCheck } from '../types/alg1';

export function evaluateSchnellCheck(data: SchnellCheck): Alg1SchnellCheckResult {
  // UNLIKELY
  if (data.insurance_period_months < 6) {
    return {
      eligibility: 'UNLIKELY',
      reason: `Nur ${data.insurance_period_months} Monate Versicherungszeit — mindestens 6 Monate erforderlich.`,
      warnings: ['Du könntest Anspruch auf Grundsicherung haben.'],
      nextSteps: ['Prüfe Grundsicherungs-Anspruch'],
    };
  }

  if (data.available_hours_per_week < 15) {
    return {
      eligibility: 'UNLIKELY',
      reason: `Nur ${data.available_hours_per_week} Stunden/Woche verfügbar — mindestens 15h erforderlich.`,
      warnings: [],
      nextSteps: ['Kläre Verfügbarkeit mit Agentur für Arbeit'],
    };
  }

  // UNCLEAR
  if (data.termination_type === 'SELF_QUIT') {
    return {
      eligibility: 'UNCLEAR',
      reason: 'Eigenkündigung — 12 Wochen Sperrzeit möglich, aber Ausnahmen denkbar.',
      warnings: ['Sperrzeit beachten', 'Begründung prüfen lassen'],
      nextSteps: ['Sperrzeit-Grund prüfen', 'Trotzdem Antrag empfohlen'],
    };
  }

  if (data.termination_type === 'MUTUAL_AGREEMENT') {
    return {
      eligibility: 'UNCLEAR',
      reason: 'Aufhebungsvertrag — kann wie Eigenkündigung gewertet werden.',
      warnings: ['Einzelfallprüfung durch Agentur für Arbeit'],
      nextSteps: ['Antrag stellen, Begründung bereithalten'],
    };
  }

  // LIKELY
  if (
    data.insurance_period_months >= 12 &&
    data.available_hours_per_week >= 15 &&
    data.actively_seeking
  ) {
    return {
      eligibility: 'LIKELY',
      reason: 'Alle Voraussetzungen für ALG1 erfüllt.',
      warnings: data.insurance_period_months < 24
        ? ['Anspruchszeit begrenzt (weniger als 24 Monate)']
        : [],
      nextSteps: ['Dokumente hochladen', 'Antrag ausfüllen'],
    };
  }

  return {
    eligibility: 'UNCLEAR',
    reason: 'Informationen unvollständig oder gemischt.',
    warnings: ['Weitere Prüfung nötig'],
    nextSteps: ['Antrag starten für detaillierte Prüfung'],
  };
}

export function calculateAlg1Estimate(data: Pick<Alg1FormData, 'grossSalary' | 'childrenCount'>): {
  monthly: number;
  daily: number;
  rate: 0.6 | 0.67;
  basis: number;
} {
  const dailyBasis = data.grossSalary / 30.44;
  const rate = data.childrenCount > 0 ? 0.67 : 0.6;
  const dailyAmount = Math.round(dailyBasis * rate);
  const monthly = Math.round(dailyAmount * 21);

  return { monthly, daily: dailyAmount, rate, basis: data.grossSalary };
}

// Berechnung direkt aus den Schnell-Check-Antworten (Kind-Info als Boolean).
export function calculateAlg1EstimateFromSchnellCheck(data: SchnellCheck): {
  monthly: number;
  daily: number;
  rate: 0.6 | 0.67;
  basis: number;
} {
  return calculateAlg1Estimate({
    grossSalary: data.gross_salary,
    childrenCount: data.has_children ? 1 : 0,
  });
}
