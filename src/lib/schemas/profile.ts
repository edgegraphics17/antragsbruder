import { z } from 'zod';
import type { Locale } from '@/i18n/config';

// ============================================================
// PROFIL-SCHEMAS — Single Source of Truth für RHF + Zod.
// Sub-Schemas via .pick() abgeleitet, damit Master- und
// Förder-Formular nur ihren eigenen Ausschnitt validieren.
// ============================================================

export const ProfileFormSchema = z.object({
  firstName: z.string().min(1, 'Vorname ist erforderlich').max(50, 'Maximal 50 Zeichen'),
  lastName: z.string().min(1, 'Nachname ist erforderlich').max(50, 'Maximal 50 Zeichen'),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Bitte ein gültiges Datum wählen')
    .optional()
    .or(z.literal('')),
  street: z.string().max(120, 'Maximal 120 Zeichen').optional().or(z.literal('')),
  houseNumber: z.string().max(10, 'Maximal 10 Zeichen').optional().or(z.literal('')),
  phone: z.string().max(20, 'Maximal 20 Zeichen').optional().or(z.literal('')),
  postcode: z
    .string()
    .regex(/^\d{5}$/, 'PLZ muss 5-stellig sein')
    .optional()
    .or(z.literal('')),
  city: z.string().max(100, 'Maximal 100 Zeichen').optional().or(z.literal('')),
  housingType: z.enum(['RENT', 'OWN', 'PARENTS', 'OTHER']),
  childrenCount: z
    .number({ message: 'Bitte eine Zahl eingeben' })
    .min(0, 'Kinderanzahl kann nicht negativ sein')
    .max(20, 'Maximal 20'),
  employmentStatus: z.enum([
    'EMPLOYED',
    'SELF_EMPLOYED',
    'UNEMPLOYED',
    'STUDENT',
    'APPRENTICE',
    'RETIRED',
    'OTHER',
  ]),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;

// Stammdaten-Formular (Name, Geburtsdatum, Adresse, Telefon)
export const ProfileMasterDataSchema = ProfileFormSchema.pick({
  firstName: true,
  lastName: true,
  birthDate: true,
  street: true,
  houseNumber: true,
  postcode: true,
  city: true,
  phone: true,
});
export type ProfileMasterData = z.infer<typeof ProfileMasterDataSchema>;

// Förder-Profil-Formular (Lebenslage: Wohnsituation, Kinder, Erwerbsstatus)
export const ProfileEligibilitySchema = ProfileFormSchema.pick({
  housingType: true,
  childrenCount: true,
  employmentStatus: true,
});
export type ProfileEligibilityData = z.infer<typeof ProfileEligibilitySchema>;

// ============================================================
// DOKUMENTEN-TRESOR
// Spalten entsprechen 1:1 documents_meta (document_role/status
// statt role — Live-Schema, siehe 20260916_alg1_initial_schema.sql).
// application_id = null  →  globales Tresor-Dokument.
// ============================================================

export type DocumentRole = 'TERMINATION' | 'PAYSLIP' | 'ID_CARD' | 'CONTRACT' | 'BANK_STATEMENT' | 'OTHER';
export type DocumentStatus = 'PENDING' | 'PROCESSING' | 'DONE' | 'ERROR';

export interface DocumentEntry {
  id: string;
  user_id: string;
  application_id: string | null; // null = globaler Tresor
  document_role: DocumentRole;
  title: string | null; // editierbarer Anzeigename (Original bleibt filename)
  filename: string;
  storage_path: string;
  file_size: number | null;
  mime_type: string | null;
  status: DocumentStatus;
  created_at: string;
}

// Validierungsschema für Dokumenten-Upload
export const DocumentUploadSchema = z.object({
  role: z.enum(['TERMINATION', 'PAYSLIP', 'ID_CARD', 'CONTRACT', 'BANK_STATEMENT', 'OTHER']),
  file: z
    .instanceof(File)
    .refine((f) => f.size <= 10 * 1024 * 1024, 'Datei zu groß (max 10MB)')
    .refine(
      (f) => ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(f.type),
      'Nur PDF, JPG, PNG oder WebP',
    ),
});
export type DocumentUploadData = z.infer<typeof DocumentUploadSchema>;

export interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  street: string | null;
  houseNumber: string | null;
  phone: string | null;
  postcode: string | null;
  city: string | null;
  housingType: 'RENT' | 'OWN' | 'PARENTS' | 'OTHER' | null;
  childrenCount: number;
  employmentStatus: string | null;
  avatarUrl: string | null;
  /** Profilsprache (spaltenname: preferred_locale) — null bis erstmals gesetzt. */
  preferredLocale: Locale | null;
  onboardingCompleted: boolean;
  onboardingDismissed: boolean;
}
