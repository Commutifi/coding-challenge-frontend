interface ILocation {
  location: TLocation | null;
  suggestions: Array<any>;
  status: string;
  message?: string;
}

interface IForecastData {
  status: string;
  history: Array<any>;
  data: Array<TForeastData>;
  date: number;
}

type TForeastData = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
    avg: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: Array<TWeather>;
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  location: string;
};

type TWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type TLocation = {
  lat: number;
  lng: number;
  location: string;
};
