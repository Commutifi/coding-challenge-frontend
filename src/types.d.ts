export interface CurrentWeather {
  name: string;
  country: string;
  date: number;
  timezone: number;
  sunrise: number;
  sunset: number;
  description: string;
  wind: number;
  humidity: number;
  icon: number;
  feels_like: number;
  temp: number;
  isDay: boolean;
}

export interface WeatherForecastItem {
  date: number;
  dt_txt: string;
  description: string;
  wind: number;
  humidity: number;
  icon: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
}

export interface City {
  name: string;
  lat: number;
  lng: number;
}

interface StateLocation {
  loading: boolean;
  searchQuery: string;
  location: string;
  cities: City[];
  lat: number;
  lng: number;
  currentWeather: CurrentWeather | undefined;
  forecasts: WeatherForecastItem[];
}

interface ActionLocation {
  setSearchQuery: (name: string) => void;
  setLocation: (name: string) => void;
  setLoading: (loading: boolean) => void;
  setGeometry: (lat: number, lng: number) => void;
}

export type TypeLocation = [StateLocation, ActionLocation];

interface StateTheme {
  theme: 'dark' | 'light';
  colorTheme: 'dark' | 'light';
}

interface ActionTheme {
  toggleTheme: () => void;
}

interface LocationResponseDataItem {
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
}

interface WeatherForecastResponseDataItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    id: number;
    description: string;
    icon: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
}

export type TypeTheme = [StateTheme, ActionTheme];
