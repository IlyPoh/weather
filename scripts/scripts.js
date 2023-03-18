import { createDOMElement, getTime, dewPointCelsius } from './helpers.js';
import { apiKey, cityList } from './data.js';

const citySelectedElement = document.querySelector('.weather-city-selected')
const cityListElement = document.querySelector('.weather-city-selection')
const weatherImagesElements = document.querySelectorAll('.weather-image')
const weatherTemperatureElements = document.querySelectorAll('.weather-temperature')
const weatherCurrentStateElement = document.querySelector('.weather-current-state')
const weatherCurrentTimeElement = document.querySelector('.weather-current-time')
const weatherCurrentCityElement = document.querySelector('.weather-current-city')
const weatherCurrentInfoElement = document.querySelector('.weather-current-info')
const weatherWindElement = document.querySelector('.weather-wind')
const weatherPressureElement = document.querySelector('.weather-pressure')
const weatherHumidityElement = document.querySelector('.weather-humidity')
const weatherDewElement = document.querySelector('.weather-dew')
const weatherVisibiltyElement = document.querySelector('.weather-visibility')

for (let i = 0; i < cityList.length; i++) {
    const city = createDOMElement('li', 'weather-city-city')
    city.innerHTML = cityList[i]
    city.setAttribute("data-for", cityList[i])
    cityListElement.append(city)
}

async function findCity(cityName) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    const data = await response.json()

    const visibilityMetric = 1000

    const cityInfo = {
        temp: Math.round(data.main.temp),
        state: data.weather[0].main,
        secondState: data.weather[0].description,
        time: getTime(data.dt),
        city: `${data.name}, ${data.sys.country}`,
        feelsLike: Math.round(data.main.feels_like),
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        dew: dewPointCelsius(data.main.temp, data.main.humidity),
        visibility: (data.visibility / visibilityMetric).toFixed(1)
    }

    updateState(cityInfo)
    console.log(data);
}

function updateState({temp, state, secondState, time, city, feelsLike, windSpeed, pressure, humidity, dew, visibility}) {
    weatherImagesElements.forEach( ele => {
        const image = document.createElement('img')
        image.setAttribute('src', 'https://openweathermap.org/img/wn/10d@2x.png')
        ele.innerHTML = ""
        ele.append(image)
    })
    weatherTemperatureElements.forEach( ele => ele.innerHTML = `${temp}° C`)
    weatherCurrentStateElement.innerHTML = `${secondState}`
    weatherCurrentTimeElement.innerHTML = `${time}`
    weatherCurrentCityElement.innerHTML = `${city}`
    weatherCurrentInfoElement.innerHTML = `Feels like ${feelsLike}° C. ${state}. ${secondState}`
    weatherWindElement.innerHTML = `${windSpeed} m/s S`
    weatherPressureElement.innerHTML = `${pressure} hPa`
    weatherHumidityElement.innerHTML = `${humidity}%`
    weatherDewElement.innerHTML = `${dew}° C`
    weatherVisibiltyElement.innerHTML = `${visibility}km`
}

function openList() {
    cityListElement.classList.toggle('hidden')
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('weather-city-selected')) openList();
    if (e.target.classList.contains('weather-city-city')) findCity(e.target.dataset.for);;
})