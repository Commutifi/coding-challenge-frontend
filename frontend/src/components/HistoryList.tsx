import { useDispatch, useSelector } from 'react-redux';

import { setData, setHistory } from '../redux/slices/forecastSlice';
import { AppDispatch, RootState } from '../redux/store';

const HistoryList = () => {
  const history = useSelector((root: RootState) => root.forecast.history);
  const dispatch = useDispatch<AppDispatch>();

  const clickHandler = (index: number, location: Array<TForeastData>) => {
    if (index === 0) {
      return;
    }

    const new_history = [
      history[index],
      ...history.filter((_elem, order) => order !== index),
    ];
    dispatch(setHistory(new_history));
    dispatch(setData(location));
  };

  return (
    <ul className='overflow-auto md:overflow-hidden h-[150px] lg:h-[235px] py-5 text-white/60 backdrop-blur-md px-12'>
      {history.length > 0 &&
        history.map((location, index) => (
          <li
            onClick={() => clickHandler(index, location)}
            key={(Math.random() * 40).toString().slice(0, 10)}
            className='group cursor-pointer text-xs xl:text-sm pb-2 relative flex items-center justify-between truncate max-w-full'
          >
            {location[0].location}
            {index === 0 && (
              <span className='absolute top-1/2 -translate-y-[80%] -left-5 flex h-3 w-3'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
              </span>
            )}
          </li>
        ))}
    </ul>
  );
};

export default HistoryList;
