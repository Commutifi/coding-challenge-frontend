import {
  FC,
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import { AxiosResponse } from 'axios';
import dayjs, { extend, unix } from 'dayjs';
import utc from 'dayjs/plugin/utc';
extend(utc);

import { getLocations, getWeather, getWeatherForecast } from '../services/api';
import {
  TypeLocation,
  LocationResponseDataItem,
  CurrentWeather,
  WeatherForecastItem,
  WeatherForecastResponseDataItem,
  City,
} from '../types';
import { noop } from '../util';

export const LocationContext = createContext<TypeLocation>([
  {
    searchQuery: '',
    location: '',
    cities: [],
    lat: 0,
    lng: 0,
    loading: false,
    currentWeather: undefined,
    forecasts: [],
  },
  {
    setSearchQuery: noop,
    setLocation: noop,
    setGeometry: noop,
    setLoading: noop,
  },
]);

export const LocationContextProvider: FC<{ children: ReactNode }> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [currentWeather, setCurrentWeather] = useState<
    CurrentWeather | undefined
  >(undefined);
  const [forecasts, setForecasts] = useState<WeatherForecastItem[]>([]);

  const setGeometry = (lat: number, lng: number) => {
    setLat(lat);
    setLng(lng);
  };

  const getLocationData = async () => {
    setLoading(true);
    const response: AxiosResponse = await getLocations(searchQuery);
    if (response.data.status.code === 200) {
      setCities(
        response.data.results.map((item: LocationResponseDataItem) => ({
          name: item.formatted,
          lat: item.geometry.lat,
          lng: item.geometry.lng,
        }))
      );
    }

    setLoading(false);
  };

  const getWeatherData = async () => {
    setLoading(true);
    const response: AxiosResponse = await getWeather(lat, lng);
    if (response.data.cod === 200) {
      const { name, sys, main, dt, timezone, weather, wind } = response.data;

      const currentTime = dayjs
        .utc(unix(dt))
        .utcOffset(timezone / 2600)
        .format();
      const sunrise = dayjs
        .utc(unix(sys.sunrise))
        .utcOffset(timezone / 3600)
        .format();
      const sunset = dayjs
        .utc(unix(sys.sunset))
        .utcOffset(timezone / 3600)
        .format();
      const isDay = currentTime > sunrise && currentTime < sunset;

      const weatherData: CurrentWeather = {
        name: name,
        country: sys.country,
        date: dt,
        timezone: timezone / 3600,
        sunrise: sys.sunrise,
        sunset: sys.sunset,
        description: weather[0].description,
        wind: Math.round(wind.speed * 3.6),
        humidity: main.humidity,
        icon: weather[0].id,
        feels_like: Math.round(main.feels_like),
        temp: Math.round(main.temp),
        isDay,
      };
      setCurrentWeather(weatherData);
    }
    setLoading(false);
  };

  const getWeatherForecastData = async () => {
    setLoading(true);
    const response: AxiosResponse = await getWeatherForecast(lat, lng);
    if (response.data.cod === '200') {
      setForecasts(
        response.data.list
          .filter((item: WeatherForecastResponseDataItem) =>
            item.dt_txt.match(/09:00:00/)
          )
          .map((item: WeatherForecastResponseDataItem) => ({
            date: item.dt,
            dt_txt: item.dt_txt,
            description: item.weather[0].description,
            wind: Math.round(item.wind.speed * 3.6),
            humidity: item.main.humidity,
            icon: item.weather[0].id,
            feels_like: Math.round(item.main.feels_like),
            temp_min: Math.round(item.main.temp_min),
            temp_max: Math.round(item.main.temp_max),
          }))
          .slice(0, 3)
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery.length >= 2) {
      getLocationData();
      setCities([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (lat && lng) {
      getWeatherData();
      getWeatherForecastData();
    }
  }, [location, lat, lng]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);

  return (
    <LocationContext.Provider
      value={[
        {
          searchQuery,
          location,
          cities,
          lat,
          lng,
          loading,
          currentWeather,
          forecasts,
        },
        {
          setSearchQuery,
          setLocation,
          setLoading,
          setGeometry,
        },
      ]}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): TypeLocation => {
  const [state, dispatch] = useContext(LocationContext);

  return [state, dispatch];
};
