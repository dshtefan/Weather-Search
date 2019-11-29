import './style.scss';
import {addTemplate, displayIcon} from "./js/renderingFunctions";
import {getCity} from "./js/getCity";

document.getElementById('search-form').addEventListener('submit', getCity);
addTemplate();
displayIcon('none');