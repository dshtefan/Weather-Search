export const getWeather = async (cityName) => {
  let result = {
    weather: null,
    error: null
  };
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=845a76c8f22f4057845edbdc1f7ad0ce&q=${cityName}`);
    result.weather = await response.json();
    return result;
  } catch (error) {
    result.error = error;
    return result;
  }
};