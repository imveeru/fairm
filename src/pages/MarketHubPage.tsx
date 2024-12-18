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

  const mockdata={
    "summary": "### Combined Insights for Optimizing Future Harvests\n\nGiven the challenges in forecasting commodity prices, it is advisable to expect fluctuations of 5% to 10% in the upcoming month, while closely monitoring market conditions. Ensuring an effective response during this uncertain period is vital.\n\n### Strategic Recommendations for Farmers:\n\n1. **Post-Harvest Analysis**: Assess current harvest yields, quality, and any issues faced to inform future decisions.\n  \n2. **Soil Health Assessment**: Conduct a soil health check to understand nutrient availability, which will guide crop planning.\n\n3. **Crop Selection**: Investigate high-value or drought-resistant crops suitable for your local climate to minimize costs. Legumes or grains may provide numerous advantages.\n\n4. **Sustainable Practices**: Implement low-cost practices like crop rotation and intercropping to improve biodiversity and soil health.\n\n5. **Value-Added Opportunities**: Explore options for milling or packaging grains that can lead to better pricing and branding.\n\n6. **Networking**: Connect with local agricultural cooperatives for shared resources and joint marketing benefits.\n\n7. **Logistics Planning**: Partner with **Logistics Company A**, known for its reliability in grain services, to ensure efficient transport of products to market, maintaining freshness and maximizing sales potential.\n\n8. **Funding and Grants**: Look for governmental and non-profit support to help offset costs associated with diversification and value-added processing.\n\n9. **Monitoring and Evaluation**: Establish a basic record-keeping system to track operational performance, adjusting strategies as needed with each growing cycle.\n\n10. **Preparation**: Secure quality seeds and inputs early, leveraging bulk-buying opportunities with other farmers for cost efficiency.\n\nThis comprehensive approach combines price awareness with strategic planning, leveraging both logistics expertise and sustainable practices for a more profitable upcoming season.",
    "forecast_res": "Given that there is no price data available for the commodity, it is incredibly challenging to provide a specific price forecast for the next month. However, if we consider typical market trends and external factors that often influence commodity prices, such as seasonal demand, economic conditions, and supply chain disruptions, we can make a generalized estimate. For many commodities, prices may experience fluctuations of around 5% to 10% month-over-month depending on these variables. Therefore, while I cannot provide a specific price, I would advise the expectation of a potential increase or decrease within this range based on typical market behavior, and emphasize the need for close monitoring of relevant news and trends to make informed decisions.",
    "logistics_res": "\"Logistics Company A: Rating 5.0 - Specializes in grains, known for exceptional service and reliability.\"",
    "strategy_res": "Given the absence of resources and the need to maximize profitability next season, I recommend the following detailed plan for the farmer, taking into account the geography and the exceptional service of Logistics Company A:\n\n1. **Post-Harvest Analysis**: Begin by reviewing the current harvest's performance—analyzing yields, quality, and any pest or disease issues. Document these results to inform decisions for the next planting.\n\n2. **Soil Health Assessment**: Since resources are limited, conduct a basic soil health assessment, if possible, utilizing extension services or local agricultural departments. Understanding nutrient availability and soil structure will help in planning for future crops.\n\n3. **Selecting Future Crops**: Based on geographical conditions (climate, soil type) and current market trends, consider diversifying into high-value or drought-resistant crops that require minimal input costs. Options may include legumes or grains that can improve soil health and provide cash flow.\n\n4. **Utilizing Sustainable Practices**: Implement low-cost sustainable practices such as crop rotation and intercropping. These methods not only enhance biodiversity but can lead to improved soil health and reduced dependency on chemical inputs.\n\n5. **Value-Added Opportunities**: Explore the possibility of value-added products that align with the expected future harvest. For instance, if grains are being produced, consider ways to mill or package them for direct sale, potentially creating a brand that can command a higher price.\n\n6. **Networking for Support**: Engage with local agricultural cooperatives or organizations for shared resources and knowledge, particularly for joint marketing efforts or access to better seed varieties. This approach can reduce costs and enhance market reach.\n\n7. **Logistics Planning with Company A**: To ensure that harvested products reach markets efficiently, establish a partnership with Logistics Company A. Their reputation for reliability can help streamline transport, ensuring that products arrive fresh and in good condition, maximizing sales potential.\n\n8. **Funding and Grants**: Investigate government programs or non-profit organizations that might offer funds, equipment, or technical assistance for farmers with limited resources. Consider applying for these to help offset initial costs associated with crop diversification or value-added processing.\n\n9. **Monitoring and Evaluation**: Create a simple record-keeping system for tracking expenses, yields, and sales, building a basis for evaluating success in the upcoming growing season. Learning from each cycle will help refine practices for future harvests.\n\n10. **Prepare for Season**: Start preparing for the next planting by securing quality seeds and inputs early where possible, considering bulk-buying as a way to reduce costs through collaboration with fellow farmers.\n\nThis strategic plan will lead to a more profitable yield next season by focusing on efficient resource use, sustainable practices, and effective logistics management, ultimately fostering resilience and growth in the farmer's operation."
  }

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