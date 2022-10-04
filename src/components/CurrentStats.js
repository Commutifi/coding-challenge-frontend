import { useContext } from 'react'
import { WeatherData } from '../App'
const CurrentStats = () => {
  const { weatherData, setMeasure, measure } = useContext(WeatherData)
  return (
    <div
      className='current-stats'
      onClick={() => setMeasure(measure === 'metric' ? 'imperial' : 'metric')}
    >
      <div>
        <div className='current-stats__value'>
          {weatherData.list[0].main.temp_max}&deg;
        </div>
        <div className='current-stats__label'>High</div>
        <div className='current-stats__value'>
          {weatherData.list[0].main.temp_min}&deg;
        </div>
        <div className='current-stats__label'>Low</div>
      </div>
      <div>
        <div className='current-stats__value'>
          {weatherData.list[0].main.feels_like}&deg;
        </div>
        <div className='current-stats__label'>Feels like</div>
        <div className='current-stats__value'>
          {weatherData.list[0].wind.speed} m/s
        </div>
        <div className='current-stats__label'>wind</div>
      </div>
    </div>
  )
}
export default CurrentStats
