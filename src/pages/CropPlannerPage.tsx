import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { AISummary } from '@/components/shared/AISummary';
import { MarkdownContent } from '@/components/shared/MarkdownContent';
import { useQuery } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';
import {List, Loader} from 'lucide-react';


const CropPlannerPage = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  const { profile } = useProfile();
  // console.log("Profile", profile["location"].split(","));
  const lat = parseFloat(profile["location"].split(",")[0]);
  const lon = parseFloat(profile["location"].split(",")[1]);

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

  const resourcesData = {
    "equipments":profile.equipment,
    "financialCapacity":profile.financialCapacity,
    "irrigation":profile.irrigationSystems,
    "machinery":profile.machinery,
    "constraints":profile.resourceConstraints,    
  }

  const { data: aiInsights, isLoading:contentLoading } = useQuery({
    queryKey: ['aiInsights'],
    queryFn: async () => {
      const URL = `${API_URL}/api/ai/get_crop_plan?soil_data=${JSON.stringify(soilData) || ""}&weather_data=${JSON.stringify(weatherData)}&resources_data=${JSON.stringify(resourcesData)}`
      const response = await fetch(URL,{method:"POST"});
      return response.json();
    },
    staleTime: 600000
  });

  console.log(JSON.stringify(aiInsights))

  interface SoilProfileContent {
      interpretation: string;
      crops: [string, string][];
  }


function convertToMarkdown(content: SoilProfileContent): string {
    // Ensure the crops array is defined and has elements
    if (!content.crops || content.crops.length === 0) {
        throw new Error("Crops data is missing or empty.");
    }

    // Create a markdown for the soil interpretation
    let markdown = `### Interpretation\n\n${content.interpretation}\n\n`;

    // Create a markdown for the list of crops
    markdown += `### Recommended Crops\n\n`;

    console.log(content.crops)

    content.crops.forEach(crop => {
        markdown += `- **${crop[0]}**: ${crop[1]}\n`;
    });

    return markdown;
  }

  let aiSummary= "";
  let geographyContent = "";
  let weatherContent = "";
  let resourcesContent = ""; 
  
  if(aiInsights){
    aiSummary= aiInsights["summary"];
    geographyContent = convertToMarkdown(aiInsights["geo_res"]);
    weatherContent = convertToMarkdown(aiInsights["weather_res"]);
    resourcesContent = convertToMarkdown(aiInsights["optim_res"]); 
  }

  

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Crop Planner</h1>
        
        <AISummary summary={aiSummary} />
        
        <Card className="p-6">
          <Tabs defaultValue="geography" className="h-[calc(100vh-24rem)]">
            <TabsList className="bg-gray-100/50">
              <TabsTrigger value="geography">Geography Analysis</TabsTrigger>
              <TabsTrigger value="weather">Weatherman's Report</TabsTrigger>
              <TabsTrigger value="resources">Resource Optimization</TabsTrigger>
              {/* <TabsTrigger value="demand">Demand Prediction</TabsTrigger> */}
            </TabsList>

            <div className="mt-6 h-[calc(100%-4rem)] overflow-y-auto">
              <TabsContent value="geography">
                {contentLoading && <Loader className='animate-spin text-primary' />}
                <MarkdownContent content={geographyContent} />
              </TabsContent>

              <TabsContent value="weather">
                {contentLoading && <Loader className='animate-spin text-primary' />}
                <MarkdownContent content={weatherContent} />
              </TabsContent>

              <TabsContent value="resources">
                {contentLoading && <Loader className='animate-spin text-primary' />}
                <MarkdownContent content={resourcesContent} />
              </TabsContent>

              {/* <TabsContent value="demand">
                <MarkdownContent content={demandContent} />
              </TabsContent> */}
            </div>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CropPlannerPage;