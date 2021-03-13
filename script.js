const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const app = {
    apiKey: 'bc2236a7b9328c457cc1e02dd6ac81fd',
    fecthWeahter(city) {
        const URL = `http://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${this.apiKey}`
        fetch(URL)
        .then(response => response.json())
        .then(data => this.displayWeather(data))
    },
    displayWeather(data) {
        const { list } = data
        const currentWeather = list[0]
        const { name } = currentWeather
        const {icon, description} = currentWeather.weather[0]
        const { temp, humidity} = currentWeather.main
        const { speed } = currentWeather.wind
        console.log(name, icon, description, temp, humidity, speed)
    }
}