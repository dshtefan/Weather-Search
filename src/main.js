import './style.scss';
import template from './template.pug';
import axios from 'axios';

const el = elId => document.getElementById(elId);

const getCity = (event) => getWeather(event.target[0].value);

const openTab = i => {
  let currentActiveTab = el(`tab${activeTab}`);
  let newActiveTab = el(`tab${i + 1}`);
  const templateParams = {
    src: results[i + 1][3],
    city: results[0][0],
    tab: results[i + 1][0],
    res: results[i + 1][1],
    unit: results[i + 1][2]
  };
  currentActiveTab.classList.remove('active-tab');
  newActiveTab.classList.add('active-tab');
  activeTab = i + 1;
  addTemplate(templateParams);
};

const getWeather = cityName => {
  axios.get('https://api.openweathermap.org/data/2.5/weather?', {
    params: {
      q: cityName,
      appid: APIkey
    }
  })
  .then(data => {
    fillingWeatherInfo(data.data);
    unlockTabs();
    openTab(0);
  })
  .catch(err => {
    lockTabs();
    addTemplate('empty');
    errorMessage(err.message);
    displayIcon('none');
  })
};

const getCls = (temp = 0) => (temp - kelvin).toFixed(0);

const fillingWeatherInfo = weather => {
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
  
  results = [
    [name],
    [main, `${temp}°`, `${temp_max}° / ${temp_min}°`, icon],
    ['Wind', speed, 'm / s', 'wind'],
    ['Humidity', `${humidity}%`, '', 'humidity'],
    ['Sunrise | Sunset', `${getDate(sunrise)} | ${getDate(sunset)}`, '', 'sunset'],
    ['Pressure', pressure, 'hPa', 'pressure']
  ]
};

const errorMessage = message => el('tabName').innerText = message;

const lockTabs = () => {
  openTab(0);
  Array.prototype.slice.call(tabs).map((tab) => tab.onclick = () => {});
};

const unlockTabs = () => 
  Array.prototype.slice.call(tabs).map((tab, i) => tab.onclick = () => openTab(i));

const addTemplate = (data = 'empty') => {
  if (data === 'empty')
    el('middleBlock').innerHTML = template({
      src: '',
      city: '',
      tab: '',
      res: '',
      unit: ''
    });
  else
    el('middleBlock').innerHTML = template(data);
};

const displayIcon = mode => {
  if (mode === 'none') {
    el('weatherIcon').style.display = 'none';
    el('verticalLine').style.display = 'none';
  } else {
    el('weatherIcon').style.display = 'block';
    el('verticalLine').style.display = 'block';
  }
};

let results =  [
      [''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
];
let kelvin = 273.15;
let APIkey = 'd3fb6b0837add2d07e9d69ef97b85afd';
let activeTab = 1;
let tabs = document.getElementsByClassName('tab');
el('search-form').addEventListener('submit', getCity);
addTemplate();
displayIcon('none');