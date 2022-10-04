import * as moment from 'moment'
import { useContext } from 'react'
import { WeatherData } from '../App'
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
export default UpcomingWeather
