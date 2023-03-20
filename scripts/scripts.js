import { createDOMElement, getLocalTime, dewPointCelsius, findWindDirection, gettingError } from './helpers.js';
import { apiKey, cityList } from './data.js';

const citySelectedElement = document.querySelector('.weather-city-selected')
const cityListElement = document.querySelector('.weather-city-selection')
const weatherImagesElements = document.querySelectorAll('.weather-image')
const weatherTemperatureElements = document.querySelectorAll('.weather-temperature')
const weatherCurrentStateElement = document.querySelector('.weather-current-state')
const weatherCurrentTimeElement = document.querySelector('.weather-current-time')
const weatherCurrentCityElement = document.querySelector('.weather-current-city')
const weatherCurrentInfoElement = document.querySelector('.weather-current-info')
const weatherDirectionElement = document.querySelector('.icon-direction-pointer')
const weatherWindElement = document.querySelector('.weather-wind')
const weatherPressureElement = document.querySelector('.weather-pressure')
const weatherHumidityElement = document.querySelector('.weather-humidity')
const weatherDewElement = document.querySelector('.weather-dew')
const weatherVisibiltyElement = document.querySelector('.weather-visibility')

class CityInfo {
    constructor(data) {
        const visibilityMetric = 1000
        
        this.name = data.name
        this.temp = Math.round(data.main.temp)
        this.state = data.weather[0].main
        this.secondState = data.weather[0].description
        this.icon = data.weather[0].icon
        this.time = getLocalTime(data.timezone)
        this.city = `${data.name}, ${data.sys.country}`
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

function selectedCityUpdate() {
    citySelectedElement.innerHTML = window.localStorage.getItem('city')
}

if (!window.localStorage.getItem("city")) {
    findCityByName(cityList[0])
    window.localStorage.setItem("city", cityList[0])
}

for (let i = 0; i < cityList.length; i++) {
    const city = createDOMElement('li', 'weather-city-city')
    city.innerHTML = cityList[i]
    city.setAttribute("data-for", cityList[i])
    cityListElement.append(city)
}

async function findCityByName(cityName) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    const data = await response.json()

    const city = new CityInfo(data)

    updateState(city)
    selectedCityUpdate()
}

function updateState({ name, temp, state, secondState, icon, time, city, feelsLike, windDeg, windDirection, windSpeed, pressure, humidity, dew, visibility }) {
    weatherImagesElements.forEach( ele => {
        const image = document.createElement('img')
        image.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
        ele.innerHTML = ""
        ele.append(image)
    })
    secondState = secondState[0].toUpperCase() + secondState.slice(1)
    weatherDirectionElement.style.transform = `rotate(${windDeg}deg)`

    weatherTemperatureElements.forEach( ele => ele.innerHTML = `${temp}° C`)
    weatherCurrentStateElement.innerHTML = `${secondState}`
    weatherCurrentTimeElement.innerHTML = `${time}`
    weatherCurrentCityElement.innerHTML = `${city}`
    weatherCurrentInfoElement.innerHTML = `Feels like ${feelsLike}° C. ${state}. ${secondState}`
    weatherWindElement.innerHTML = `${windSpeed} m/s ${windDirection}`
    weatherPressureElement.innerHTML = `${pressure} hPa`
    weatherHumidityElement.innerHTML = `${humidity}%`
    weatherDewElement.innerHTML = `${dew}° C`
    weatherVisibiltyElement.innerHTML = `${visibility}km`

    window.localStorage.setItem("city", name)
}

function toggleList() {
    cityListElement.classList.toggle('hidden')
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('weather-city-selected')) toggleList();
    if (e.target.classList.contains('weather-city-city')) findCityByName(e.target.dataset.for);;
})

document.addEventListener("DOMContentLoaded", () => {
    findCityByName(window.localStorage.getItem('city'))
    selectedCityUpdate()
})

async function findCityByGeolocation(lat, lon) {
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    const data = await response.json()

    const city = new CityInfo(data)

    updateState(city)
    selectedCityUpdate()
}

navigator.geolocation.getCurrentPosition(
    (data) => {
        const lat = data.coords.latitude
        const lon = data.coords.longitude
        findCityByGeolocation(lat, lon)
    },
    (error) => {
        gettingError(error.message)
    }
)