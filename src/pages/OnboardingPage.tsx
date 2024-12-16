import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { OnboardingStepRenderer } from '@/components/onboarding/OnboardingStepRenderer';
import { PageLayout } from '@/components/layout/PageLayout';
import { onboardingSteps } from '@/config/onboardingSteps';

const OnboardingPage: React.FC = () => {
  const { user } = useAuthStore();
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const currentStepInfo = onboardingSteps.find((step) => step.id === currentStep);

  if (!user) {
    return <Navigate to="/auth?type=login" />;
  }

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">{currentStepInfo?.emoji}</div>
              <h2 className="text-2xl font-bold">{currentStepInfo?.title}</h2>
              <p className="text-gray-600 mt-2">{currentStepInfo?.description}</p>
            </div>
            <OnboardingProgress />
            <OnboardingStepRenderer />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OnboardingPage;