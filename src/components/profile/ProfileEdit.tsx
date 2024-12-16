import React from 'react';
import { useForm } from 'react-hook-form';
import { UserProfile } from '@/types/profile';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { CLIMATE_ZONES, SOIL_TYPES, FERTILITY_LEVELS } from '@/utils/constants';

interface ProfileEditProps {
  profile: UserProfile | null;
  onSave: (data: Partial<UserProfile>) => void;
  onSuccess: () => void;
}

export const ProfileEdit: React.FC<ProfileEditProps> = ({ profile, onSave, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      location: profile?.location || '',
      climate: {
        zone: profile?.climate?.zone || '',
        temperature: profile?.climate?.temperature || 20,
        rainfall: profile?.climate?.rainfall || 1000,
      },
      soil: {
        type: profile?.soil?.type || '',
        ph: profile?.soil?.ph || 7,
        fertility: profile?.soil?.fertility || 'medium',
      },
      equipment: profile?.equipment || [],
      machinery: profile?.machinery || [],
      irrigationSystems: profile?.irrigationSystems || [],
      resourceConstraints: profile?.resourceConstraints || [],
      financialCapacity: profile?.financialCapacity || '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await onSave(data);
      onSuccess();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Climate Zone</label>
          <Select
            value={profile?.climate?.zone}
            onValueChange={(value) => register('climate.zone').onChange({ target: { value } })}
            options={CLIMATE_ZONES}
            placeholder="Select climate zone"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Soil Type</label>
          <Select
            value={profile?.soil?.type}
            onValueChange={(value) => register('soil.type').onChange({ target: { value } })}
            options={SOIL_TYPES}
            placeholder="Select soil type"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Soil pH</label>
          <Slider
            value={[profile?.soil?.ph || 7]}
            onValueChange={([value]) => register('soil.ph').onChange({ target: { value } })}
            min={0}
            max={14}
            step={0.1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Soil Fertility</label>
          <Select
            value={profile?.soil?.fertility}
            onValueChange={(value) => register('soil.fertility').onChange({ target: { value } })}
            options={FERTILITY_LEVELS}
            placeholder="Select fertility level"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};