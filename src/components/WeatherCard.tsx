import React from "react";

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  description,
  icon,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{city}</h2>
      <div className="flex items-center">
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-16 h-16"
        />
        <p className="text-4xl font-bold ml-4">{temperature}°C</p>
      </div>
      <p className="text-gray-600 mt-2 capitalize">{description}</p>
    </div>
  );
};

export default WeatherCard;
