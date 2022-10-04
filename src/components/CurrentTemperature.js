import { useState, useContext, useEffect } from 'react'
import { WeatherData } from '../App'
const CurrentTemperature = () => {
  const [textColor, setTextColor] = useState('yellow')
  const { weatherData, setMeasure, measure } = useContext(WeatherData)
  const temperature = weatherData.list[0].main.temp

  /* A hook that is called after the component is rendered. It is used to set the color of the
temperature based on the temperature. */
  useEffect(() => {
    if (measure === 'metric' && temperature < 15) {
      setTextColor('blue')
    } else if (measure === 'metric' && temperature > 35) {
      setTextColor('red')
    } else if (measure === 'metric') {
      setTextColor('yellow')
    }
  }, [measure, temperature, setMeasure])

  return (
    <div
      className='current-temperature'
      onClick={() => setMeasure(measure === 'metric' ? 'imperial' : 'metric')}
    >
      <div className='current-temperature__icon-container'>
        <img
          src={`http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`}
          alt='weather status icon'
          className='current-temperature__icon'
        />
      </div>
      <div className='current-temperature__content-container'>
        <div
          className='current-temperature__value'
          style={{ color: textColor }}
        >
          {weatherData.list[0].main.temp}&deg;
        </div>
        <div className='current-temperature__summary'>
          {weatherData.list[0].weather[0].description}
        </div>
      </div>
    </div>
  )
}
export default CurrentTemperature
