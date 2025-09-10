import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Cloud, Droplets, Thermometer, Wind, MapPin, RefreshCw, Eye, Gauge, AlertCircle } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeatherAPI } from '@/hooks/useWeatherAPI';

const WeatherWidget: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const { location, loading: locationLoading, error: locationError, refetch: refetchLocation } = useGeolocation();
  const { weather, loading: weatherLoading, error: weatherError, refetch: refetchWeather } = useWeatherAPI(
    location?.latitude,
    location?.longitude,
    apiKey
  );

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowApiInput(false);
      refetchWeather();
    }
  };

  // Show API key input if no key is set
  if (!apiKey && !showApiInput) {
    return (
      <Card className="card-agricultural">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Cloud className="h-5 w-5" />
            Real-Time Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              To get real-time weather data, you need an OpenWeatherMap API key.
              <br />
              Get your free API key at: <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-primary underline">openweathermap.org/api</a>
            </AlertDescription>
          </Alert>
          <Button onClick={() => setShowApiInput(true)} className="w-full">
            Enter API Key
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showApiInput) {
    return (
      <Card className="card-agricultural">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Cloud className="h-5 w-5" />
            Weather API Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">OpenWeatherMap API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Connect Weather API
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowApiInput(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Handle loading and error states
  if (locationLoading) {
    return (
      <Card className="card-agricultural">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Cloud className="h-5 w-5" />
            Real-Time Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-primary mr-2" />
            <p>Getting your location...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (locationError) {
    return (
      <Card className="card-agricultural">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Cloud className="h-5 w-5" />
            Real-Time Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
          <Button onClick={refetchLocation} className="w-full" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Location Access
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (weatherLoading) {
    return (
      <Card className="card-agricultural">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Cloud className="h-5 w-5" />
            Real-Time Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-primary mr-2" />
            <p>Loading weather data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (weatherError || !weather) {
    return (
      <Card className="card-agricultural">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Cloud className="h-5 w-5" />
            Real-Time Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {weatherError || 'Failed to load weather data'}
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={refetchWeather} className="flex-1" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
            <Button onClick={() => setShowApiInput(true)} variant="outline">
              Change API Key
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-agricultural">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Cloud className="h-5 w-5" />
            Live Weather
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              GPS
            </Badge>
            <Button size="sm" variant="ghost" onClick={refetchWeather}>
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Location and Current Conditions */}
          <div className="text-center pb-4 border-b">
            <h3 className="text-lg font-semibold text-foreground">
              {weather.location}
              {weather.country && <span className="text-sm text-muted-foreground ml-1">({weather.country})</span>}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">{weather.description}</p>
            <div className="mt-2">
              <span className="text-3xl font-bold text-primary">{weather.temperature}°C</span>
              <span className="text-sm text-muted-foreground ml-2">
                Feels like {weather.feelsLike}°C
              </span>
            </div>
          </div>
          
          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-muted-foreground">Wind Speed</p>
                <p className="font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Cloud className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-muted-foreground">Rainfall</p>
                <p className="font-semibold">{weather.rainfall}mm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Gauge className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Pressure</p>
                <p className="font-semibold">{weather.pressure} hPa</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Visibility: {weather.visibility} km
            </span>
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Accuracy: ±{Math.round(location.accuracy)}m
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;