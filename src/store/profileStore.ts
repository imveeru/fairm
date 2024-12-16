import { create } from 'zustand';
import { ProfileState, UserProfile } from '@/types/profile';

interface ProfileStore extends ProfileState {
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  setProfile: (profile) => set({ profile, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearProfile: () => set({ profile: null, error: null }),
}));