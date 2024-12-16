import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfile } from '@/hooks/useProfile';
import { ProfileDetails } from '@/components/profile/ProfileDetails';
import { ProfileEdit } from '@/components/profile/ProfileEdit';
import { FarmStatistics } from '@/components/profile/FarmStatistics';
import { UserCircle } from 'lucide-react';

const ProfilePage = () => {
  const { profile, isLoading, updateProfile } = useProfile();
  const [activeTab, setActiveTab] = useState('details');

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-pulse text-primary">Loading profile...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center mb-6 space-x-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <UserCircle className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{profile?.email}</h2>
                  <p className="text-gray-500">Account Details</p>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="details">Profile Details</TabsTrigger>
                  <TabsTrigger value="edit">Edit Profile</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="details">
                    <ProfileDetails profile={profile} />
                  </TabsContent>

                  <TabsContent value="edit">
                    <ProfileEdit 
                      profile={profile} 
                      onSave={updateProfile}
                      onSuccess={() => setActiveTab('details')} 
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>

          <div>
            <FarmStatistics profile={profile} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;