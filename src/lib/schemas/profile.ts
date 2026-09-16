import { z } from 'zod';

export const ProfileFormSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().max(20).optional(),
  postcode: z.string().regex(/^\d{5}$/, 'PLZ muss 5-stellig sein').optional(),
  city: z.string().max(100).optional(),
  housingType: z.enum(['RENT', 'OWN', 'PARENTS', 'OTHER']),
  childrenCount: z.number().min(0).max(20),
  employmentStatus: z.enum(['EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED', 'STUDENT', 'APPRENTICE', 'RETIRED', 'OTHER']),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;

export interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  postcode: string | null;
  city: string | null;
  housingType: 'RENT' | 'OWN' | 'PARENTS' | 'OTHER' | null;
  childrenCount: number;
  employmentStatus: string | null;
  avatarUrl: string | null;
  onboardingCompleted: boolean;
  onboardingDismissed: boolean;
}
