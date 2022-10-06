import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getForecastInfo, setDate } from '../redux/slices/forecastSlice';
import { AppDispatch, RootState } from '../redux/store';

// import helper
import Helper from '../helper';
import Tabs from './Tabs';

// load image resource
import i18nextSVG from '../assets/i18n.webp';
import { setLocation } from '../redux/slices/locationSlice';

const languages = ['en', 'fr'];

const ForecastShow = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'detail' });

  const location = useSelector((root: RootState) => root.location.location);
  const forecasts = useSelector((root: RootState) => root.forecast.data);
  const date = useSelector((root: RootState) => root.forecast.date);
  const [fahrenheit, setFahrenheit] = useState<boolean>(false);

  const bool_exist = forecasts.length !== 0;

  const dispatch = useDispatch<AppDispatch>();

  const getInitLocation = async (lat: number, lon: number) => {
    const stream_result = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const result = await stream_result.json();
    const place_name = result.display_name;
    dispatch(setLocation({ location: place_name, lat, lng: lon }));
  };

  const onGeoSuccess = (position: any) => {
    const { latitude, longitude } = position.coords;
    getInitLocation(latitude, longitude);
  };

  const onGeoError = (error: any) => {
    let detailError;

    if (error.code === error.PERMISSION_DENIED) {
      detailError = 'User denied the request for Geolocation.';
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      detailError = 'Location information is unavailable.';
    } else if (error.code === error.TIMEOUT) {
      detailError = 'The request to get user location timed out.';
    } else if (error.code === error.UNKNOWN_ERROR) {
      detailError = 'An unknown error occurred.';
    }

    toast.error(detailError);
  };

  useEffect(() => {
    const geolocation = navigator.geolocation;
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (geolocation) {
      geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
    } else {
      toast.warn('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location === null) {
      return;
    }
    dispatch(
      getForecastInfo({
        location: location.location,
        lat: location.lat,
        lon: location.lng,
      })
    );
  }, [location]);

  useEffect(() => {
    if (location === null) {
      return;
    }
    setFahrenheit(false);
    dispatch(setDate(0));
  }, [location]);

  const changeLanguage = () => {
    const index = languages.indexOf(i18n.language) + 1;
    i18n.changeLanguage(languages[index % languages.length]);
  };

  return (
    <div className='w-full xl:w-[70%] h-full pt-16 md:py-16 px-5 md:px-10 lg:px-20 flex flex-col'>
      <div className='flex justify-between items-center'>
        <Tabs />

        <img
          onClick={changeLanguage}
          className='lg:translate-x-8 cursor-pointer hover:scale-110 transition-all duration-150 w-7 h-7 xl:w-9 xl:h-9'
          src={i18nextSVG}
          alt='i18n'
          width={36}
          height={36}
        />
      </div>

      {!bool_exist && (
        <div className='mt-auto text-white text-[48px] xl:text-[82px] font-bold flex gap-3 items-center'>
          {t('preshow')}
        </div>
      )}

      {bool_exist && (
        <div className='h-full md:h-fit md:mt-auto text-white flex flex-wrap items-center gap-4'>
          <span
            onClick={() => setFahrenheit(!fahrenheit)}
            className='h-fit cursor-pointer font-bold text-[56px] xl:text-[82px] order-1 md:order-1'
          >
            <span
              className={`${
                forecasts[date].temp.avg < 15
                  ? 'text-blue-400'
                  : forecasts[date].temp.avg > 35
                  ? 'text-red-500'
                  : 'text-amber-200'
              }`}
            >
              {fahrenheit
                ? Helper.convertToF(forecasts[date].temp.avg)
                : forecasts[date].temp.avg}{' '}
            </span>
            <sup>o</sup>
            {fahrenheit ? 'F' : 'C'}
          </span>
          <p className='mt-[200px] md:mt-0 h-fit text-[36px] xl:text-[42px] font-semibold max-w-[240px] truncate pl-4 order-3 md:order-2'>
            {location?.location.split(',')[0]}
            <br />
          </p>
          <div className='h-fit flex flex-col items-center order-2 md:order-3'>
            <img
              className='translate-y-1'
              src={`https://openweathermap.org/img/w/${forecasts[date].weather[0].icon}.png`}
            />
            <span className='text-sm xl:text-base -translate-y-2'>
              {Helper.weatherType(forecasts[date].weather[0].main)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastShow;
