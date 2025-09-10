import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  description: string;
}

const WeatherWidget: React.FC = () => {
  // Mock weather data - will be replaced with real API data
  const weatherData: WeatherData = {
    location: "Mumbai, Maharashtra",
    temperature: 28,
    humidity: 75,
    rainfall: 2.5,
    windSpeed: 12,
    description: "Partly Cloudy"
  };

  return (
    <Card className="card-agricultural">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Cloud className="h-5 w-5" />
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">{weatherData.location}</h3>
            <p className="text-sm text-muted-foreground">{weatherData.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Thermometer className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="font-semibold">{weatherData.temperature}°C</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="font-semibold">{weatherData.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Cloud className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-muted-foreground">Rainfall</p>
                <p className="font-semibold">{weatherData.rainfall}mm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-muted-foreground">Wind Speed</p>
                <p className="font-semibold">{weatherData.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;