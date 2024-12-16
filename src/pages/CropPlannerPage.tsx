import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { AISummary } from '@/components/shared/AISummary';
import { MarkdownContent } from '@/components/shared/MarkdownContent';

const CropPlannerPage = () => {
  const aiSummary = `## AI-Generated Insights
Based on your farm's data:

- **Optimal Crops**: Wheat, Soybeans
- **Expected Yield**: 15-20% above average
- **Risk Factors**: Early frost potential
- **Recommendations**: Consider early planting`;

  const geographyContent = `# Geography Analysis
Your farm's location provides optimal conditions for various crops.

## Key Findings
- Elevation: 500m above sea level
- Soil Type: Loamy
- Drainage: Good

## Detailed Analysis
The geographical features of your farm create unique opportunities and challenges:

### Topography
- Gentle slopes promote good drainage
- Natural windbreaks from surrounding vegetation
- Adequate sun exposure throughout growing season

### Soil Composition
- Rich in organic matter
- Good water retention
- Balanced mineral content

### Land Features
- Natural water sources nearby
- Protected from extreme weather
- Accessible for machinery`;

  const weatherContent = `# Weather Report
Current and forecasted weather conditions for your region.

## Forecast
- Temperature: 18-25°C
- Rainfall: 60mm expected
- Humidity: 65%

## Seasonal Outlook
Detailed analysis of expected weather patterns:

### Spring
- Moderate rainfall
- Gradual temperature increase
- Low frost risk

### Summer
- Stable temperatures
- Occasional thunderstorms
- Good growing conditions

### Fall
- Cooling trends
- Harvest-friendly conditions
- Early frost possible`;

  const resourcesContent = `# Resource Optimization
Recommendations for efficient resource utilization.

## Available Resources
- Water: Adequate
- Labor: Limited
- Equipment: Available

## Optimization Strategies
Detailed recommendations for resource management:

### Water Management
- Implement drip irrigation
- Monitor soil moisture
- Schedule watering efficiently

### Labor Planning
- Automate where possible
- Optimize work schedules
- Focus on high-priority tasks

### Equipment Usage
- Regular maintenance
- Shared equipment options
- Upgrade recommendations`;

  const demandContent = `# Market Demand Prediction
Analysis of current and future market trends.

## Market Trends
- Wheat: High demand
- Corn: Stable
- Soybeans: Increasing

## Future Projections
Detailed market analysis and predictions:

### Short-term Outlook
- Rising demand for organic produce
- Stable grain prices
- Local market opportunities

### Long-term Forecast
- Sustainable farming premium
- Export market potential
- Value-added products`;

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
              <TabsTrigger value="demand">Demand Prediction</TabsTrigger>
            </TabsList>

            <div className="mt-6 h-[calc(100%-4rem)] overflow-y-auto">
              <TabsContent value="geography">
                <MarkdownContent content={geographyContent} />
              </TabsContent>

              <TabsContent value="weather">
                <MarkdownContent content={weatherContent} />
              </TabsContent>

              <TabsContent value="resources">
                <MarkdownContent content={resourcesContent} />
              </TabsContent>

              <TabsContent value="demand">
                <MarkdownContent content={demandContent} />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CropPlannerPage;