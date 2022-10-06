function toggleTemperatureColor(temperature, mode) {
    if (mode.scale === 'fahrenheit') {
        if (temperature < 59) return 'blue'
        if (temperature > 96.8) return 'red'
        else return 'yellow'
    }

    if (mode.scale === 'celcius') {
        if (temperature < 15) return 'blue'
        if (temperature > 35) return 'red'
        else return 'yellow'
    }
}

export default toggleTemperatureColor