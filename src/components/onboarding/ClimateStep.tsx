import React from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const climateZones = [
  'Tropical',
  'Subtropical',
  'Mediterranean',
  'Temperate',
  'Continental',
  'Polar',
];

export const ClimateStep = () => {
  const { data, updateData, setStep } = useOnboardingStore();

  const handleNext = () => {
    if (data.climate?.zone && data.climate?.temperature && data.climate?.rainfall) {
      setStep('soil');
    }
  };

  const handleBack = () => {
    setStep('location');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">What's your climate like?</h3>
        <p className="text-sm text-gray-500">
          This information helps us recommend suitable crops and farming practices.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Climate Zone
          </label>
          <Select
            value={data.climate?.zone}
            onValueChange={(value) => 
              updateData({ climate: { ...data.climate, zone: value } })
            }
            placeholder="Select your climate zone"
            options={climateZones}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Temperature (°C)
          </label>
          <Slider
            value={[data.climate?.temperature || 20]}
            onValueChange={([value]) => 
              updateData({ climate: { ...data.climate, temperature: value } })
            }
            min={-20}
            max={50}
            step={1}
          />
          <span className="text-sm text-gray-500 mt-1">
            {data.climate?.temperature || 20}°C
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Rainfall (mm)
          </label>
          <Slider
            value={[data.climate?.rainfall || 1000]}
            onValueChange={([value]) => 
              updateData({ climate: { ...data.climate, rainfall: value } })
            }
            min={0}
            max={4000}
            step={50}
          />
          <span className="text-sm text-gray-500 mt-1">
            {data.climate?.rainfall || 1000}mm
          </span>
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
          disabled={!data.climate?.zone || !data.climate?.temperature || !data.climate?.rainfall}
        >
          Next
        </Button>
      </div>
    </div>
  );
};