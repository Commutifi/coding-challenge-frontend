import './index.css'
import React, { useEffect, useState, useContext, createContext } from 'react'
import fetchWeather from './api/fetchWeather'
import location from './api/location'
import * as moment from 'moment'
import CurrentTemperature from './components/CurrentTemperature'
import Location from './components/Location'
import CurrentStats from './components/CurrentStats'
export const WeatherData = createContext()
export default function App() {
  const [input, setInput] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [measure, setMeasure] = useState('metric')

  const search = async (query) => {
    //that is calling via an await function the query that is passed
    const data = await fetchWeather(query, measure)
    setWeatherData(data)
  }

  const getLocation = async () => {
    /* Getting the current location of the user and then passing it to the location function. */
    navigator.geolocation.getCurrentPosition(async (position) => {
      var lat = position.coords.latitude
      var long = position.coords.longitude
      const currentLocation = await location(lat, long)

      /* Checking if the input is empty, if it is empty it will search the current location, if it is
     not empty it will search the input. */
      if (!input) {
        search(currentLocation, measure)
      } else {
        search(input, measure)
      }
    })
  }

  useEffect(() => {
    getLocation()
  }, [measure])
  return (
    <>
      <WeatherData.Provider value={{ weatherData, setMeasure, measure }}>
        {weatherData.list ? (
          <div className='main-container'>
            <div className='search-container'>
              <input
                type='text'
                className='search'
                placeholder='Search'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></input>
              <button className='btn' onClick={() => search(input)}>
                Search
              </button>
            </div>
            <Location />
            <CurrentTemperature />
            <CurrentStats />
            <UpcomingWeather />
          </div>
        ) : (
          <div>loading</div>
        )}
      </WeatherData.Provider>
    </>
  )
}

const UpcomingWeather = () => {
  const { weatherData, setMeasure, measure } = useContext(WeatherData)

  return (
    <div
      className='next-2-days'
      onClick={() => setMeasure(measure === 'metric' ? 'imperial' : 'metric')}
    >
      <h2 className='next-2-days__heading'>Next 2 days</h2>
      <DayWeather
        day={moment().add(1, 'days').format('ddd')}
        date={moment().add(1, 'days').format('MMM Do YY')}
        temp={weatherData.list[8].main.temp}
        temp_max={weatherData.list[8].main.temp_max}
        temp_min={weatherData.list[8].main.temp_min}
        description={weatherData.list[8].weather[0].description}
      />
      <DayWeather
        day={moment().add(2, 'days').format('ddd')}
        date={moment().add(2, 'days').format('MMM Do YY')}
        temp={weatherData.list[16].main.temp}
        temp_max={weatherData.list[16].main.temp_max}
        temp_min={weatherData.list[16].main.temp_min}
        description={weatherData.list[16].weather[0].description}
      />
    </div>
  )
}

const DayWeather = ({ day, date, temp, temp_max, temp_min, description }) => {
  return (
    <div className='next-2-days__row'>
      <div className='next-2-days__date'>
        {day}
        <div className='next-2-days__label'>{date}</div>
      </div>
      <div className='next-2-days__rain'>
        {temp}&deg;
        <div className='next-2-days__label'>Temp</div>
      </div>
      <div className='next-2-days__low'>
        {temp_min}&deg;
        <div className='next-2-days__label'>Low</div>
      </div>

      <div className='next-2-days__high'>
        {temp_max}&deg;
        <div className='next-2-days__label'>High</div>
      </div>
    </div>
  )
}
