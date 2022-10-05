import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLocations,
  setLocation,
  setSuggestions,
} from '../redux/slices/locationSlice';
import { AppDispatch, RootState } from '../redux/store';

const LocationInput = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'input' });
  const suggestions = useSelector(
    (root: RootState) => root.location.suggestions
  );
  const [keyword, setKeyword] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword === '') {
        dispatch(setSuggestions([]));
        return;
      }
      !!keyword && dispatch(getLocations(keyword));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === 'keyword' && setKeyword(value);
  };

  const clickHandler = (value: TLocation) => {
    dispatch(setLocation(value));
    setFocused(false);
  };

  return (
    <>
      {focused && (
        <div
          onClick={() => setFocused(false)}
          className='fixed w-screen h-screen left-0 top-0 right-0'
        />
      )}
      <div className='w-full flex justify-between relative backdrop-blur-md px-12 z-10'>
        <input
          autoComplete='off'
          name='keyword'
          value={keyword}
          onChange={changeHandler}
          onFocus={() => {
            setFocused(true);
          }}
          className='w-full block border-b-[1px] border-solid border-white/50 focus-within:border-white/90 outline-none bg-transparent transition-all duration-150 text-white h-8 xl:h-10 px-1 text-sm xl:text-base'
          placeholder={t('placeholder')}
        />
        <ul
          className={`${
            focused ? 'block' : 'hidden'
          } cursor-pointer absolute top-[32px] xl:top-[42px] w-[190px] xl:w-[234px] bg-white max-h-[190px] overflow-y-scroll`}
        >
          {suggestions.map((elem, index) => (
            <li
              onClick={() => clickHandler(elem)}
              className='bg-slate-200 even:bg-slate-50 px-4 py-1 hover:bg-slate-300 transition-all duration-150 text-sm xl:text-base'
              key={elem.lat + index}
            >
              {elem.location}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LocationInput;
