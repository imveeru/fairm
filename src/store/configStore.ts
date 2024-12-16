import { create } from 'zustand';

interface ConfigState {
  isTestMode: boolean;
  setTestMode: (value: boolean) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  isTestMode: false, // Default to true for development
  setTestMode: (value) => set({ isTestMode: value }),
}));