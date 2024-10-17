//import React from 'react';
import React, {useEffect,useRef, useState} from 'react'
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'



const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false);

  const allIcons= {
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10d":rain_icon,
    "13d":snow_icon,
    "13nd":snow_icon,
    

  }

  const search = async (city) => {
    if(city === ""){
      alert("Enter City Name")
      return;
    }
    try{
      const url = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`

      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      if (res.ok) { // Check if the response is OK
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name, // Store the location
          icon: icon
        });
      } else {
        console.error('Error fetching data:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    search("Boston");
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref = {inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick = {() => search(inputRef.current.value)}/>
      </div>
      <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData ? `${weatherData.temperature}°F` : 'Loading...'}</p>
      <p className='location'>{weatherData ? weatherData.location : 'Loading...'}</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData ? `${weatherData.humidity}%` : 'Loading...'}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData ? `${weatherData.windSpeed} km/h` : 'Loading...'}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;