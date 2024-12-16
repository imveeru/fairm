import React from 'react';
import { Card } from '@/components/ui/card';
import { UserProfile } from '@/types/profile';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FarmStatisticsProps {
  profile: UserProfile | null;
}

export const FarmStatistics: React.FC<FarmStatisticsProps> = ({ profile }) => {
  const resourceData = [
    { name: 'Water', value: profile?.resourceConstraints?.includes('Limited Water') ? 30 : 80 },
    { name: 'Labor', value: profile?.resourceConstraints?.includes('Limited Labor') ? 40 : 90 },
    { name: 'Machinery', value: profile?.resourceConstraints?.includes('Limited Machinery') ? 50 : 85 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Farm Statistics</h3>
      
      <div className="space-y-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#27A383" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Equipment Count</p>
            <p className="text-xl font-semibold">
              {(profile?.equipment?.length || 0) + (profile?.machinery?.length || 0)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Irrigation Systems</p>
            <p className="text-xl font-semibold">
              {profile?.irrigationSystems?.length || 0}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Resource Score</p>
            <p className="text-xl font-semibold">
              {profile?.resourceConstraints?.length ? 
                `${100 - (profile.resourceConstraints.length * 20)}%` : 
                '100%'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};