import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize state from session storage
  const storedUser = sessionStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    setUser: (user) => {
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.removeItem('user');
      }
      set({ user, isAuthenticated: !!user });
    },
  };
});