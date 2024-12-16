import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/profile';

export const profileService = {
  async saveProfile(userId:string, email: string, profileData: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([
        {
          id: userId,
          email,
          ...profileData,
          updated_at: new Date().toISOString(),
        },
      ], {
        onConflict: 'email',
      });

    if (error) throw error;
    return data;
  },

  async getProfile(email: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(email: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('email', email);

    if (error) throw error;
    return data;
  }
};