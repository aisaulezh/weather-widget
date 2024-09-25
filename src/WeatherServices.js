const API_KEY = "c680354681b756f7029184bdf856969e";

const getWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const getIconURL = (iconId) =>
    `https://openweathermap.org/img/wn/${iconId}@4x.png`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  console.log(data);

  const {
    sys: { country = "", sunrise, sunset },
    wind: { speed },
    weather,
    main: { temp, feels_like, pressure, humidity },
    name = city,
  } = data;

  const { description, icon } = weather[0];
  return {
    country,
    name,
    sunrise,
    sunset,
    speed,
    temp,
    feels_like,
    pressure,
    humidity,
    description,
    iconURL: getIconURL(icon),
  };
};

export { getWeatherData };
