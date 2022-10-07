import React, { useState } from "react";
import "./weatherCard.scss";
import {
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Sun,
  CloudFog,
  CloudSlash,
  Balloon,
  Wind,
} from "phosphor-react";

type PropsType = {
  temperature: string;
  feelsLike: string;
  weather: string;
  units: boolean;
  setUnits: React.Dispatch<React.SetStateAction<boolean>>;
};

const TemperatureCard = ({
  temperature,
  feelsLike,
  weather,
  units,
  setUnits,
}: PropsType) => {
  const [temp, setTemp] = useState(temperature);

  const getTemp = (temp: string) => {
    const t = parseInt(temp);
    if (t <= 15) {
      return "coldTemp";
    } else if (t < 35) {
      return "medTemp";
    } else if (t >= 35) {
      return "hotTemp";
    } else {
      return "";
    }
  };

  const getIcon = (weather: string) => {
    if (weather.includes("rain")) {
      return <CloudRain size={48} />;
    } else if (weather.includes("lightning")) {
      return <CloudLightning size={48} />;
    } else if (weather.includes("snow")) {
      return <CloudSnow size={48} />;
    } else if (weather.includes("sun")) {
      return <Sun size={48} />;
    } else if (weather.includes("fog")) {
      return <CloudFog size={48} />;
    } else if (weather.includes("cloud")) {
      return <Cloud size={48} />;
    } else if (weather.includes("clear")) {
      return <CloudSlash size={48} />;
    } else if (weather.includes("wind")) {
      return <Wind size={48} />;
    }
  };

  const convertToF = (t: string) => {
    return (parseInt(t) * 1.8 + 32).toFixed(0);
  };

  return (
    <div
      className={`temperatureCard ${getTemp(temperature)}`}
      onClick={() => {
        setUnits(!units);
      }}
    >
      <div className="col">
        {temperature === "" ? (
          <div className={`temperature`}>
            <Balloon size={48} />
          </div>
        ) : (
          <>
            <div className={`temperature`}>
              {units ? temperature : convertToF(temperature)}°
              <span className="small">{units ? "C" : "f"}</span>
            </div>
            <div className="feelsLike">
              Feels like <span className="bold">{feelsLike}°</span>
            </div>
          </>
        )}
      </div>
      <div className="col">
        <div className="ar">{getIcon(weather)}</div>
        <div className="feelsLike">{weather}</div>
      </div>
    </div>
  );
};

export default TemperatureCard;
