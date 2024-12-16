import { User } from '@supabase/supabase-js';
import { useConfigStore } from '@/store/configStore';

const TEST_USER = {
  email: 'admin@fairm.com',
  password: 'password',
};

export const mockSignIn = async (email: string, password: string) => {
  const isTestMode = useConfigStore.getState().isTestMode;

  if (!isTestMode) {
    throw new Error('Test mode is disabled');
  }

  if (email === TEST_USER.email && password === TEST_USER.password) {
    const mockUser: User = {
      id: 'test-user-id',
      email: TEST_USER.email,
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      role: 'authenticated',
    };
    return { data: { user: mockUser }, error: null };
  }
  return { data: { user: null }, error: new Error('Invalid credentials') };
};