class OpenCageAPI {
    BASE_URL = process.env.REACT_APP_OPEN_CAGE_BASE_URL
    API_KEY = process.env.REACT_APP_OPEN_CAGE_API_KEY

    async queryLocationOptions(queryString) {
        try {
            const response = await fetch(`${this.BASE_URL}q=Belgrad&key=${this.API_KEY}&language=en`)
            const data = await response.json()
            const options = data.results.map((location) => {
                const locationData = {
                    lot: null,
                    lat: null,
                    value: null,
                    id: null
                }

                locationData.lot = location.geometry.lat
                locationData.lat = location.geometry.lng
                locationData.value = location.formatted
                locationData.id = location.annotations.geohash

                return locationData
            })

            return options
        } catch (err) {
            console.log(err)
        }
    }
}

export const openCageAPI = new OpenCageAPI()