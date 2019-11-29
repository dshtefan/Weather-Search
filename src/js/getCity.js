import {getWeather} from "./getWeather";
import {preparingData, preparingErrorMessage} from "./renderingFunctions";

export const getCity = (event) => {
  event.preventDefault();
  getWeather(event.target[0].value)
    .then(data => preparingData(data.data))
    .catch(err => preparingErrorMessage(err.message));
};