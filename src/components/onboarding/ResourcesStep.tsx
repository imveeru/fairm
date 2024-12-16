import React from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const resourceConstraints = [
  'Limited Water Access',
  'Limited Labor',
  'Limited Machinery',
  'Limited Storage',
  'Limited Transportation',
];

const financialCapacities = [
  'High - Ready for significant investment',
  'Medium - Moderate investment possible',
  'Low - Limited investment capacity',
  'Minimal - Bootstrap operations',
];

export const ResourcesStep = () => {
  const { data, updateData, setStep, setComplete } = useOnboardingStore();

  const handleComplete = () => {
    if (data.resourceConstraints && data.financialCapacity) {
      setComplete(true);
      // Navigate to dashboard or home
      window.location.href = '/dashboard';
    }
  };

  const handleBack = () => {
    setStep('soil');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Resource Assessment</h3>
        <p className="text-sm text-gray-500">
          Help us understand your resource constraints and financial capacity.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resource Constraints
          </label>
          <Select
            value={data.resourceConstraints?.[0]}
            onValueChange={(value) => 
              updateData({ resourceConstraints: [value] })
            }
            placeholder="Select main resource constraint"
            options={resourceConstraints}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Financial Capacity
          </label>
          <Select
            value={data.financialCapacity}
            onValueChange={(value) => 
              updateData({ financialCapacity: value })
            }
            placeholder="Select your financial capacity"
            options={financialCapacities}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
        >
          Back
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!data.resourceConstraints || !data.financialCapacity}
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
};