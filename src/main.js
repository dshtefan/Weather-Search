import './style.scss';
import {addTemplate, displayIcon, preparingData, preparingErrorMessage} from "./js/renderingFunctions";
import {getCity} from "./js/getCity";
import {getWeather} from "./js/getWeather";

document.getElementById('search-form').addEventListener('submit', (event) => getCity(event, getWeather,  preparingData, preparingErrorMessage));
addTemplate();
displayIcon('none');