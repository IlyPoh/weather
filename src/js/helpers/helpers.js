import { months, directions, elements } from '../components/config';

function createDOMElement(tagName, ...classNames) {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);

    return element;
}

export function getLocalTime(value) {
    const time = new Date();
    const currentUTCDate = new Date(
        time.getTime() + time.getTimezoneOffset() * 60 * 1000
    );
    const localTime = new Date(currentUTCDate.getTime() + value * 1e3);
    let hours = localTime.getHours();
    const minutes = localTime.getMinutes().toString().padStart(2, '0');
    const date = localTime.getDate();
    const month = localTime.getMonth();
    const currentMonth = months[month];

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm} ${currentMonth} ${date}`;
}
export function dewPointCelsius(temperature, humidity) {
    const vaporPressureConstant = 17.27;
    const saturationVaporPressureConstant = 237.7;
    const alpha =
        (vaporPressureConstant * temperature) /
            (saturationVaporPressureConstant + temperature) +
        Math.log(humidity / 100.0);
    const dewPoint = Math.round(
        (saturationVaporPressureConstant * alpha) /
            (vaporPressureConstant - alpha)
    );

    return dewPoint;
}

export function findWindDirection(windDeg) {
    const windDirectionDegrees = 45;
    const numberOfDirections = 8;
    const windDirectionIndex =
        Math.round(windDeg / windDirectionDegrees) % numberOfDirections;
    const windDirectionCardinal = directions[windDirectionIndex];

    return windDirectionCardinal;
}

export function gettingError(message) {
    const errorMessageBlockElement = document.querySelector('.weather-error');
    errorMessageBlockElement.classList.remove('hidden');
    const errorMessageTextElement = document.createElement('p');
    errorMessageTextElement.innerHTML = message;
    errorMessageBlockElement.append(errorMessageTextElement);
}

export function firstCharToUpperCase(text) {
    return text[0].toUpperCase() + text.slice(1);
}

export function responseErrorChecker(data) {
    console.log(data);
    if (data.cod === 401) {
        gettingError('Invalid API Key.');
    } else {
        const message = firstCharToUpperCase(data.message);
        gettingError(message);
    }
}

export function createCityList(list) {
    for (const listItem of list) {
        const { cityList } = elements;
        const city = createDOMElement('li', 'weather-city-city');
        city.innerHTML = listItem;
        city.setAttribute('data-for', listItem);
        cityList.append(city);
    }
}

export function iconLoader(element, link) {
    const imageElement = new Image();
    imageElement.src = link;
    element.append(imageElement);
}

export function toggleList() {
    const { cityList } = elements;
    cityList.classList.toggle('hidden');
}

export function addAnimation() {
    const { content } = elements;
    content.classList.add('is-loading');
}

export function removeAnimation() {
    const { content } = elements;
    content.classList.remove('is-loading');
}
