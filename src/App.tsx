import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

// API key from environment variables
const API_KEY = import.meta.env.VITE_API;

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temperature: number;
    description: string;
    icon: string;
  } | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track errors

  const fetchWeather = async (city: string) => {
    try {
      setErrorMessage(null); // Clear previous errors
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = response.data;

      // Update weather data state
      setWeatherData({
        city: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      setWeatherData(null); // Clear previous weather data
      setErrorMessage("City not found or API request failed!"); // Show error message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex flex-col items-center justify-center">
      <SearchBar onSearch={fetchWeather} />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-4">{errorMessage}</p> // Display error message
      )}
      {weatherData && (
        <WeatherCard
          city={weatherData.city}
          temperature={weatherData.temperature}
          description={weatherData.description}
          icon={weatherData.icon}
        />
      )}
    </div>
  );
};

export default App;
