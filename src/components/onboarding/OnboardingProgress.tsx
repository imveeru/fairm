import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useOnboardingStore } from '@/store/onboardingStore';
import { onboardingSteps } from '@/config/onboardingSteps';

export const OnboardingProgress: React.FC = () => {
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const progress = ((onboardingSteps.findIndex((step) => step.id === currentStep) + 1) / onboardingSteps.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between mt-2">
        {onboardingSteps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              onboardingSteps.findIndex((s) => s.id === currentStep) >= 
              onboardingSteps.findIndex((s) => s.id === step.id)
                ? 'text-primary'
                : 'text-gray-400'
            }`}
          >
            <span className="text-lg mb-1">{step.emoji}</span>
            <span className="text-xs">{step.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};