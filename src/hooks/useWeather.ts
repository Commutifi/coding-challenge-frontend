import { LocationType } from "../context/LocationContext";
import useFetch from "./useFetch";

const API_KEY = "f88bfecd280068be863ab5ba1d4cbd48";

const useWeather = (coordinates: LocationType | null) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates?.lat.toFixed(
    2
  )}&lon=${coordinates?.lon.toFixed(2)}&units=metric&cnt=3&appid=${API_KEY}`;

  return useFetch(coordinates ? url : "");
};

export default useWeather;
