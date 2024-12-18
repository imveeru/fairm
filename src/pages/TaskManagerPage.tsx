import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { TaskScheduler } from '@/components/tasks/TaskScheduler';
import {  InfoIcon, Loader, RefreshCwIcon  } from 'lucide-react';
import { Callout } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
// import { Plus } from 'lucide-react';
// import "@bitnoi.se/react-scheduler/dist/style.css";
import { useQuery } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';
import { AISummary } from '@/components/shared/AISummary';
import Markdown from 'react-markdown';
import { MarkdownContent } from '@/components/shared/MarkdownContent';

const TaskManagerPage = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  // const API_URL = "http://localhost:8000";
  const { profile } = useProfile();
  const lat = parseFloat(profile["location"].split(",")[0]);
  const lon = parseFloat(profile["location"].split(",")[1]);
  
  const resourcesData = {
    "equipments":profile.equipment,
    "financialCapacity":profile.financialCapacity,
    "irrigation":profile.irrigationSystems,
    "machinery":profile.machinery,
    "constraints":profile.resourceConstraints,    
  }
  const { data: weatherData } = useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
      return response.json();
    },
  });
  const { data: soilData } = useQuery({
    queryKey: ['soilData'],
    queryFn: async () => {
      const response = await fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=clay&property=nitrogen&property=ocd&property=phh2o&property=sand&property=silt&property=soc&depth=0-5cm&depth=0-30cm&depth=5-15cm&depth=15-30cm&value=mean&value=uncertainty`);
      return response.json();
    },
  });

  const inputData = {
    "soil_profile":soilData,
    "resources":resourcesData,
    "weather":weatherData,
    "location":`Latitude:${lat},Longitude:${lon}`
  }

  const { data: taskPlan, isLoading:taskLoading } = useQuery({
    queryKey: ['aiInsights'],
    queryFn: async () => {
      const URL = `${API_URL}/api/ai/get_task_plan?input_data=${JSON.stringify(inputData)}`
      const response = await fetch(URL,{method:"POST"});
      return response.json();
    },
    staleTime: 600000
  });

  // console.log("Tasks: ",JSON.stringify(taskPlan))
  

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          {/* <Button variant={"secondary"}>
            <RefreshCwIcon onClick={} className="w-4 h-4 mr-2" />
            Create another plan
          </Button> */}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          
          <div className="lg:col-span-4">
            {taskPlan && <AISummary summary={taskPlan["interpretation"]} />}
            <Card className="p-6">
              {taskLoading && <Loader className='animate-spin text-primary' />}
              {taskPlan ? <MarkdownContent content={taskPlan["calendar"]}/> : <TaskScheduler />}
            </Card>
            <div className='py-6'>
            <Callout.Root>
              <Callout.Icon>
                <InfoIcon />
              </Callout.Icon>
              <Callout.Text>
                Google Calendar integration coming soon!
              </Callout.Text>
            </Callout.Root>
            </div>

          </div>

          {/* <div>
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Task Details</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="font-medium">Soil Preparation</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Field 1 - Main Plot
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                      In Progress
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="font-medium">Planting Season - Wheat</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Field 2 - Secondary Plot
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="px-2 py-1 text-xs text-orange-600 bg-orange-100 rounded">
                      Scheduled
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <h3 className="font-medium">Irrigation Schedule</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    All Fields
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded">
                      Recurring
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div> */}
        </div>
      </div>
      
    </DashboardLayout>
  );
};

export default TaskManagerPage;