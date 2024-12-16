import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AISummary } from '@/components/shared/AISummary';
import { MarkdownContent } from '@/components/shared/MarkdownContent';

const MarketHubPage = () => {
  const { data: marketData } = useQuery({
    queryKey: ['market'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/market/prices');
      return response.json();
    },
  });

  const aiSummary = `## Market Intelligence Summary
Current market analysis indicates:

- **Price Trends**: Upward momentum for wheat
- **Supply Chain**: Optimal logistics routes available
- **Market Gaps**: High demand for organic produce
- **Action Items**: Consider forward contracts`;

  const logisticsContent = `# Logistics Analysis
Optimize your supply chain and transportation.

## Available Partners
- Regional transporters
- Storage facilities
- Distribution networks

## Recommendations
Based on your location and production volume:

### Transportation
- Optimal routes identified
- Cost-effective carriers available
- Bulk shipping opportunities

### Storage
- Local facilities available
- Temperature-controlled options
- Flexible capacity

### Distribution
- Direct-to-market channels
- Wholesale partnerships
- Export opportunities`;

  const ideasContent = `# Future Market Opportunities
Strategic planning for market expansion.

## Emerging Trends
- Organic certification premium
- Sustainable farming practices
- Value-added processing

## Growth Strategies
Detailed analysis of potential opportunities:

### Product Development
- Organic certification
- Specialty crop varieties
- Value-added processing

### Market Expansion
- Direct-to-consumer channels
- Export markets
- Niche market segments

### Sustainability Initiatives
- Carbon credits
- Regenerative practices
- Eco-certification`;

  const priceData = marketData?.crop_prices
    ? Object.entries(marketData.crop_prices).map(([crop, price]) => ({
        crop,
        price,
      }))
    : [];

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
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Current Market Prices</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="crop" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#27A383" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {marketData?.demand_forecast &&
                      Object.entries(marketData.demand_forecast).map(([crop, trend]) => (
                        <div key={crop} className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium capitalize">{crop}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Trend: <span className="capitalize">{trend}</span>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logistics">
                <MarkdownContent content={logisticsContent} />
              </TabsContent>

              <TabsContent value="ideas">
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