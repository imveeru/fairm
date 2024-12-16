export interface UserProfile {
  id?: string;
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
    fertility: 'high' | 'medium' | 'low';
  };
  equipment: string[];
  machinery: string[];
  irrigationSystems: string[];
  resourceConstraints: string[];
  financialCapacity: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}