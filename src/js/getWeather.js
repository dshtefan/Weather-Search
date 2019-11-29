import axios from "axios";

export const getWeather = (cityName) =>
  axios.get('https://api.openweathermap.org/data/2.5/weather?', {
    params: {
      q: cityName,
      appid: '9c2f796d45e91e5c01a2ae26f1613625'
    }
  });