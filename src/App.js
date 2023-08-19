import { useState } from "react";
import Search from "./components/CityLookUp/search";
import CurrentWeather from "./components/WeatherComps/current-weather/current-weather";
import Forecast from "./components/WeatherComps/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";
import Player from './player'

function App() {
  
  const [forecast, setForecast] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    const forecastFetchData = fetch(
      `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    const currentWeatherFetchData = fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    Promise.all([currentWeatherFetchData, forecastFetchData])
      .then(async (response) => {
        const weatherResponsePull = await response[0].json();
        const forecastResponsePull = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponsePull });
        setForecast({ city: searchData.label, ...forecastResponsePull });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <Player/>
    </div>
  );
}

export default App;