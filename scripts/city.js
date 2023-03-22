import { getLocalTime, dewPointCelsius, findWindDirection } from './helpers.js'
export default class CityInfo {
    constructor(data) {
        const visibilityMetric = 1000
        
        this.name = data.name
        this.fullName = `${data.name}, ${data.sys.country}`
        this.temp = Math.round(data.main.temp)
        this.state = data.weather[0].main
        this.secondState = data.weather[0].description
        this.icon = data.weather[0].icon
        this.time = getLocalTime(data.timezone)
        this.feelsLike = Math.round(data.main.feels_like)
        this.windDeg = data.wind.deg
        this.windDirection = findWindDirection(data.wind.deg)
        this.windSpeed = data.wind.speed
        this.pressure = data.main.pressure
        this.humidity = data.main.humidity
        this.dew = dewPointCelsius(data.main.temp, data.main.humidity),
        this.visibility = (data.visibility / visibilityMetric).toFixed(1)
    }
}