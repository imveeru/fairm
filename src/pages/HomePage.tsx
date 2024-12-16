import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium">Plan Your Next Crop 🌱</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Use our AI-powered planner to optimize your crop selection
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium">Check Market Prices 📊</h3>
                <p className="text-sm text-gray-600 mt-1">
                  View current market rates and trends
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Weather</p>
                  <p className="font-medium">Sunny, 25°C</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Soil Moisture</p>
                  <p className="font-medium">Optimal</p>
                </div>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium">Upcoming Tasks</h3>
                <p className="text-sm text-gray-600 mt-1">
                  2 tasks scheduled for today
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;