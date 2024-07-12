import React, { useState, useEffect } from "react";
import axios from "axios";


const WeatherForm = ({ city, onCityChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

const CurrentWeather = ({ data }) => {
  if (!data) {
    return <p>Loading weather data...</p>;
  }

  return (
    <>
      <h2>{data.name}</h2>
      <p>Temperature: {data.main.temp}°F</p>
      <p>Description: {data.weather[0].description}</p>
      <p>Feels like: {data.main.feels_like}°F</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Pressure: {data.main.pressure}</p>
      <p>Wind Speed: {data.wind.speed}m/s</p>
    </>
  );
};

const Forecast = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!data) {
    return <p>Loading forecast data...</p>;
  }

  return (
    <>
      
      <h2>{data.city.name} Forecast</h2>
      {/*<h2>Current Time: {currentTime.toLocaleTimeString()}</h2>*/}
      {data.list.map((threeHourData) => {
        const date = new Date(threeHourData.dt * 1000);
        const timeString = date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

        return (
          <div key={threeHourData.dt}>
            <h3>{timeString}</h3>
            <p>Temperature: {threeHourData.main.temp}°F</p>
            <p>Description: {threeHourData.weather[0].description}</p>
            <p>Feels like: {threeHourData.main.feels_like}°F</p>
            <p>Humidity: {threeHourData.main.humidity}%</p>
            <p>Pressure: {threeHourData.main.pressure}</p>
            <p>Wind Speed: {threeHourData.wind.speed}m/s</p>
          </div>
        );
      })}
    </>
  );
};

const Weather = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchCurrent = async () => {
    try {
      const response = await axios.get(`${API_URL}/current-forecast?city=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllDay = async () => {
    try {
      const response = await axios.get(`${API_URL}/all-day-forecast?city=${city}`);
      setForecastData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCurrent();
    fetchAllDay();
  };

  return (
    <div>
      <WeatherForm 
        city={city} 
        onCityChange={setCity} 
        onSubmit={handleSubmit} 
      />
      <CurrentWeather data={weatherData} />
      <Forecast data={forecastData} />
    </div>
  );
};

export default Weather;