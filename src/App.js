import { useState, useEffect } from 'react';
import { setCelsius, setFahrenheit, setColorClass } from './service/dayService';
import CityOption from './components/CityOption';
import Day from './components/Day';

function App() {
  const [newLocation, setNewLocation] = useState(null);
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [today, setToday] = useState(0);
  const [tomorrow, setTomorrow] = useState({});
  const [afterTomorrow, setAfterTomorrow] = useState({});
  const [showCelsius, setShowCelsius] = useState(true);

  const getCoordinates = (cityName) => {
    if (cityName.length > 0) {
      return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=9ff94dcc4ee343a5b8a75e28c15400b7`)
        .then((response) => response.json())
        .then(data => {
          setList(data?.results);
        });
    }
  };


  const changeMetrics = () => {
    setShowCelsius(!showCelsius);
  }

  const changeLocation = (item) => {
    setNewLocation(item);
    setList([]);
    setInput("");
  }

  const fetchToday = (latitude, longitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b0f54646cead385efee963131e9c4e8f&units=metric`)
      .then((response) => response.json())
      .then(data => {
        setToday({
          ...today,
          location: data?.name,
          celsius: setCelsius(data?.main?.temp),
          fahrenheit: setFahrenheit(data?.main?.temp),
          colorClass: setColorClass(data?.main?.temp)
        });
      })
      .catch((e) => console.error('fetchToday ', e));
  };

  const fetchForecast = (latitude, longitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=16&appid=b0f54646cead385efee963131e9c4e8f&units=metric`)
      .then((response) => response.json())
      .then(data => {
        const tomorrowAfter = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

        setTomorrow(() => ({
          ...tomorrow,
          celsius: setCelsius(tomorrowAfter[0]?.main?.temp),
          fahrenheit: setFahrenheit(tomorrowAfter[0]?.main?.temp),
          colorClass: setColorClass(tomorrowAfter[0]?.main?.temp)
        }));

        setAfterTomorrow(() => ({
          ...afterTomorrow,
          celsius: setCelsius(tomorrowAfter[1]?.main?.temp),
          fahrenheit: setFahrenheit(tomorrowAfter[1]?.main?.temp),
          colorClass: setColorClass(tomorrowAfter[1]?.main?.temp)
        }));
      })
      .catch((e) => console.error('fetchForecast ', e));
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position ', navigator);

        setNewLocation({
          geometry: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    } else {
      console.log('something went wrong with geolocation');
    }
  }, []);


  useEffect(() => {
    if (newLocation) {
      fetchToday(newLocation.geometry.lat, newLocation.geometry.lng);
      fetchForecast(newLocation.geometry.lat, newLocation.geometry.lng);
    }
  }, [newLocation]);

  return (
    <div className="App">
      <div>
        <div className="search">
          <input type="text" value={input} className="search__input" placeholder="Enter other location..." onChange={event => setInput(event.target.value)} />
          
          <button className="search__button" onClick={() => getCoordinates(input)}>get</button>
        </div>

        {list?.length > 0 &&
          <div className="search__list">
            <div className="search__list-container">
              {list.map((item) => <CityOption key={item.formatted} item={item} choicePass={changeLocation} />)}
            </div>
          </div>
        }
      </div>

      <div className="location">{today.location}</div>


      <div className="days">
        <Day title="Today" showCelsius={showCelsius} item={tomorrow} changeMetrics={changeMetrics} />

        <Day title="Tomorrow" showCelsius={showCelsius} item={tomorrow} changeMetrics={changeMetrics} />

        <Day title="After Tomorrow" showCelsius={showCelsius} item={afterTomorrow} changeMetrics={changeMetrics} />
      </div>
    </div>
  );
}

export default App;
