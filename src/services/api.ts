import axios, { AxiosInstance } from 'axios';

const OpenCageAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_OPENCAGE_API,
});

const OpenWeatherAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_OPENWEATHER_API,
});

export const getLocations = (name: string) => {
  return OpenCageAxiosInstance.get('/', {
    params: {
      q: name,
      key: process.env.REACT_APP_OPENCAGE_API_KEY,
      language: 'en',
      pretty: 1,
    },
  });
};

export const getWeather = (lat: number, lon: number) => {
  return OpenWeatherAxiosInstance.get('/weather', {
    params: {
      lat,
      lon,
      units: 'metric',
      appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
    },
  });
};

export const getWeatherForecast = (lat: number, lon: number) => {
  return OpenWeatherAxiosInstance.get('/forecast', {
    params: {
      lat,
      lon,
      units: 'metric',
      appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
    },
  });
};
