import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { UserProfile } from '../schemas/profile';

interface ProfileStore {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  loadProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<UserProfile>) => Promise<boolean>;
  setAvatar: (url: string | null) => void;
  setName: (firstName: string, lastName: string) => void;
  setEmail: (email: string) => void;
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
  loading: false,
  error: null,

  loadProfile: async (userId: string) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set({ profile: mapDbToProfile(data), loading: false });
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
}));
