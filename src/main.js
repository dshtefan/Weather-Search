const getCity = () => {
    let cityName = document.getElementById("cityField").value;
    getWeather(cityName);
}

const openTab = i => {
  document.getElementById(`tab${activeTab}`).classList.remove(`active-tab`)
  let currentTab = document.getElementById(`tab${i + 1}`)
  document.getElementById(`tab${i + 1}`).classList.add(`active-tab`)
  activeTab = i + 1
  document.getElementById(`cityName`).innerText = results[0][0]
  document.getElementById(`tabName`).innerText = results[i + 1][0]
  document.getElementById(`result`).innerText = results[i + 1][1]
  document.getElementById(`unit`).innerText = results[i + 1][2]
}

const getWeather = cityName => {
  console.log(cityName);
  axios.get('https://api.openweathermap.org/data/2.5/weather?', {
    params: {
      q: cityName,
      appid: APIkey
    }
  }).then((data) => {
    weather = data.data
    
    console.log(data.data);
    console.log((weather.main.temp - 273.15).toFixed(0));

    let city = weather.name
    let main = weather.weather[0].main
    let temp = (weather.main.temp - kelvin).toFixed(0) 
    let max_temp = (weather.main.temp_max - kelvin).toFixed(0)
    let min_temp = (weather.main.temp_min - kelvin).toFixed(0)
    let wind = weather.wind.speed
    let humidity = weather.main.humidity
    let sunrise = new Date(weather.sys.sunrise * 1000)
    let sunset = new Date(weather.sys.sunset * 1000)
    let pressure = weather.main.pressure
    let timezone = weather.timezone / 3600
    const getDate = (d) => 
      `${d.getUTCHours() + timezone}:${d.getUTCMinutes()+ timezone}`
    
    results = [
      [city],
      [main, `${temp}°`, `${max_temp}° / ${min_temp}°`],
      [`Wind`, wind, `m / s`],
      [`Humidity`, `${humidity}%`, ``],
      [`Sunrise | Sunset`, `${getDate(sunrise)} | ${getDate(sunset)}`, ``],
      [`Pressure`, pressure, `hPa`]
    ]
    openTab(0)

    console.log(main)
  }).catch((err) => {
    console.log(err)
  })
}

let results = [[]]
let kelvin = 273.15
let APIkey = "d3fb6b0837add2d07e9d69ef97b85afd";
let weather;
let activeTab = 1;
document.getElementById("searchButton").onclick = getCity
let tabs = document.getElementsByClassName("tab")
Array.prototype.slice.call(tabs).map((tab, i) => tab.onclick = () => openTab(i))
