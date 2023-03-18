import { months } from "./data";

export function createDOMElement(tagName, ...classNames) {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
    return element;
}

export function getTime(value) {
    const time = new Date(value)
    let hours = time.getHours()
    const minutes = time.getHours()
    const date = time.getDate()
    const month = time.getMonth()
    const currentMonth = months[month]

    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12

    return `${hours}:${minutes} ${ampm} ${currentMonth} ${date}`
}
export function dewPointCelsius(temperature, humidity) {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity/100.0);
    const dewPoint = Math.round((b * alpha) / (a - alpha));
    return dewPoint;
}