import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  description: string;
  icon: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
}

interface WeatherAPIHook {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useWeatherAPI = (latitude?: number, longitude?: number, apiKey?: string): WeatherAPIHook => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchWeather = async () => {
    if (!latitude || !longitude) {
      setError('Location coordinates not available');
      return;
    }

    if (!apiKey) {
      setError('Weather API key not provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Using OpenWeatherMap API
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();

      // Get location name using reverse geocoding
      const locationResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );

      let locationName = 'Unknown Location';
      let country = '';
      
      if (locationResponse.ok) {
        const locationData = await locationResponse.json();
        if (locationData && locationData.length > 0) {
          locationName = locationData[0].name || 'Unknown Location';
          country = locationData[0].country || '';
        }
      }

      const processedWeather: WeatherData = {
        location: locationName,
        country: country,
        temperature: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        rainfall: weatherData.rain ? weatherData.rain['1h'] || 0 : 0,
        windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        pressure: weatherData.main.pressure,
        visibility: Math.round(weatherData.visibility / 1000), // Convert to km
        uvIndex: 0, // Would need additional API call for UV index
        feelsLike: Math.round(weatherData.main.feels_like),
      };

      setWeather(processedWeather);
      toast({
        title: "Weather Updated",
        description: `Current weather for ${locationName} loaded successfully`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast({
        title: "Weather Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude && apiKey) {
      fetchWeather();
    }
  }, [latitude, longitude, apiKey]);

  return {
    weather,
    loading,
    error,
    refetch: fetchWeather,
  };
};