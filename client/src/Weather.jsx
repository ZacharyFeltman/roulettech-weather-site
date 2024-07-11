import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchCurrent = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/current-forecast?city=${city}`,
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFourDay = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/four-day-forecast?city=${city}`,
      );
      console.log(response.data);
      setForecastData(response.data);
    } catch(error) {
      console.error(error);
    }
  };

  /*useEffect(() => {
    fetchData();
  }, []);*/

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCurrent();
    fetchFourDay();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like : {weatherData.main.feels_like}°C</p>
          <p>Humidity : {weatherData.main.humidity}%</p>
          <p>Pressure : {weatherData.main.pressure}</p>
          <p>Wind Speed : {weatherData.wind.speed}m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
      {forecastData ? (
        <>
          <h2>{forecastData.city.name}</h2>
        </>
      ) : (
        <p>Loading weather data...</p>
      )} 
      {forecastData ? forecastData.list.map((threeHourData) => (
        <>
          <p>Temperature: {threeHourData.main.temp}°C</p>
          <p>Description: {threeHourData.weather[0].description}</p>
          <p>Feels like : {threeHourData.main.feels_like}°C</p>
          <p>Humidity : {threeHourData.main.humidity}%</p>
          <p>Pressure : {threeHourData.main.pressure}</p>
          <p>Wind Speed : {threeHourData.wind.speed}m/s</p>
        </>
      )) : (<p>Loading weather data...</p>)}
    </div>
  );
};

export default Weather;