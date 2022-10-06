import { useState } from 'react'
import { UseAppContext } from '../context/appContext'
import Card from '../components/Card'

function Forecast() {
    const { weatherData, setWeatherData, helperFunctions } = UseAppContext()
    const [mode, setMode] = useState({
        scale: 'fahrenheit',
        prefix: 'F'
    })

    function handleTemperatureClick(mode) {
        const newScale = (mode.scale === 'fahrenheit') ? 'celcius' : 'fahrenheit'
        const convertedTemp = (newScale === 'fahrenheit') ? helperFunctions.cToF : helperFunctions.fToC
        const newPrefix = (newScale === 'fahrenheit') ? 'F' : 'C'

        setMode({
            scale: newScale,
            prefix: newPrefix
        })

        const data = weatherData.map((data) => {
            const obj = { ...data }
            obj.weather.day_temp = convertedTemp(obj.weather.day_temp)
            obj.weather.night_temp = convertedTemp(obj.weather.night_temp)

            return obj
        })
        setWeatherData(data)
    }

    function renderCards() {
        if (weatherData.length > 0) {
            return (
                weatherData.map((card) => {
                    return <Card key={card.id} mode={mode} data={card} handleTemperatureClick={handleTemperatureClick} />
                })
            )
        }
    }
    return (
        <>
            {renderCards()}
        </>
    )
}

export default Forecast;