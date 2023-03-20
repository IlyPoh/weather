import { months, directions } from "./data";

export function createDOMElement(tagName, ...classNames) {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
    return element;
}

export function getLocalTime(value) {
    const time = new Date()
    const localTime = new Date(time.getTime() + (value * 1000));
    let hours = localTime.getHours()
    const minutes = localTime.getMinutes().toString().padStart(2, '0')
    const date = localTime.getDate()
    const month = localTime.getMonth()
    const currentMonth = months[month]

    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm} ${currentMonth} ${date}`
}
export function dewPointCelsius(temperature, humidity) {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100.0);
    const dewPoint = Math.round((b * alpha) / (a - alpha));
    return dewPoint;
}

export function findWindDirection(windDeg) {
    const windDirectionDegrees = 45
    const numberOfDirections = 8
    const windDirectionIndex = Math.round(windDeg / windDirectionDegrees) % numberOfDirections;
    const windDirectionCardinal = directions[windDirectionIndex]
    
    return windDirectionCardinal
}

export function gettingError(message) {
    const errorMessageElement = document.querySelector('.weather-error')
    errorMessageElement.classList.remove('hidden')
    errorMessageElement.innerHTML = message
    return;
}