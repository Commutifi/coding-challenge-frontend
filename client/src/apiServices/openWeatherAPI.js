import { openCageAPI } from './openCageAPI'

class OpenWeatherAPI {
    BASE_URL = process.env.REACT_APP_OPEN_WEATHER_BASE_URL
    API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY
    lon = null
    lat = null
    currentLocation = null

    constructor() {
        this.navigator = navigator;
    }

    /**
     * Function initializes user current location on initial load and returns forecast
     * @returns Promise<[]> 3 Day forecast on initial user location
     */
    async initialize() {
        const { geolocation } = this.navigator
        return new Promise((resolve, reject) => {
            if (geolocation) {
                geolocation.getCurrentPosition(async (position, error) => {
                    if (error) {
                        console.error(error)
                    }

                    this.lon = position.coords.longitude
                    this.lat = position.coords.latitude
                    try {
                        const response = await this.fetchThreeDayForcast(this.lon, this.lat)
                        resolve(response)
                    } catch(err) {
                        console.error(err)
                    }
                })
            } else {
                reject('geo location disabled')
            }
        })
    }

    /**
     * Function fetches 3 day forcast
     * @param {Number} lon location longitude
     * @param {Number} lat location latitude
     * @returns Promise<[]> 3 Day forecast
     */
    async fetchThreeDayForcast(lon, lat) {
        const fetchDays = fetch(`${this.BASE_URL}lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=imperial&appid=${this.API_KEY}`)
        const coordsToLocation = openCageAPI.transformCoordsToLocation(lat, lon)

        const [forecast, location] = await Promise.all([fetchDays, coordsToLocation])
        const response = await forecast.json()

        this.setCurrentLocation(location)

        // flatten and outsource data 
        const weather = response.daily.map(obj => {
            const dataObject = {
                id: obj.dt,
                lon: response.lon,
                lat: response.lat,
                city: location.city,
                country: location.country,
                date: new Date(obj.dt * 1000).toDateString(),
                weather: null,
            }

            dataObject.weather = {
                description: obj.weather[0].description,
                icon: obj.weather[0].icon,
                wind: obj.wind_speed,
                day_temp: Math.round(obj.temp.day),
                night_temp: Math.round(obj.temp.night),
            }

            return dataObject
        })

        return weather.slice(0, 3)
    }

    getCurrentLocation() {
        return this.currentLocation
    }

    setCurrentLocation(location) {
        this.currentLocation = location
    }
}

export const openWeatherAPI = new OpenWeatherAPI()