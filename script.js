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
        console.log(data)
        const { list } = data
        const currentWeather = list[0]
        const { name } = currentWeather
        const {icon, description} = currentWeather.weather[0]
        const { temp, humidity} = currentWeather.main
        const { speed } = currentWeather.wind
        console.log(name, icon, description, temp, humidity, speed)
        $('.city').innerText = `Weather in ${name}`
        $('.description').innerText = `${description}`
        $('.temp').innerText = `${temp}°C`
        $('.humidity').innerText = `Humidity: ${humidity}%`
        $('.wind').innerText = `Wind speed: ${speed} km/h`
        $('.icon').setAttribute('src', `
            https://openweathermap.org/img/wn/${icon}.png
        `)
        document.body.style.backgroundImage = `
            url('https://source.unsplash.com/1600x900/?${name}')
        `
        document.querySelector(".weather").classList.remove("loading")
    },
    searchCity() {
        const inputCity = $('.search-bar')
        inputCity.onchange = function(e) {
            app.fecthWeahter(e.target.value)
        }
        inputCity.value = ''
    },
    handleEvents() {
        const btnSearch = $('.search button')

        btnSearch.addEventListener('click', function() {
            app.searchCity()
        })

        btnSearch.addEventListener("keyup", function (event) {
            console.log(event.key)
            if (event.key === "Enter") {
              app.searchCity()
            }
        })
    },
    run() {
        this.handleEvents()
        this.searchCity()
    }
}
app.run()