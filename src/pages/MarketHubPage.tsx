import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';
import { AISummary } from '@/components/shared/AISummary';
import {Loader} from 'lucide-react';
import { MarkdownContent } from '@/components/shared/MarkdownContent';

const MarketHubPage = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  const { profile } = useProfile();
  // console.log("Profile", profile["location"].split(","));
  const lat = parseFloat(profile["location"].split(",")[0]);
  const lon = parseFloat(profile["location"].split(",")[1]);

  const { data: locationAddress } = useQuery({
    queryKey: ['locationAddress'],
    queryFn: async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${profile["location"].split(",")[0]}&lon=${profile["location"].split(",")[1]}`);
      return response.json();
    },
  });

  let priceData = "No need to forecast due to unavailability of pricing data.";
  if(locationAddress["address"]["country"] == "India"){
    const { data: priceData } = useQuery({
      queryKey: ['priceData'],
      queryFn: async () => {
        const response = await fetch(`https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?format=json&api-key=579b464db66ec23bdd000001cdc3b564546246a772a26393094f5645&filters[State.keyword]=${locationAddress["address"]["state"]}&filters[District.keyword]=${locationAddress["address"]["state_district"]}&filters[Commodity.keyword]=Apple&sort[Market.keyword]=asc`);
        return response.json();
      },
    });
  }

  const resourcesData = {
    "equipments":profile.equipment,
    "financialCapacity":profile.financialCapacity,
    "irrigation":profile.irrigationSystems,
    "machinery":profile.machinery,
    "constraints":profile.resourceConstraints,    
  }

  // console.log()

  const { data: marketData, isLoading:contentLoading } = useQuery({
    queryKey: ['marketData'],
    queryFn: async () => {
      const URL = `${API_URL}/api/ai/get_logistics?price_data=${JSON.stringify(priceData) || "No need to forecast due to unavailability of pricing data."}&resources_data=${JSON.stringify(resourcesData)}`
      const response = await fetch(URL, {method:"POST"});
      return response.json();
    },
    staleTime: 600000
  });

  // console.log(marketData)

  const priceContent = marketData?.forecast_res;

  const aiSummary = marketData?.summary;

  const logisticsContent = marketData?.logistics_res;

  const ideasContent = marketData?.strategy_res;


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Market & Logistics Hub</h1>
        
        <AISummary summary={aiSummary} />
        
        <Card className="p-6">
          <Tabs defaultValue="prices" className="h-[calc(100vh-24rem)]">
            <TabsList className="bg-gray-100/50">
              <TabsTrigger value="prices">Price Forecasting</TabsTrigger>
              <TabsTrigger value="logistics">Logistics Match</TabsTrigger>
              <TabsTrigger value="ideas">Future Ideas</TabsTrigger>
            </TabsList>

            <div className="mt-6 h-[calc(100%-4rem)] overflow-y-auto">
              <TabsContent value="prices" className="h-full">
                {contentLoading && <Loader className='animate-spin text-primary' />}
                <MarkdownContent content={priceContent} />
              </TabsContent>

              <TabsContent value="logistics">
                {contentLoading && <Loader className='animate-spin text-primary' />}
                <MarkdownContent content={logisticsContent} />
              </TabsContent>

              <TabsContent value="ideas">
                {contentLoading && <Loader className='animate-spin text-primary' />}
                <MarkdownContent content={ideasContent} />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MarketHubPage;