import { create } from 'zustand';
import { OnboardingData, OnboardingStep } from '@/types/onboarding';

interface OnboardingState {
  currentStep: OnboardingStep;
  data: Partial<OnboardingData>;
  setStep: (step: OnboardingStep) => void;
  updateData: (data: Partial<OnboardingData>) => void;
  isComplete: boolean;
  setComplete: (value: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 'location',
  data: {},
  isComplete: false,
  setStep: (step) => set({ currentStep: step }),
  updateData: (newData) => 
    set((state) => ({ 
      data: { ...state.data, ...newData } 
    })),
  setComplete: (value) => set({ isComplete: value }),
}));