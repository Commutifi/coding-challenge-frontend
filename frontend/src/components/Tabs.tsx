import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../redux/slices/forecastSlice';
import { AppDispatch, RootState } from '../redux/store';

const Tabs = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'dates' });

  const dispatch = useDispatch<AppDispatch>();
  const date = useSelector((root: RootState) => root.forecast.date);

  return (
    <div className='text-white text-lg flex items-center gap-5 cursor-pointer'>
      <span
        onClick={() => dispatch(setDate(0))}
        className={`${
          date === 0 ? 'scale-105 font-semibold text-white' : 'text-white/80'
        } hover:text-white duration-150 text-sm xl:text-base`}
      >
        {t('today')}
      </span>
      <span
        onClick={() => dispatch(setDate(1))}
        className={`${
          date === 1 ? 'scale-105 font-semibold text-white' : 'text-white/80'
        } hover:text-white duration-150 text-sm xl:text-base`}
      >
        {t('tomorrow')}
      </span>
      <span
        onClick={() => dispatch(setDate(2))}
        className={`${
          date === 2 ? 'scale-105 font-semibold text-white' : 'text-white/80'
        } hover:text-white duration-150 text-sm xl:text-base`}
      >
        {t('day after tomorrow')}
      </span>
    </div>
  );
};

export default Tabs;
