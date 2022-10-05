import { openCageAPI } from '../services/openCageAPI'

class OpenWeatherAPI {
    BASE_URL = process.env.REACT_APP_OPEN_WEATHER_BASE_URL
    API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY
    lon = null
    lat = null

    constructor() {
        this.navigator = navigator;
    }

    async initialize() {
        //use try catch
        const { geolocation } = this.navigator
        return new Promise((resolve, reject) => {
            geolocation.getCurrentPosition(async (position, error) => {
                if(error) {
                    console.error(error)
                }
                this.lon = position.coords.longitude
                this.lat = position.coords.latitude
                try {
                    const response = await this.fetchThreeDayForcast(this.lon, this.lat)
                    resolve(response)
                } catch(err){
                    console.error(err)
                }
            })
        })
        
    }

    async fetchThreeDayForcast(lon, lat) {
        // const fetchDays = fetch(`${this.BASE_URL}lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=imperial&appid=${this.API_KEY}`)
        // const coordsToLocation = openCageAPI.transformCoordsToLocation(lat, lon)

        // const [forecast, location] = await Promise.all([fetchDays, coordsToLocation])
        // const response = await forecast.json() 
        // console.log('RESPONSE',response)
        // const weather = response.daily.map(obj => {
        //     const dataObject = {
        //         id: obj.dt,
        //         lon: response.lon,
        //         lat: response.lat,
        //         city: location.city,
        //         country: location.country,
        //         date: new Date(obj.dt * 1000).toDateString(),
        //         weather: null,
        //     }

        //     dataObject.weather = {
        //         description: obj.weather[0].description,
        //         icon: obj.weather[0].icon,
        //         wind: obj.wind_speed,
        //         day_temp: obj.temp.day,
        //         night_temp: obj.temp.night,
        //     }
           
        //     return dataObject
        // })
        // console.log('weather.slice(0,3)', weather.slice(0,3))
        // return weather.slice(0,3)
        // return [{date: new Date(), weather: 'heavy rain'}]
        return Promise.resolve([
            {
                city: 'Belgrad',
                country: "Serbia",
                date: "Tue Oct 04 2022",
                id: '18738374938',
                lat: 12323213,
                lon: 20.333,
                weather: {
                    day_temp: 62.31,
                    description: "light rain",
                    icon: "10d",
                    night_temp: 52.97,
                    sunrise: 1664858361,
                    sunset: 1664900068,
                    wind: 12.73
        
                }
            },
            {
                city: 'Belgrad',
                country: "Serbia",
                date: "Tue Oct 04 2022",
                id: '18738374938',
                lat: 12323213,
                lon: 20.333,
                weather: {
                    day_temp: 62.31,
                    description: "light rain",
                    icon: "10d",
                    night_temp: 52.97,
                    sunrise: 1664858361,
                    sunset: 1664900068,
                    wind: 12.73
        
                }
            },
            {
                city: 'Belgrad', 
                country: "Serbia", 
                date: "Tue Oct 04 2022", 
                id: '18738374938', 
                lat: 12323213, 
                lon: 20.333,
                weather: {
                    day_temp: 62.31,
                    description: "light rain",
                    icon: "10d",
                    night_temp: 52.97,
                    sunrise: 1664858361,
                    sunset: 1664900068,
                    wind: 12.73
        
                }
            }
        
        ])
    }
}

export const openWeatherAPI = new OpenWeatherAPI()