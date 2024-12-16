import React from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const locations = [
  'North America - Northeast',
  'North America - Southeast',
  'North America - Midwest',
  'North America - Southwest',
  'North America - West',
];

export const LocationStep = () => {
  const { data, updateData, setStep } = useOnboardingStore();

  const handleNext = () => {
    if (data.location) {
      setStep('climate');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Where is your farm located?</h3>
        <p className="text-sm text-gray-500">
          This helps us provide region-specific recommendations.
        </p>
      </div>

      <Select
        value={data.location}
        onValueChange={(value) => updateData({ location: value })}
        placeholder="Select your region"
        options={locations}
      />

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!data.location}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </div>
  );
};