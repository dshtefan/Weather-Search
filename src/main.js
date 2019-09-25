const getCity = () => {
  let cityName = document.getElementById("cityField").value
  getWeather(cityName)
}

const openTab = i => {
  let currentActiveTab = document.getElementById(`tab${activeTab}`),
      newActiveTab = document.getElementById(`tab${i + 1}`)
  currentActiveTab.classList.remove(`active-tab`)
  newActiveTab.classList.add(`active-tab`)
  activeTab = i + 1
  document.getElementById(`cityName`).innerText = results[0][0]
  document.getElementById(`tabName`).innerText = results[i + 1][0]
  document.getElementById(`result`).innerText = results[i + 1][1]
  document.getElementById(`unit`).innerText = results[i + 1][2]
  document.getElementById(`weatherIcon`).innerHTML = `<img src="img/weather_icons/${results[i + 1][3]}.svg">`
  displayIcon(``)
}

const getWeather = cityName => {
  axios.get('https://api.openweathermap.org/data/2.5/weather?', {
    params: {
      q: cityName,
      appid: APIkey
    }
  })
  .then(data => {
    fillingWeatherInfo(data.data)
    unlockTabs()
    openTab(0)
  })
  .catch(err => {
    lockTabs()
    errorMessage(err.message)
    displayIcon(`none`)
  })
}

const fillingWeatherInfo = weather => {
  let city = weather.name, 
      main = weather.weather[0].main, 
      temp = (weather.main.temp - kelvin).toFixed(0) , 
      max_temp = (weather.main.temp_max - kelvin).toFixed(0), 
      min_temp = (weather.main.temp_min - kelvin).toFixed(0), 
      wind = weather.wind.speed, 
      humidity = weather.main.humidity, 
      sunrise = new Date(weather.sys.sunrise * 1000), 
      sunset = new Date(weather.sys.sunset * 1000), 
      pressure = weather.main.pressure, 
      timezone = weather.timezone / 3600,
      icon = weather.weather[0].icon.substr(0, 2)
  const getDate = (d) => 
    `${d.getUTCHours() + timezone}:${d.getUTCMinutes()+ timezone}`
  
  results = [
    [city],
    [main, `${temp}°`, `${max_temp}° / ${min_temp}°`, icon],
    [`Wind`, wind, `m / s`, `wind`],
    [`Humidity`, `${humidity}%`, ``, `humidity`],
    [`Sunrise | Sunset`, `${getDate(sunrise)} | ${getDate(sunset)}`, ``, `sunset`],
    [`Pressure`, pressure, `hPa`, `pressure`]
  ]
}

const errorMessage = message => {
  document.getElementById(`cityName`).innerText = ``
  document.getElementById(`result`).innerText = ``
  document.getElementById(`unit`).innerText = ``
  document.getElementById(`tabName`).innerText = message
}

const lockTabs = () => {
  openTab(0)
  Array.prototype.slice.call(tabs).map((tab, i) => tab.onclick = () => {})
}

const unlockTabs = () => 
  Array.prototype.slice.call(tabs).map((tab, i) => tab.onclick = () => openTab(i))

const displayIcon = mode => {
  if (mode === `none`) {
    document.getElementById("weatherIcon").style.display = `none`
    document.getElementById("verticalLine").style.display = `none`
  } else {
    document.getElementById("weatherIcon").style.display = `block`
    document.getElementById("verticalLine").style.display = `block`
  }
}

let results = [[]], 
    kelvin = 273.15, 
    APIkey = "d3fb6b0837add2d07e9d69ef97b85afd", 
    weather, 
    activeTab = 1, 
    tabs = document.getElementsByClassName("tab")
document.getElementById("searchButton").onclick = getCity
displayIcon(`none`)