import React, { useEffect, useState } from "react";
import img from "./images/la.jpg";
import { getWeatherData } from "./WeatherServices";
import { IoIosSearch } from "react-icons/io";
import { MdPinDrop } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import MiniWidgets from "./components/MiniWidgets";

const getSimpleDescription = (description) => {
  const descriptionMap = {
    "clear sky": "Sunny",
    "few clouds": "Partly Cloudy",
    "scattered clouds": "Partly Cloudy",
    "broken clouds": "Cloudy",
    "overcast clouds": "Cloudy",
    "shower rain": "Showers",
    rain: "Rainy",
    thunderstorm: "Stormy",
    snow: "Snowy",
    mist: "Foggy",
  };

  return descriptionMap[description] || "Unknown";
};

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (city) {
        const data = await getWeatherData(city, units);
        setWeather(data);
      }
    };
    fetchWeatherData();
  }, [city, units]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const enterTap = (event) => {
    if (event.key === "Enter") {
      setCity(inputValue);
      setInputValue("");
    }
  };

  console.log(weather);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const toggleUnits = (switchUnits) => {
    setUnits(switchUnits);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${img})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <h1 className="header">Your Daily Weather Update</h1>
            <div className="section section_input" style={{ color: "black" }}>
              <IoIosSearch className="search-icon" />
              <input
                type="text"
                placeholder="Find Out the Weather in Any City"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={enterTap}
                style={{ color: "black" }}
              />
            </div>

            <div className="section section_weather">
              <div>
                <div className="weather-headers">
                  <div className="location-pin">
                    <RiMapPin2Fill className="pin" />
                    <h2 className="cityName">{weather.name}</h2>
                  </div>
                  <div className="temp-container">
                    <h2 className="temp">
                      {Math.round(weather.temp)}°
                      {units === "metric" ? "C" : "F"}
                    </h2>
                    <div className="unit-buttons">
                      <button onClick={() => toggleUnits("metric")}>°C</button>
                      <button onClick={() => toggleUnits("imperial")}>
                        °F
                      </button>
                    </div>
                  </div>
                  <div className="weather-icon-container">
                    <img
                      src={weather.iconURL}
                      alt="Weather icon"
                      className="weather-icon"
                    />
                  </div>
                  <h2 style={{ fontSize: "45px" }}>
                    {getSimpleDescription(weather.description).toLowerCase()}
                  </h2>
                </div>
              </div>

              <div></div>
            </div>

            <MiniWidgets weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
