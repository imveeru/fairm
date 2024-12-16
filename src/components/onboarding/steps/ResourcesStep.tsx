import React from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Select } from '@/components/ui/select';
import { StepHeader } from '../StepHeader';
import { StepNavigation } from '../StepNavigation';
import { useAuthStore } from '@/store/authStore';
import { saveUserProfile } from '@/lib/supabase';
import { useConfigStore } from '@/store/configStore';

const levels = ['High', 'Medium', 'Low', 'None'];

interface ResourceData {
  water: string;
  labor: string;
  machinery: string;
  financial: string;
}

export const ResourcesStep: React.FC = () => {
  const { data, updateData, setStep, setComplete } = useOnboardingStore();
  const { user } = useAuthStore();
  const isTestMode = useConfigStore((state) => state.isTestMode);
  const [resources, setResources] = React.useState<ResourceData>({
    water: '',
    labor: '',
    machinery: '',
    financial: '',
  });
  const [saving, setSaving] = React.useState(false);

  const handleResourceChange = (type: keyof ResourceData, value: string) => {
    const newResources = { ...resources, [type]: value };
    setResources(newResources);
    
    const constraints = Object.entries(newResources)
      .filter(([_, level]) => level === 'Low' || level === 'None')
      .map(([type]) => `Limited ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    
    updateData({ 
      resourceConstraints: constraints,
      financialCapacity: newResources.financial 
    });
  };

  const handleComplete = async () => {
    if (!user?.email || !Object.values(resources).every(v => v)) return;

    setSaving(true);
    try {
      if (!isTestMode) {
        await saveUserProfile(user.id, user.email, {
          ...data,
          resourceConstraints: data.resourceConstraints,
          financialCapacity: data.financialCapacity,
        });
      }
      setComplete(true);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    setStep('equipment');
  };

  return (
    <div className="space-y-6">
      <StepHeader
        title="Resource Assessment"
        description="Help us understand your available resources and constraints."
      />

      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            💧 Water Availability
          </label>
          <Select
            value={resources.water}
            onValueChange={(value) => handleResourceChange('water', value)}
            placeholder="Select water availability"
            options={levels}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            👥 Labor Capacity
          </label>
          <Select
            value={resources.labor}
            onValueChange={(value) => handleResourceChange('labor', value)}
            placeholder="Select labor capacity"
            options={levels}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            🚜 Machinery Access
          </label>
          <Select
            value={resources.machinery}
            onValueChange={(value) => handleResourceChange('machinery', value)}
            placeholder="Select machinery access"
            options={levels}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            💰 Financial Capacity
          </label>
          <Select
            value={resources.financial}
            onValueChange={(value) => handleResourceChange('financial', value)}
            placeholder="Select financial capacity"
            options={levels}
          />
        </div>
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleComplete}
        nextLabel={saving ? 'Saving...' : 'Complete Setup'}
        isNextDisabled={!Object.values(resources).every(v => v) || saving}
      />
    </div>
  );
};