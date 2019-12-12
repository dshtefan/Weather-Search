export const getCity = async (event, getWeather, preparingData, preparingErrorMessage) => {
  try {
    event.preventDefault();
    const data = await getWeather(event.target[0].value);
    if(data.error)
      await preparingErrorMessage(data.error);
    else
      await preparingData(data.weather);
  } catch (err) {
    await preparingErrorMessage(err);
  }
};