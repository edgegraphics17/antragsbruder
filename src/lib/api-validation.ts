// ============================================================
// API ROUTE VALIDATION — Central Zod schemas for all API routes
// ============================================================

import { z } from 'zod';

// --- Auth ---
export const signupSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(6, 'Das Passwort muss mindestens 6 Zeichen haben'),
  preferredLocale: z.string().optional(),
  fullName: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(1, 'Passwort erforderlich'),
});

// --- Case ---
export const questionSubmitSchema = z.object({
  caseId: z.string().uuid('Ungültige Case-ID'),
  questionId: z.string().min(1, 'Frage-ID erforderlich'),
  answer: z.unknown().refine((a) => a !== null && a !== undefined, {
    message: 'Antwort erforderlich',
  }),
});

// --- Documents ---
export const documentUploadJsonSchema = z.object({
  caseId: z.string().uuid('Ungültige Case-ID'),
  fileBase64: z.string().min(1, 'Datei (base64) erforderlich'),
  filename: z.string().optional(),
});

export const documentUploadFormSchema = z.object({
  caseId: z.string().uuid('Ungültige Case-ID'),
});

// --- Documents listing ---
export const documentsListSchema = z.object({
  caseId: z.string().uuid('Ungültige Case-ID'),
});
