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
            className='first:text-red-300 group cursor-pointer text-xs xl:text-sm pb-2 relative flex items-center justify-between truncate max-w-full'
          >
            {location[0].location}
          </li>
        ))}
    </ul>
  );
};

export default HistoryList;
