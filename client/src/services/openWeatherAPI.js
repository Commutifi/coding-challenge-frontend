class OpenWeatherAPI {
    BASE_URL = process.env.REACT_APP_OPEN_WEATHER_BASE_URL
    API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY
    lot = null
    lat = null

    constructor() {
        this.navigator = navigator;
    }

    async initialize() {
        //use try catch
        const { geolocation } = this.navigator
        geolocation.getCurrentPosition(async (position, error) => {
            if(error) {
                console.log(error)
            }
            this.lon = position.coords.longitude
            this.lat = position.coords.latitude
        })
        const response = await this.fetchThreeDayForcast(this.lon, this.lat)
        return response
    }

    async fetchThreeDayForcast(lon, lat) {
        // const response = await fetch(`${this.BASE_URL}lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=imperial&appid=${this.API_KEY}`)
        // const data = await response.json()

        // const weather = data.daily.map(obj => {
        //     const dataObject = {
        //         lon: data.lon,
        //         lat: data.lat,
        //         date: null,
        //         weather: null,
        //     }

        //     dataObject.date = obj.dt
        //     dataObject.weather = {
        //         description: obj.weather[0].description,
        //         icon: obj.weather[0].icon,
        //         wind: obj.wind_speed,
        //         day_temp: obj.temp.day,
        //         night_temp: obj.temp.night,
        //         sunrise: obj.sunrise,
        //         sunset: obj.sunset
        //     }
           
        //     return dataObject
        // })

        // return weather.slice(0,3)
        return [{date: new Date(), weather: 'heavy rain'}]
    }
}

export const openWeatherAPI = new OpenWeatherAPI()