import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { DocumentEntry, UserProfile } from '../schemas/profile';

interface ProfileStore {
  profile: UserProfile | null;
  documents: DocumentEntry[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  loadProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<UserProfile>) => Promise<boolean>;
  setAvatar: (url: string | null) => void;
  setName: (firstName: string, lastName: string) => void;
  setEmail: (email: string) => void;

  // Dokumenten-Tresor
  loadDocuments: (userId: string) => Promise<void>;
  addDocument: (doc: DocumentEntry) => void;
  removeDocument: (docId: string) => void;
}

// DB (snake_case) → App (CamelCase). Single Source of Truth fürs Mapping.
export function mapDbToProfile(data: Record<string, unknown>): UserProfile {
  return {
    id: data.id as string,
    email: (data.email as string) ?? '',
    firstName: (data.first_name as string) ?? null,
    lastName: (data.last_name as string) ?? null,
    phone: (data.phone as string) ?? null,
    postcode: (data.postcode as string) ?? null,
    city: (data.city as string) ?? null,
    housingType: (data.housing_type as UserProfile['housingType']) ?? null,
    childrenCount: (data.children_count as number) ?? 0,
    employmentStatus: (data.employment_status as string) ?? null,
    avatarUrl: (data.avatar_url as string) ?? null,
    onboardingCompleted: Boolean(data.onboarding_completed),
    onboardingDismissed: Boolean(data.onboarding_dismissed),
  };
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  documents: [],
  loading: false,
  error: null,
  initialized: false,

  loadProfile: async (userId: string) => {
    set({ loading: true, error: null });

    // maybeSingle(): kein PGRST116-Fehler bei fehlender Zeile
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    // Kein Profil gefunden → einmalig anlegen, Ergebnis direkt in den Store.
    // Kein Retry, keine Rekursion (V6-Guard).
    if (!data && !error) {
      const { data: authData } = await supabase.auth.getUser();
      const { data: inserted, error: upsertError } = await supabase
        .from('profiles')
        .upsert({ id: userId, email: authData.user?.email, updated_at: new Date().toISOString() })
        .select('*')
        .single();

      if (upsertError || !inserted) {
        set({ error: 'Profil konnte nicht erstellt werden', loading: false, initialized: true });
        return;
      }
      set({ profile: mapDbToProfile(inserted), loading: false, error: null, initialized: true });
      return;
    }

    if (error) {
      set({ error: error.message, loading: false, initialized: true });
      return;
    }
    set({ profile: mapDbToProfile(data), loading: false, error: null, initialized: true });
  },

  updateProfile: async (userId: string, updates: Partial<UserProfile>) => {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
    if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
    if (updates.postcode !== undefined) dbUpdates.postcode = updates.postcode;
    if (updates.city !== undefined) dbUpdates.city = updates.city;
    if (updates.housingType !== undefined) dbUpdates.housing_type = updates.housingType;
    if (updates.childrenCount !== undefined) dbUpdates.children_count = updates.childrenCount;
    if (updates.employmentStatus !== undefined) dbUpdates.employment_status = updates.employmentStatus;
    const { error } = await supabase.from('profiles').update(dbUpdates).eq('id', userId);
    if (error) {
      set({ error: error.message });
      return false;
    }
    set((state) => ({ profile: state.profile ? { ...state.profile, ...updates } : null, error: null }));
    return true;
  },

  setAvatar: (url) => set((s) => ({ profile: s.profile ? { ...s.profile, avatarUrl: url } : null })),
  setName: (firstName, lastName) => set((s) => ({ profile: s.profile ? { ...s.profile, firstName, lastName } : null })),
  setEmail: (email) => set((s) => ({ profile: s.profile ? { ...s.profile, email } : null })),

  // ── Dokumenten-Tresor ──────────────────────────────────────
  loadDocuments: async (userId: string) => {
    const { data, error } = await supabase
      .from('documents_meta')
      .select(
        'id, user_id, application_id, document_role, filename, storage_path, file_size, mime_type, status, created_at',
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      set({ error: error.message });
      return;
    }
    set({ documents: (data ?? []) as DocumentEntry[], error: null });
  },

  addDocument: (doc) => set((s) => ({ documents: [doc, ...s.documents] })),

  removeDocument: (docId) =>
    set((s) => ({ documents: s.documents.filter((d) => d.id !== docId) })),
}));
