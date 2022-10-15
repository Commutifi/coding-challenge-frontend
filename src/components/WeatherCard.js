import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/card.module.scss'
import { ChevronRightIcon, ChevronLeftIcon, ChevronUpIcon, ChevronDownIcon, MinusIcon } from '@heroicons/react/24/solid'
import Spinner from '../media/spinner.mp4'
import Logo from '../media/logo.png'
import Sunny from '../media/sunny.png'
import Cloudy from '../media/cloudy.png'
import Rainy from '../media/rainy.png'

function WeatherCard({ city, state, removeCard, ...weather }) {
    const [curr, setCurr] = useState(weather.days.today)
    const [smallCard, setSmallCard] = useState(false)
    const [fahrenheitActive, setFahrenheitActive] = useState(true)
    const TO_CELSIUS = (temp) => (temp - 32) * 0.5556

    const { temp, temp_max, temp_min, humidity, pressure } = curr.main
    const ref = useRef()
    const handleClick = () => {
        switch (curr.day) {
            case 'Today':
                setCurr(weather.days.tomorrow);
                break;
            case 'Tomorrow':
                setCurr(weather.days.DAT);
                break;
            case 'DAT':
                setCurr(weather.days.today);
                break;
            default:
                setCurr(weather.days.today)
        }
    }

    const minimizeCard = () => {
        setSmallCard(prev => !prev)

    }

    const cardColors = {
        blue: '#B6EAFF',
        red: '#db7d84',
        yellow: '#FFECB3',
        fontBlue: '#0f3c5c',
        fontRed: '#5c171b',
        fontYellow: '#94743c',
        getColor: function () {
            if (temp <= 59) return this.blue
            if (temp > 59) return this.yellow
            if (temp >= 95) return this.red
        },
        getTextColor: function () {
            if (temp <= 59) return this.fontBlue
            if (temp > 59) return this.fontYellow
            if (temp >= 95) return this.fontRed
        },
        getIcon: function () {
            if (temp <= 59) return Rainy
            if (temp > 59) return Cloudy
            if (temp >= 95) return Sunny
        }
    }

    useEffect(() => {
        if (smallCard) ref.current.style.display = "none"
        else ref.current.style.display = "block"
    }, [smallCard])

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader} style={{
                borderRadius: smallCard ? '8px' : '8px 8px 0 0',
                backgroundColor: cardColors.getColor(),
                color: cardColors.getTextColor()
            }}>
                <div className={styles.topMenu}>
                    {!smallCard ? <ChevronUpIcon onClick={minimizeCard} /> : <ChevronDownIcon onClick={minimizeCard} />}

                    <MinusIcon onClick={removeCard} />
                </div>
                <div className={styles.mainInfo}>
                    <img src={cardColors.getIcon()} alt="" />
                    <div>
                        <h1 className={styles.temp}
                            onClick={() => setFahrenheitActive(p => !p)}>
                            {fahrenheitActive ? `${temp.toFixed(1)}ºF` : `${TO_CELSIUS(temp).toFixed(1)}ºC`}</h1>
                        <h1>{city}</h1>
                        <p>{state}</p>
                        <h3>{curr.day}</h3>
                    </div>
                </div>
            </div>
            <div className={styles.cardForecast} ref={ref}>
                <section>
                    <h3>{curr.weather[0].main}</h3>
                    <ChevronRightIcon onClick={handleClick} />
                </section>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h4>Max</h4>
                            </td>
                            <td>
                                <h4>{fahrenheitActive ? `${temp_max.toFixed(1)}ºF` : `${TO_CELSIUS(temp_max).toFixed(1)}ºC`}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Min</h4>
                            </td>
                            <td>
                                <h4>{fahrenheitActive ? `${temp_min.toFixed(1)}ºF` : `${TO_CELSIUS(temp_min).toFixed(1)}ºC`}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Humidity</h4>
                            </td>
                            <td>
                                <h4>{humidity} %</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Pressure</h4>
                            </td>
                            <td>
                                <h4>{pressure} hPa</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )

}

export default WeatherCard