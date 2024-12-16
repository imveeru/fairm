import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { TaskScheduler } from '@/components/tasks/TaskScheduler';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const TaskManagerPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="p-6">
              <TaskScheduler />
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Task Details</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Soil Preparation</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Field 1 - Main Plot
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      In Progress
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Planting Season - Wheat</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Field 2 - Secondary Plot
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                      Scheduled
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Irrigation Schedule</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    All Fields
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      Recurring
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskManagerPage;