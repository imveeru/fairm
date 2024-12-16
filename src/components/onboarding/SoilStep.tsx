import React from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const soilTypes = [
  'Sandy',
  'Clay',
  'Silt',
  'Loam',
  'Sandy Loam',
  'Clay Loam',
  'Silty Clay',
];

const fertilityLevels = ['high', 'medium', 'low'];

export const SoilStep = () => {
  const { data, updateData, setStep } = useOnboardingStore();

  const handleNext = () => {
    if (data.soil?.type && data.soil?.ph && data.soil?.fertility) {
      setStep('resources');
    }
  };

  const handleBack = () => {
    setStep('climate');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tell us about your soil</h3>
        <p className="text-sm text-gray-500">
          Soil characteristics are crucial for determining suitable crops and necessary amendments.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Soil Type
          </label>
          <Select
            value={data.soil?.type}
            onValueChange={(value) => 
              updateData({ soil: { ...data.soil, type: value } })
            }
            placeholder="Select your soil type"
            options={soilTypes}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Soil pH
          </label>
          <Slider
            value={[data.soil?.ph || 7]}
            onValueChange={([value]) => 
              updateData({ soil: { ...data.soil, ph: value } })
            }
            min={0}
            max={14}
            step={0.1}
          />
          <span className="text-sm text-gray-500 mt-1">
            pH {data.soil?.ph || 7}
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fertility Level
          </label>
          <Select
            value={data.soil?.fertility}
            onValueChange={(value: 'high' | 'medium' | 'low') => 
              updateData({ soil: { ...data.soil, fertility: value } })
            }
            placeholder="Select fertility level"
            options={fertilityLevels}
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
          onClick={handleNext}
          disabled={!data.soil?.type || !data.soil?.ph || !data.soil?.fertility}
        >
          Next
        </Button>
      </div>
    </div>
  );
};