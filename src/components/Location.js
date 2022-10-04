import * as moment from 'moment'
import { useContext } from 'react'
import { WeatherData } from '../App'
const Location = () => {
  const { weatherData } = useContext(WeatherData)
  // console.log(weatherData)
  return (
    <div className='location-and-date'>
      <h1 className='location-and-date__location'>{weatherData.city.name}</h1>
      <div>{moment().format('LLLL')}</div>
    </div>
  )
}
export default Location
