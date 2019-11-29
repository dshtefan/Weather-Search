const getCls = (temp = 0) => (temp - 273.15).toFixed(0);

export const weatherDataDestructuring = weather => {
  let {
    name,
    main: { temp, temp_max, temp_min, humidity, pressure },
    weather: {[0]: { main, icon }},
    wind: { speed },
    sys: { sunrise, sunset },
    timezone
  } = weather;
  temp = getCls(temp);
  temp_max = getCls(temp_max);
  temp_min = getCls(temp_min);
  sunrise = new Date(sunrise * 1000);
  sunset = new Date(sunset * 1000);
  timezone /= 3600;
  icon = icon.substr(0, 2);
  const getDate = d =>
    `${d.getUTCHours() + timezone}:${d.getUTCMinutes() + timezone}`;

  return [
    [name],
    [main, `${temp}°`, `${temp_max}° / ${temp_min}°`, icon],
    ['Wind', speed, 'm / s', 'wind'],
    ['Humidity', `${humidity}%`, '', 'humidity'],
    ['Sunrise | Sunset', `${getDate(sunrise)} | ${getDate(sunset)}`, '', 'sunset'],
    ['Pressure', pressure, 'hPa', 'pressure']
  ]
};