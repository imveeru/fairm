import React, { useState } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { StepHeader } from '../StepHeader';
import { StepNavigation } from '../StepNavigation';
import { Tractor, Wrench, Droplets } from 'lucide-react';

interface TagInputProps {
  value: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  icon: React.ReactNode;
  label: string;
}

const TagInput: React.FC<TagInputProps> = ({ value, onChange, placeholder, icon, label }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newValue = input.trim();
      if (newValue && !value.includes(newValue)) {
        onChange([...value, newValue]);
      }
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md bg-white">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-primary/10 text-primary"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-primary/70"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[200px] outline-none bg-transparent"
          />
        </div>
        <p className="text-xs text-gray-500">
          Press Enter or comma to add items
        </p>
      </div>
    </div>
  );
};

export const EquipmentStep: React.FC = () => {
  const { data, updateData, setStep } = useOnboardingStore();
  const [equipment, setEquipment] = useState<string[]>(data.equipment || []);
  const [machinery, setMachinery] = useState<string[]>(data.machinery || []);
  const [irrigationSystems, setIrrigationSystems] = useState<string[]>(data.irrigationSystems || []);

  const handleNext = () => {
    updateData({
      equipment,
      machinery,
      irrigationSystems,
    });
    setStep('resources');
  };

  const handleBack = () => {
    setStep('soil');
  };

  const isValid = equipment.length > 0 || machinery.length > 0 || irrigationSystems.length > 0;

  return (
    <div className="space-y-6">
      <StepHeader
        title="Equipment & Resources"
        description="Tell us about the equipment and resources you have available."
      />

      <div className="space-y-6">
        <TagInput
          value={equipment}
          onChange={setEquipment}
          placeholder="Add farming equipment (e.g., tractors, plows)"
          icon={<Tractor className="h-5 w-5 text-primary" />}
          label="Farming Equipment"
        />

        <TagInput
          value={machinery}
          onChange={setMachinery}
          placeholder="Add machinery (e.g., harvesters, seeders)"
          icon={<Wrench className="h-5 w-5 text-primary" />}
          label="Machinery"
        />

        <TagInput
          value={irrigationSystems}
          onChange={setIrrigationSystems}
          placeholder="Add irrigation systems (e.g., sprinklers, drip)"
          icon={<Droplets className="h-5 w-5 text-primary" />}
          label="Irrigation Systems"
        />
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={!isValid}
      />
    </div>
  );
};