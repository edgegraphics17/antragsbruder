// ============================================================
// Unit Tests — API Route Validierung
// Testet Zod-Schema-Validierung für alle API-Endpunkte.
// ============================================================

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  signupSchema,
  signinSchema,
  questionSubmitSchema,
  documentUploadJsonSchema,
} from '../../src/lib/api-validation';

// ============================================================
// AUTH-Validierung: signupSchema
// ============================================================

describe('signupSchema', () => {
  it('akzeptiert gültiges Daten', () => {
    const result = signupSchema.safeParse({
      email: 'test@example.com',
      password: 'securePass123',
      preferredLocale: 'de',
      fullName: 'Max Mustermann',
    });
    expect(result.success).toBe(true);
  });

  it('verwirft E-Mail ohne gültiges Format', () => {
    const result = signupSchema.safeParse({
      email: 'not-an-email',
      password: 'securePass123',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toContain('E-Mail');
  });

  it('verwirft Passwort kürzer als 6 Zeichen', () => {
    const result = signupSchema.safeParse({
      email: 'test@example.com',
      password: 'abc',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toContain('6 Zeichen');
  });

  it('erlaubt optionale Felder wegzulassen', () => {
    const result = signupSchema.safeParse({
      email: 'test@example.com',
      password: 'securePass123',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================
// AUTH-Validierung: signinSchema
// ============================================================

describe('signinSchema', () => {
  it('akzeptiert gültige Login-Daten', () => {
    const result = signinSchema.safeParse({
      email: 'test@example.com',
      password: 'securePass123',
    });
    expect(result.success).toBe(true);
  });

  it('verwirft fehlende E-Mail', () => {
    const result = signinSchema.safeParse({
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('verwirft leeres Passwort', () => {
    const result = signinSchema.safeParse({
      email: 'test@example.com',
      password: '',
    });
    expect(result.success).toBe(false);
  });

  it('verwirft ungültiges E-Mail-Format', () => {
    const result = signinSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Question-Validierung: questionSubmitSchema
// ============================================================

describe('questionSubmitSchema', () => {
  it('akzeptiert gültige Frage-Antwort', () => {
    const result = questionSubmitSchema.safeParse({
      caseId: '550e8400-e29b-41d4-a716-446655440000',
      questionId: 'Q123',
      answer: 'BESCHAFFEN',
    });
    expect(result.success).toBe(true);
  });

  it('verwirft ungültige Case-ID', () => {
    const result = questionSubmitSchema.safeParse({
      caseId: 'not-a-uuid',
      questionId: 'Q123',
      answer: 'test',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toContain('Case-ID');
  });

  it('verwirft fehlende Frage-ID', () => {
    const result = questionSubmitSchema.safeParse({
      caseId: '550e8400-e29b-41d4-a716-446655440000',
      answer: 'test',
    });
    expect(result.success).toBe(false);
  });

  it('verwirft fehlende Antwort', () => {
    const result = questionSubmitSchema.safeParse({
      caseId: '550e8400-e29b-41d4-a716-446655440000',
      questionId: 'Q123',
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Document-Validierung: documentUploadJsonSchema
// ============================================================

describe('documentUploadJsonSchema', () => {
  it('akzeptiert gültige Upload-Daten', () => {
    const result = documentUploadJsonSchema.safeParse({
      caseId: '550e8400-e29b-41d4-a716-446655440000',
      fileBase64: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8',
    });
    expect(result.success).toBe(true);
  });

  it('verwirft ungültige Case-ID', () => {
    const result = documentUploadJsonSchema.safeParse({
      caseId: 'invalid-id',
      fileBase64: 'some-base64',
    });
    expect(result.success).toBe(false);
  });

  it('verwirft fehlende Datei', () => {
    const result = documentUploadJsonSchema.safeParse({
      caseId: '550e8400-e29b-41d4-a716-446655440000',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toContain('Datei');
  });

  it('akzeptiert optionalen Dateinamen', () => {
    const result = documentUploadJsonSchema.safeParse({
      caseId: '550e8400-e29b-41d4-a716-446655440000',
      fileBase64: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8',
      filename: 'test.pdf',
    });
    expect(result.success).toBe(true);
    expect(result.data?.filename).toBe('test.pdf');
  });
});

// ============================================================
// Edge Cases & Zod-Allgemein
// ============================================================

describe('Zod-Allgemein', () => {
  it('sichert, dass UUIDs validiert werden', () => {
    const uuidSchema = z.string().uuid();
    expect(uuidSchema.safeParse('550e8400-e29b-41d4-a716-446655440000').success).toBe(true);
    expect(uuidSchema.safeParse('not-a-uuid').success).toBe(false);
  });

  it('sichert, dass Email-Formate korrekt validiert werden', () => {
    const emailSchema = z.string().email();
    expect(emailSchema.safeParse('user@example.com').success).toBe(true);
    expect(emailSchema.safeParse('invalid').success).toBe(false);
  });

  it('sichert Password-Grenzen', () => {
    const pwSchema = z.string().min(6);
    expect(pwSchema.safeParse('123456').success).toBe(true);
    expect(pwSchema.safeParse('12345').success).toBe(false);
  });
});
