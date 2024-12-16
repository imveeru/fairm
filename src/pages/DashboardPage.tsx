import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Droplets, Thermometer, Wind, CloudMoonRain, ExternalLink, CloudHail } from 'lucide-react';
import { Table } from '@/components/ui/table';
import { useProfile } from '@/hooks/useProfile';

const DashboardPage = () => {

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

  let locationName = "";
  if(locationAddress){
    locationName = locationAddress["address"]["state_district"]+", "+locationAddress["address"]["state"]+", "+locationAddress["address"]["country"];
  }
  
  const { data: weatherData } = useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,et0_fao_evapotranspiration&timezone=auto`);
      return response.json();
    },
  });

  const { data: newsItems } = useQuery({
    queryKey: ['newsItems'],
    queryFn: async () => {
      const URL = `${API_URL}/api/ai/get_news?loc=${locationName || ""}`
      // console.log(URL)
      const response = await fetch(URL, {method:"POST"});
      return response.json();
    },
    staleTime: 300000
  });

  const kpiCards = [
    {
      title: 'Temperature',
      value: `${weatherData?.current.temperature_2m || 0}°C`,
      icon: <Thermometer className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Humidity',
      value: `${weatherData?.current.relative_humidity_2m || 0}%`,
      icon: <Droplets className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Precipitation',
      value: `${weatherData?.current.precipitation || 0} mm`,
      icon: <CloudMoonRain className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Rain',
      value: `${weatherData?.current.rain || 0} mm`,
      icon: <CloudHail className="w-6 h-6 text-primary" />,
    },
  ];

  // const newsItems = [
  //   {
  //     title: "New Sustainable Farming Practices Show Promise",
  //     description: "Recent studies reveal that regenerative agriculture techniques can increase soil health by up to 40% while reducing water usage.",
  //     link: "#",
  //   },
  //   {
  //     title: "AI Technology Revolutionizes Crop Disease Detection",
  //     description: "Machine learning algorithms achieve 95% accuracy in early identification of common crop diseases, enabling preventive measures.",
  //     link: "#",
  //   },
  //   {
  //     title: "Global Market Trends: Rising Demand for Organic Produce",
  //     description: "Market analysis indicates a 25% increase in organic produce demand, presenting new opportunities for farmers.",
  //     link: "#",
  //   },
  //   {
  //     title: "Climate-Resilient Crop Varieties Development",
  //     description: "Scientists develop new crop varieties that can withstand extreme weather conditions while maintaining high yields.",
  //     link: "#",
  //   },
  //   {
  //     title: "Smart Irrigation Systems Reduce Water Usage",
  //     description: "Implementation of IoT-based irrigation systems shows 30% reduction in water consumption across test farms.",
  //     link: "#",
  //   },
  // ];

  const soilMoistureData = [
    { metric: "Air Pressure", value: weatherData?.current.pressure_msl+" hPa"},
    { metric: "Surface Pressure", value: weatherData?.current.surface_pressure+" hPa"},
    { metric: "Wind Speed", value: weatherData?.current.wind_speed_10m+" km/h"},
    { metric: "Wind Direction", value: weatherData?.current.wind_direction_10m+" °"},
    { metric: "Wind Gusts", value: weatherData?.current.wind_gusts_10m+" km/h"},
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((card, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">{card.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-2xl font-semibold">{card.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-semibold">🗞️ What's new in the world of farming?</h2>
              <div className="space-y-6">
                {newsItems && newsItems.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <h3 className="mb-2 font-medium">{item.title}</h3>
                    <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                      {item.snippet}
                    </p>
                    <a 
                      href={item.link}
                      className="inline-flex items-center text-sm text-primary hover:text-primary/80"
                      target='_blank'
                    >
                      Read more <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Other Related Metrics</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 font-medium text-left text-gray-600">Metric</th>
                      <th className="py-2 font-medium text-left text-gray-600">Value</th>
                      {/* <th className="py-2 font-medium text-left text-gray-600">Status</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {soilMoistureData.map((row, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2">{row.metric}</td>
                        <td className="py-2">{row.value}</td>
                        {/* <td className="py-2">
                          <span 
                            className={`px-2 py-1 rounded-full text-xs ${
                              row.status === 'Optimal' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td> */}
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