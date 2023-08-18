import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`} // pull image url based upon weather
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°F</p>
        <div className="details">
          <div className="parameter-row">
            
          </div>
          <div className="parameter-row">
            
          </div>
          <div className="parameter-row">
            
          </div>
          <div className="parameter-row">
            
          </div>
          <div className="parameter-row">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;