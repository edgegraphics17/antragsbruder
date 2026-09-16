// src/lib/schemas/alg1.ts
// Zod-Schemas für den ALG1-Flow (Slice 1: Types-First).
//
// WICHTIG:
// - Zod dient ausschließlich der Validierung (safeParse).
// - KEINE Hilfsfunktionen (Progress, Berechnungen) aus dieser Datei
//   exportieren — UI-Logik (z.B. Fortschrittsbalken) läuft über
//   FORM_CONFIG in src/lib/alg1/form-config.ts (Slice 4).
import { z } from 'zod';

// ── Schnell-Check Fragen ─────────────────────────────────────
export const SchnellCheckSchema = z.object({
  termination_type: z.enum([
    'EMPLOYER_TERMINATED', 'CONTRACT_END', 'SELF_QUIT',
    'MUTUAL_AGREEMENT', 'EMPLOYER_INSOLVENT', 'HOURS_REDUCED', 'OTHER',
  ]),
  insurance_period_months: z.number().min(0).max(300),
  registered_unemployed: z.boolean(),
  available_hours_per_week: z.number().min(0).max(40),
  actively_seeking: z.boolean(),
  has_children: z.boolean(),
  has_partner: z.boolean(),
  // Für Live-Berechnung der geschätzten Anspruchshöhe (€/Monat, brutto, Ø letzte 12 Monate)
  gross_salary: z.number().min(0),
});

// ── ALG1 Antragsdaten (alle Felder des Formulars) ────────────
export const Alg1FormSchema = z.object({
  // Personendaten
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  street: z.string().min(3),
  postcode: z.string().regex(/^\d{5}$/),
  city: z.string().min(2),
  phone: z.string().min(6),
  email: z.email(),
  nationality: z.string().default('DE'),
  taxId: z.string().regex(/^\d{11}$/),
  iban: z.string().regex(/^[A-Z]{2}\d{2}[\d\s]{10,30}$/),
  healthInsurance: z.string().min(2),

  // Arbeitgeber
  employerName: z.string().min(2),
  employerAddress: z.string().min(3),
  employmentStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  employmentEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  contractType: z.enum(['LIMITED', 'UNLIMITED']),
  hoursPerWeek: z.number().min(0).max(40),
  grossSalary: z.number().min(0),
  taxClass: z.enum(['I', 'II', 'III', 'IV', 'V', 'VI']),
  churchTax: z.boolean(),
  childrenAllowance: z.boolean(),

  // Agentur für Arbeit
  unemployedSince: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  agencyLocation: z.string().min(2),
  agencyReference: z.string().optional(),

  // Gesundheit & Verfügbarkeit
  fitForWork: z.boolean(),
  availableFor15h: z.boolean(),
  activelySeeking: z.boolean(),
  restrictions: z.array(z.string()).optional(),

  // Haushalt
  childrenCount: z.number().min(0).max(20),
  childrenAges: z.array(z.number().min(0).max(17)),
  hasPartner: z.boolean(),
  partnerUnemployed: z.boolean(),

  // Finanzen
  incomeSources: z.array(z.enum([
    'EMPLOYMENT', 'ALG1', 'SICK_PAY', 'CHILD_BENEFIT',
    'MAINTENANCE', 'PARENTAL_ALLOWANCE', 'PENSION', 'SELF_EMPLOYED', 'NONE',
  ])),
  assetsOver15k: z.boolean(),
});

// Progress wird NICHT über Zod-Keys berechnet!
// Siehe calculateProgress() in form-config.ts (Slice 4).
// Zod dient NUR zur Validierung (safeParse), nicht zur UI-Logik.
