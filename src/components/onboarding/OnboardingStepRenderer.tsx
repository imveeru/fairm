import React from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { LocationStep } from './steps/LocationStep';
import { ClimateStep } from './steps/ClimateStep';
import { SoilStep } from './steps/SoilStep';
import { EquipmentStep } from './steps/EquipmentStep';
import { ResourcesStep } from './steps/ResourcesStep';

export const OnboardingStepRenderer: React.FC = () => {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 'location':
        return <LocationStep />;
      case 'climate':
        return <ClimateStep />;
      case 'soil':
        return <SoilStep />;
      case 'equipment':
        return <EquipmentStep />;
      case 'resources':
        return <ResourcesStep />;
      default:
        return <LocationStep />;
    }
  };

  return <div className="w-full">{renderStep()}</div>;
};