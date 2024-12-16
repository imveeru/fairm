import React, { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { StepHeader } from '../StepHeader';
import { MapPin } from 'lucide-react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const LocationStep: React.FC = () => {
  const { data, updateData, setStep } = useOnboardingStore();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    if (coordinates) {
      updateData({
        location: `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`,
      });
    }
  }, [coordinates, updateData]);

  const handleNext = () => {
    if (data.location) {
      setStep('climate');
    }
  };

  return (
    <div className="space-y-6">
      <StepHeader
        title="Where is your farm located?"
        description="This helps us provide region-specific recommendations."
      />

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Button
            type="button"
            variant="outline"
            onClick={getLocation}
            disabled={loading}
            className="w-full"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {loading ? 'Getting Location...' : 'Get Current Location'}
          </Button>
        </div>

        {coordinates && (
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm text-green-800">
              📍 Location detected: {coordinates.latitude.toFixed(6)}°N, {coordinates.longitude.toFixed(6)}°E
            </p>
          </div>
        )}

        <div className="text-sm text-gray-500 text-center">- or -</div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Coordinates Manually
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Latitude"
              step="0.000001"
              className="rounded-md border border-gray-300 px-3 py-2"
              onChange={(e) => {
                const lat = parseFloat(e.target.value);
                const lon = coordinates?.longitude || 0;
                setCoordinates({ latitude: lat, longitude: lon });
              }}
              value={coordinates?.latitude || ''}
            />
            <input
              type="number"
              placeholder="Longitude"
              step="0.000001"
              className="rounded-md border border-gray-300 px-3 py-2"
              onChange={(e) => {
                const lon = parseFloat(e.target.value);
                const lat = coordinates?.latitude || 0;
                setCoordinates({ latitude: lat, longitude: lon });
              }}
              value={coordinates?.longitude || ''}
            />
          </div>
        </div>
      </div>

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