import React from "react";
import "../miniWidgets.css";
import { FaTemperatureHigh } from "react-icons/fa";
import { FiSunrise, FiSunset, FiWind } from "react-icons/fi";
import { WiBarometer, WiHumidity } from "react-icons/wi";
import { format } from "date-fns-tz";

const MiniWidgets = ({ weather, units }) => {
  const tempUnits = units === "metric" ? "°C" : "°F";
  const windUnits = units === "metric" ? "m/s" : "m/h";
  const formatTime = (timestamp, timeZone = "UTC") => {
    const date = new Date(timestamp * 1000); // Ensure timestamp is in seconds
    return format(date, "h:mm a", { timeZone });
  };

  const miniWidgets = [
    {
      id: Math.random(),
      title: "Feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnits,
      icon: <FaTemperatureHigh style={{ color: "orange", fontSize: "20px" }} />,
    },
    {
      id: Math.random(),
      title: "Humidity",
      data: weather.humidity.toFixed(),
      unit: "%",
      icon: <WiHumidity style={{ color: "orange", fontSize: "25px" }} />,
    },
    {
      id: Math.random(),
      title: "Pressure",
      data: weather.pressure.toFixed(),
      unit: "hPa",
      icon: <WiBarometer style={{ color: "orange", fontSize: "27px" }} />,
    },
    {
      id: Math.random(),
      title: <span style={{ fontSize: "14px" }}>Wind Speed</span>,
      data: weather.speed,
      unit: windUnits,
      icon: <FiWind style={{ color: "orange", fontSize: "20px" }} />,
    },
    {
      id: Math.random(),
      title: "Sunrise",
      data: formatTime(weather.sunrise),
      unit: "",
      icon: <FiSunrise style={{ color: "orange", fontSize: "20px" }} />,
    },
    {
      id: Math.random(),
      title: "Sunset",
      data: formatTime(weather.sunset),
      unit: "",
      icon: <FiSunset style={{ color: "orange", fontSize: "20px" }} />,
    },
  ];

  return (
    <div className="section mini_widgets">
      {miniWidgets.map(({ id, title, unit, data, icon }) => (
        <div className="mini_card" key={id}>
          <div className="mini_card_title">
            <p>{title}</p>
            {icon}
          </div>
          <div className="data_unit">{`${data} ${unit}`}</div>
        </div>
      ))}
    </div>
  );
};

export default MiniWidgets;
