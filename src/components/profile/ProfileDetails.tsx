import React from 'react';
import { UserProfile } from '@/types/profile';
import { MapPin, Cloud, Sprout, Droplets, Users, Tractor, Wallet } from 'lucide-react';

interface ProfileDetailsProps {
  profile: UserProfile | null;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
  if (!profile) return null;

  const sections = [
    {
      title: 'Location',
      icon: <MapPin className="h-5 w-5 text-primary" />,
      value: profile.location,
    },
    {
      title: 'Climate Zone',
      icon: <Cloud className="h-5 w-5 text-primary" />,
      value: profile.climate?.zone,
      subValue: `${profile.climate?.temperature}°C, ${profile.climate?.rainfall}mm rainfall`,
    },
    {
      title: 'Soil Information',
      icon: <Sprout className="h-5 w-5 text-primary" />,
      value: profile.soil?.type,
      subValue: `pH ${profile.soil?.ph}, ${profile.soil?.fertility} fertility`,
    },
    {
      title: 'Water Resources',
      icon: <Droplets className="h-5 w-5 text-primary" />,
      value: profile.irrigationSystems?.join(', ') || 'Not specified',
    },
    {
      title: 'Labor Capacity',
      icon: <Users className="h-5 w-5 text-primary" />,
      value: profile.resourceConstraints?.includes('Limited Labor') ? 'Limited' : 'Adequate',
    },
    {
      title: 'Equipment & Machinery',
      icon: <Tractor className="h-5 w-5 text-primary" />,
      value: [...(profile.equipment || []), ...(profile.machinery || [])].join(', ') || 'Not specified',
    },
    {
      title: 'Financial Capacity',
      icon: <Wallet className="h-5 w-5 text-primary" />,
      value: profile.financialCapacity,
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
          <div className="flex items-center space-x-2 mb-2">
            {section.icon}
            <h3 className="font-medium">{section.title}</h3>
          </div>
          <p className="text-gray-900">{section.value}</p>
          {section.subValue && (
            <p className="text-sm text-gray-500 mt-1">{section.subValue}</p>
          )}
        </div>
      ))}
    </div>
  );
};