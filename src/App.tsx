import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
const API_KEY = import.meta.env.VITE
const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temperature: number;
    description: string;
    icon: string;
  } | null>(null);

  const api = API_KEY;

  const fetchWeather = async (city: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
      );
      const data = response.data;

      setWeatherData({
        city: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      alert("City not found!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex flex-col items-center justify-center">
      <SearchBar onSearch={fetchWeather} />
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
