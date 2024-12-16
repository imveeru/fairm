import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id: string;
  email: string;
  location: string;
  climate: {
    zone: string;
    temperature: number;
    rainfall: number;
  };
  soil: {
    type: string;
    ph: number;
    fertility: string;
  };
  equipment: string[];
  machinery: string[];
  irrigationSystems: string[];
  resourceConstraints: string[];
  financialCapacity: string;
  created_at: string;
  updated_at: string;
}

export const saveUserProfile = async (userId:string, email: string, profileData: Partial<UserProfile>) => {
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
};

export const getUserProfile = async (email: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (error) throw error;
  return data as UserProfile;
};