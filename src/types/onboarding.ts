export interface OnboardingData {
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
}

export type OnboardingStep = 'location' | 'climate' | 'soil' | 'equipment' | 'resources';