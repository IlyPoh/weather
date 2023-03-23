import { createDOMElement, gettingError, firstCharToUpperCase, responseErrorChecker } from './helpers.js';
import { apiKey, cityList } from './data.js';
import CityInfo from './city.js';

const elements = {
    citySelected: document.querySelector('.weather-city-selected'),
    cityList: document.querySelector('.weather-city-selection'),
    images: document.querySelectorAll('.weather-image'),
    temperatures: document.querySelectorAll('.weather-temperature'),
    currentState: document.querySelector('.weather-current-state'),
    currentTime: document.querySelector('.weather-current-time'),
    currentCity: document.querySelector('.weather-current-city'),
    currentInfo: document.querySelector('.weather-current-info'),
    direction: document.querySelector('.icon-direction-pointer'),
    wind: document.querySelector('.weather-wind'),
    pressure: document.querySelector('.weather-pressure'),
    humidity: document.querySelector('.weather-humidity'),
    dew: document.querySelector('.weather-dew'),
    visibility: document.querySelector('.weather-visibility'),
    loading: document.querySelector('.is-loading')
  };

function userGeolocation() {
    navigator.geolocation.getCurrentPosition(
        (data) => {
            const lat = data.coords.latitude;
            const lon = data.coords.longitude;
            findCityByGeolocation(lat, lon)
        },
        (error) => {
            gettingError(error.message)
            if (!window.localStorage.getItem("userCity")) {
                findCityByName(cityList[0])
            } else {
                findCityByName(window.localStorage.getItem('userCity'))
            }
        }
    )
}

function createCityList(list) {
    for (let i = 0; i < list.length; i++) {
        const city = createDOMElement('li', 'weather-city-city')
        city.innerHTML = list[i]
        city.setAttribute("data-for", list[i])
        elements.cityList.append(city)
    }
}

function toggleList() {
    elements.cityList.classList.toggle('hidden')
}

function animation() {
    elements.loading.classList.remove('is-loading')
}

function selectedCityUpdate() {
    elements.citySelected.innerHTML = window.localStorage.getItem('userCity')
}

async function findCityByName(cityName) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    const data = await response.json()
    if (!response.ok) {
        responseErrorChecker(data)
    }
    updater(data)
}

async function findCityByGeolocation(lat, lon) {
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    const data = await response.json()
    if (!response.ok) {
        responseErrorChecker(data)
    }
    updater(data)
}

function updater(data) {
    const city = new CityInfo(data)

    updateCity(city)
    selectedCityUpdate()
}

function updateCity(city) {
    elements.images.forEach( ele => {
        const imageElement = document.createElement('img')
        imageElement.setAttribute('src', `https://openweathermap.org/img/wn/${city.icon}@2x.png`)
        ele.innerHTML = ""
        ele.append(imageElement)
    })
    city.secondState = firstCharToUpperCase(city.secondState)
    elements.direction.style.transform = `rotate(${city.windDeg}deg)`

    elements.temperatures.forEach( ele => ele.innerHTML = `${city.temp}° C`)
    elements.currentState.innerHTML = `${city.secondState}`
    elements.currentTime.innerHTML = `${city.time}`
    elements.currentCity.innerHTML = `${city.fullName}`
    elements.currentInfo.innerHTML = `Feels like ${city.feelsLike}° C. ${city.state}. ${city.secondState}`
    elements.wind.innerHTML = `${city.windSpeed} m/s ${city.windDirection}`
    elements.pressure.innerHTML = `${city.pressure} hPa`
    elements.humidity.innerHTML = `${city.humidity}%`
    elements.dew.innerHTML = `${city.dew}° C`
    elements.visibility.innerHTML = `${city.visibility}km`

    window.localStorage.setItem("userCity", city.name)
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('weather-city-selected')) toggleList();
    if (e.target.classList.contains('weather-city-city')) findCityByName(e.target.dataset.for);
})

document.addEventListener("DOMContentLoaded", async () => {
    userGeolocation()
    createCityList(cityList)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    animation();
})