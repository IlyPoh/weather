import {
    gettingError,
    firstCharToUpperCase,
    responseErrorChecker,
    createCityList,
    iconLoader,
    openList,
    closeList,
    addAnimation,
    removeAnimation,
} from '../helpers/helpers.js';
import { cityList, elements } from './config.js';
import { CityInfo } from './city.js';
import { fetchWeatherByCity, fetchWeatherByGeolocation } from './config';

function userGeolocation() {
    navigator.geolocation.getCurrentPosition(
        (data) => {
            const lat = data.coords.latitude;
            const lon = data.coords.longitude;

            if (!localStorage.getItem('userCity')) {
                findCityByGeolocation(lat, lon);
            } else {
                findCityByName(localStorage.getItem('userCity'));
            }
        },
        (error) => {
            gettingError(error.message);

            if (!localStorage.getItem('userCity')) {
                findCityByName(cityList[0]);
            } else {
                findCityByName(localStorage.getItem('userCity'));
            }
        }
    );
}

function selectedCityUpdate() {
    const { citySelected } = elements;
    citySelected.innerHTML = localStorage.getItem('userCity');
}

async function findCityByName(cityName) {
    try {
        addAnimation();
        const response = await fetch(fetchWeatherByCity(cityName));
        const data = await response.json();
        if (!response.ok) {
            responseErrorChecker(data);
        }
        updater(data);
        removeAnimation();
    } catch (error) {
        console.log(error);
    }
}

async function findCityByGeolocation(lat, lon) {
    try {
        addAnimation();
        const response = await fetch(fetchWeatherByGeolocation(lat, lon));
        const data = await response.json();
        if (!response.ok) {
            responseErrorChecker(data);
        }
        updater(data);
        removeAnimation();
    } catch (error) {
        console.log(error);
    }
}

function updater(data) {
    const city = new CityInfo(data);

    updateCity(city);
    selectedCityUpdate();
}

function updateCity(city) {
    elements.images.forEach((img) => {
        const imageElement = document.createElement('img');
        imageElement.setAttribute(
            'src',
            `https://openweathermap.org/img/wn/${city.icon}@2x.png`
        );
        img.innerHTML = '';
        img.append(imageElement);
    });
    city.secondState = firstCharToUpperCase(city.secondState);
    elements.iconDirectionPointer.style.transform = `rotate(${city.windDeg}deg)`;

    elements.temperatures.forEach(
        (elem) => (elem.innerHTML = `${city.temp}° C`)
    );
    elements.currentState.innerHTML = `${city.secondState}`;
    elements.currentTime.innerHTML = `${city.time}`;
    elements.currentCity.innerHTML = `${city.fullName}`;
    elements.currentInfo.innerHTML = `Feels like ${city.feelsLike}° C. ${city.state}. ${city.secondState}`;
    elements.wind.innerHTML = `${city.windSpeed} m/s ${city.windDirection}`;
    elements.pressure.innerHTML = `${city.pressure} hPa`;
    elements.humidity.innerHTML = `${city.humidity}%`;
    elements.dew.innerHTML = `${city.dew}° C`;
    elements.visibility.innerHTML = `${city.visibility}km`;

    localStorage.setItem('userCity', city.name);
}

export function App() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('weather-city-selected')) {
            const { cityList } = elements;
            if (cityList.classList.contains('hidden')) {
                openList();
            } else {
                closeList();
            }
        }
        if (e.target.classList.contains('weather-city-city')) {
            closeList();
            findCityByName(e.target.dataset.for);
        }
        if (e.target.classList.contains('weather-local-city-button')) {
            closeList();
            localStorage.clear();
            userGeolocation();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        iconLoader(
            elements.iconDirectionPointer,
            './images/icon-direction-pointer.svg'
        );
        iconLoader(elements.iconPressure, './images/icon-pressure.svg');
        createCityList(cityList);
        userGeolocation();
    });
}
