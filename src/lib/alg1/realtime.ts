// src/lib/alg1/realtime.ts
// SLICE 3 — Supabase Realtime Subscriptions für den ALG1-Flow.
import { supabase } from '../supabase';

export function subscribeToDocuments(caseId: string, callback: () => void) {
  return supabase
    .channel(`documents:${caseId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'documents_meta',
      filter: `case_id=eq.${caseId}`,
    }, callback)
    .subscribe();
}

export function subscribeToApplication(applicationId: string, callback: () => void) {
  return supabase
    .channel(`application:${applicationId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'applications',
      filter: `id=eq.${applicationId}`,
    }, callback)
    .subscribe();
}
