import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const WeatherDetail = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'detail' });

  const date = useSelector((root: RootState) => root.forecast.date);
  const forecasts = useSelector((root: RootState) => root.forecast.data);
  const bool_exist = forecasts.length !== 0;

  return (
    <div className='hidden md:block w-1/3 lg:w-fit lg:border-t-white/60 text-white/70 px-10 backdrop-blur-md'>
      <div className='lg:border-t-[1px] py-6 '>
        <h3 className='text-white/90'>{t('heading')}</h3>
        <p className='mt-4 flex justify-between text-sm xl:text-base'>
          {t('cloudy')}:
          <span
            className={`${
              bool_exist ? '' : 'opacity-0'
            } transition-all duration-150`}
          >
            {bool_exist ? forecasts[date].clouds : ''}%
          </span>
        </p>
        <p className='mt-3 flex justify-between'>
          {t('humidity')}:
          <span>{bool_exist ? forecasts[date].humidity + '%' : ''}</span>
        </p>
        <p className='mt-3 flex justify-between'>
          {t('windy')}:
          <span>{bool_exist ? forecasts[date].speed + 'm/s' : ''}</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherDetail;
