class OpenCageAPI {
    BASE_URL = process.env.REACT_APP_OPEN_CAGE_BASE_URL
    API_KEY = process.env.REACT_APP_OPEN_CAGE_API_KEY

    async queryLocationOptions(queryString) {
        try {
            const response = await fetch(`${this.BASE_URL}q=${queryString}&key=${this.API_KEY}&language=en`)
            const data = await response.json()
            console.log(data)
            const options = data.results.map((location) => {
                const locationData = {
                    lon: null,
                    lat: null,
                    value: null,
                    id: null
                }

                locationData.lon = location.geometry.lng
                locationData.lat = location.geometry.lat
                locationData.value = location.formatted
                locationData.id = location.annotations.geohash

                return locationData
            })
            const e = [
                {id: 1, lat: 2342343, lon: 232432432, value: 'Belgrad'},
                {id: 2, lat: 111342343, lon: 232432, value: 'Belarus'}
            ]
            return options
        } catch (err) {
            console.error(err)
        }
    }

    async transformCoordsToLocation(lat, lon) {
        try {
            const response = await fetch(`${this.BASE_URL}q=${lat},${lon}&key=${this.API_KEY}&language=en`)
            const data = await response.json()

            return {
                city: data.results[0].components.city,
                country: data.results[0].components.country
            }
        } catch (err) {
            console.error(err)
        }
    }
}

export const openCageAPI = new OpenCageAPI()