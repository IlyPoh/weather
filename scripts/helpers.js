import { months, directions } from "./data";

export function createDOMElement(tagName, ...classNames) {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
    return element;
}

export function getLocalTime(value) {
    const time = new Date()
    const localTime = new Date(time.getTime() + (value * 1e3));
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
    const errorMessageBlockElement = document.querySelector('.weather-error')
    errorMessageBlockElement.classList.remove('hidden')
    const errorMessageTextElement = document.createElement('p')
    errorMessageTextElement.innerHTML = message
    errorMessageBlockElement.append(errorMessageTextElement)
    return;
}

export function firstCharToUpperCase(text) {
    return text = text[0].toUpperCase() + text.slice(1)
}

export function responseErrorChecker(data) {
    if (data.cod === 401) {
        gettingError('Invalid API Key.')
        return;
    } else {
        const message = firstCharToUpperCase(data.message)
        gettingError(message)
        return;
    }
}