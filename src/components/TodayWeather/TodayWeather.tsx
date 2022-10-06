import { useSelector, useDispatch } from "react-redux";
import { RootState } from "app/store";
import { setTemperatureType } from "redux/slices/temperatureType";
import { convertTemperature } from "utils";
import { getColorFromTemperature } from "utils";
import { ReactComponent as SunRiseIcon } from "icons/sun-rise.svg";
import { ReactComponent as SunSetIcon } from "icons/sun-set.svg";
import "./TodayWeather.scss";

interface Props {
  location?: string;
  population?: number;
  weather?: Record<any, any>;
  color?: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TodayWeather = ({ location, weather, color }: Props) => {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDay();
  const date = today.getDate();
  const sunset = new Date(weather?.sunset * 1000)
    .toLocaleTimeString()
    .slice(0, 4);
  const sunrise = new Date(weather?.sunrise * 1000)
    .toLocaleTimeString()
    .slice(0, 4);

  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.temperatureType.type);

  return (
    <div className="today-weather">
      <div className="day-info">
        <h1 className="location">{location}</h1>
        <h3 className="date">
          {weekdays[day] + " " + date + "th " + months[month]}
        </h3>
      </div>
      <div className="weather-info">
        <div className="status-bar">
          <img
            src={`https://openweathermap.org/img/w/${weather?.weather?.[0].icon}.png`}
            alt=""
            className="status-img"
          />
          <div className="sun-rise-set">
            <span className="sun-rise">
              <SunRiseIcon />
              {sunrise} A.M.
            </span>
            <span className="sun-set">
              <SunSetIcon />
              {sunset} P.M.
            </span>
          </div>
        </div>
        <div className="detail">
          <div className="left-panel">
            <span
              className="temperature"
              style={{
                color: `${
                  color === ""
                    ? getColorFromTemperature(weather?.temp.day)
                    : "#5C5C5C"
                }`,
              }}
              onClick={() =>
                dispatch(setTemperatureType(type === "F" ? "C" : "F"))
              }
              title="Click to convert unit between °F / °C"
            >
              {convertTemperature(weather?.temp.day, type)}
            </span>
            <span className="description">
              {weather?.weather?.[0].main +
                ", " +
                weather?.weather?.[0].description}
            </span>
          </div>
          <div className="right-panel">
            <span className="pressure">Pressure: {weather?.pressure}hPa</span>
            <span className="humidity">Humidity: {weather?.humidity}%</span>
            <span className="wind">Wind: {weather?.speed}m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayWeather;
