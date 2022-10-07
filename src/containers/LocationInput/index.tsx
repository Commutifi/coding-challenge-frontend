import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { debounce } from 'lodash-es';

import { useLocation } from '../../providers/LocationProvider';
import { City } from '../../types';

export const LocationInput = () => {
  const [
    { searchQuery, cities, loading },
    { setSearchQuery, setLocation, setGeometry },
  ] = useLocation();

  const [value, setValue] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (searchQuery) {
      setValue(searchQuery);
    }
  }, []);

  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
      }, 500),
    []
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceSearch(e.target.value);
  };

  const onClickCity = (city: City) => {
    setValue(city.name);
    setLocation(city.name);
    setGeometry(city.lat, city.lng);
    setShowDropdown(false);
  };

  return (
    <div className="sm:w-full lg:w-2/6 xl:max-w-2xl mb-8 relative">
      <input
        name="location"
        className="w-full bg-gradient-to-r from-[#0891b2] to-[#06b6d4] text-white rounded-xl outline-0 px-8 py-3"
        value={value}
        onChange={onChangeInput}
        placeholder="Search citites..."
        onFocus={() => setShowDropdown(true)}
        onBlur={() =>
          setTimeout(() => {
            setShowDropdown(false);
          }, 500)
        }
      />
      {showDropdown && (
        <div className="absolute top-0 left-0 right-0 pt-12">
          <div className="px-8 bg-white border border-black/10 rounded-xl shadow-lg">
            {loading && <div className="py-2">Loading...</div>}
            {!loading && cities.length > 0 && (
              <ul>
                {cities.map((city, index) => (
                  <li
                    key={index}
                    className="py-1 cursor-pointer"
                    onClick={() => onClickCity(city)}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
            {!loading && cities.length === 0 && (
              <div className="py-2">No cities found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
