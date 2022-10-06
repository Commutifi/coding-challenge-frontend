import { UseAppContext } from '../context/appContext'
import '../styles/Card.scss'

function Card(props) {
    const BASE_URL = process.env.REACT_APP_OPEN_WEATHER_ICONS
    const { helperFunctions } = UseAppContext()
    const { data, handleTemperatureClick, mode } = props

    return (
        <div className='card'>
            <h5 className='h5 card__date'>{data.date}</h5>
            <img src={`${BASE_URL}${data.weather.icon}.png`} alt='background_image'/>
            <div className='card__description'>{data.weather.description.toUpperCase()}</div>
            <div className='card__daytime'>
                <div className='card__day' onClick={() => handleTemperatureClick(mode)}>
                    <h5>Day</h5><h6  className={`card_day_item ${helperFunctions.toggleTemperatureColor(data.weather.day_temp, mode)}`}>{data.weather.day_temp}{mode.prefix}</h6>
                </div>
                <div className='card__night' onClick={() => handleTemperatureClick(mode)}>
                    <h5>Night</h5><h6 className={`card_night_item ${helperFunctions.toggleTemperatureColor(data.weather.night_temp, mode)}`}>{data.weather.night_temp}{mode.prefix}</h6>
                </div>
            </div>
        </div>
    )
}

export default Card