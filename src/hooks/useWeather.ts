import { LocationType } from "../context/LocationContext";
import useFetch from "./useFetch";

const API_KEY = "b81cd1a66eaee287ea9830aa66250511";

const useWeather = (coordinates: LocationType | null | undefined) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates?.lat.toFixed(
    2
  )}&lon=${coordinates?.lon.toFixed(2)}&appid=${API_KEY}`;

  return useFetch(url);
};

export default useWeather;
