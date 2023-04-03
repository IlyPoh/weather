export const apiKey = '0c796f0b8200e08a4b2b28a170bb0484';

export const cityList = ['Kyiv', 'Odesa', 'New York', 'London', 'Tokyo'];

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export const elements = {
    content: document.querySelector('.weather-content'),
    citySelected: document.querySelector('.weather-city-selected'),
    cityList: document.querySelector('.weather-city-selection'),
    images: document.querySelectorAll('.weather-image'),
    temperatures: document.querySelectorAll('.weather-temperature'),
    currentState: document.querySelector('.weather-current-state'),
    currentTime: document.querySelector('.weather-current-time'),
    currentCity: document.querySelector('.weather-current-city'),
    currentInfo: document.querySelector('.weather-current-info'),
    iconDirectionPointer: document.querySelector(
        '.weather-direction-pointer-svg'
    ),
    iconPressure: document.querySelector('.weather-pressure-svg'),
    wind: document.querySelector('.weather-wind'),
    pressure: document.querySelector('.weather-pressure'),
    humidity: document.querySelector('.weather-humidity'),
    dew: document.querySelector('.weather-dew'),
    visibility: document.querySelector('.weather-visibility'),
};
const URL = 'https://api.openweathermap.org/';
export const fetchWeatherByCity = (city) =>
    `${URL}data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
export const fetchWeatherByGeolocation = (lat, lon) =>
    `${URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
