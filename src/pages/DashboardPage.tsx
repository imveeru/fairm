import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Droplets, Thermometer, Wind, Sprout, ExternalLink } from 'lucide-react';
import { Table } from '@/components/ui/table';

const DashboardPage = () => {
  const { data: weatherData } = useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/weather/1');
      return response.json();
    },
  });

  const { data: soilData } = useQuery({
    queryKey: ['soil'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/soil/1');
      return response.json();
    },
  });

  const kpiCards = [
    {
      title: 'Temperature',
      value: `${weatherData?.temperature || 0}°C`,
      icon: <Thermometer className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Humidity',
      value: `${weatherData?.humidity || 0}%`,
      icon: <Droplets className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Wind Speed',
      value: '12 km/h',
      icon: <Wind className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Crop Health',
      value: '95%',
      icon: <Sprout className="h-6 w-6 text-primary" />,
    },
  ];

  const newsItems = [
    {
      title: "New Sustainable Farming Practices Show Promise",
      description: "Recent studies reveal that regenerative agriculture techniques can increase soil health by up to 40% while reducing water usage.",
      link: "#",
    },
    {
      title: "AI Technology Revolutionizes Crop Disease Detection",
      description: "Machine learning algorithms achieve 95% accuracy in early identification of common crop diseases, enabling preventive measures.",
      link: "#",
    },
    {
      title: "Global Market Trends: Rising Demand for Organic Produce",
      description: "Market analysis indicates a 25% increase in organic produce demand, presenting new opportunities for farmers.",
      link: "#",
    },
    {
      title: "Climate-Resilient Crop Varieties Development",
      description: "Scientists develop new crop varieties that can withstand extreme weather conditions while maintaining high yields.",
      link: "#",
    },
    {
      title: "Smart Irrigation Systems Reduce Water Usage",
      description: "Implementation of IoT-based irrigation systems shows 30% reduction in water consumption across test farms.",
      link: "#",
    },
  ];

  const soilMoistureData = [
    { depth: "0-10 cm", moisture: "45%", status: "Optimal" },
    { depth: "10-20 cm", moisture: "50%", status: "High" },
    { depth: "20-30 cm", moisture: "48%", status: "Optimal" },
    { depth: "30-40 cm", moisture: "52%", status: "High" },
    { depth: "40-50 cm", moisture: "47%", status: "Optimal" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">{card.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-2xl font-semibold">{card.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">What's happening in the farming world?</h2>
              <div className="space-y-6">
                {newsItems.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <a 
                      href={item.link}
                      className="text-primary hover:text-primary/80 text-sm inline-flex items-center"
                    >
                      Read more <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Soil Moisture Levels</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium text-gray-600">Depth</th>
                      <th className="text-left py-2 font-medium text-gray-600">Moisture</th>
                      <th className="text-left py-2 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soilMoistureData.map((row, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2">{row.depth}</td>
                        <td className="py-2">{row.moisture}</td>
                        <td className="py-2">
                          <span 
                            className={`px-2 py-1 rounded-full text-xs ${
                              row.status === 'Optimal' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;