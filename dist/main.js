/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst el = elId => document.getElementById(elId);\n\nconst getCity = () => {\n  let cityName = el(`cityField`).value;\n  getWeather(cityName);\n};\n\nconst openTab = i => {\n  let currentActiveTab = el(`tab${activeTab}`),\n      newActiveTab = el(`tab${i + 1}`);\n  currentActiveTab.classList.remove(`active-tab`);\n  newActiveTab.classList.add(`active-tab`);\n  activeTab = i + 1;\n  el(`cityName`).innerText = results[0][0];\n  el(`tabName`).innerText = results[i + 1][0];\n  el(`result`).innerText = results[i + 1][1];\n  el(`unit`).innerText = results[i + 1][2];\n  el(`weatherIcon`).innerHTML = `<img src=\"img/weather_icons/${results[i + 1][3]}.svg\">`;\n  displayIcon(``);\n};\n\nconst getWeather = cityName => {\n  axios.get(`https://api.openweathermap.org/data/2.5/weather?`, {\n    params: {\n      q: cityName,\n      appid: APIkey\n    }\n  }).then(data => {\n    fillingWeatherInfo(data.data);\n    unlockTabs();\n    openTab(0);\n  }).catch(err => {\n    lockTabs();\n    errorMessage(err.message);\n    displayIcon(`none`);\n  });\n};\n\nconst fillingWeatherInfo = weather => {\n  let city = weather.name,\n      main = weather.weather[0].main,\n      temp = (weather.main.temp - kelvin).toFixed(0),\n      max_temp = (weather.main.temp_max - kelvin).toFixed(0),\n      min_temp = (weather.main.temp_min - kelvin).toFixed(0),\n      wind = weather.wind.speed,\n      humidity = weather.main.humidity,\n      sunrise = new Date(weather.sys.sunrise * 1000),\n      sunset = new Date(weather.sys.sunset * 1000),\n      pressure = weather.main.pressure,\n      timezone = weather.timezone / 3600,\n      icon = weather.weather[0].icon.substr(0, 2);\n\n  const getDate = d => `${d.getUTCHours() + timezone}:${d.getUTCMinutes() + timezone}`;\n\n  results = [[city], [main, `${temp}°`, `${max_temp}° / ${min_temp}°`, icon], [`Wind`, wind, `m / s`, `wind`], [`Humidity`, `${humidity}%`, ``, `humidity`], [`Sunrise | Sunset`, `${getDate(sunrise)} | ${getDate(sunset)}`, ``, `sunset`], [`Pressure`, pressure, `hPa`, `pressure`]];\n};\n\nconst errorMessage = message => {\n  el(`cityName`).innerText = ``;\n  el(`result`).innerText = ``;\n  el(`unit`).innerText = ``;\n  el(`tabName`).innerText = message;\n};\n\nconst lockTabs = () => {\n  openTab(0);\n  Array.prototype.slice.call(tabs).map((tab, i) => tab.onclick = () => {});\n};\n\nconst unlockTabs = () => Array.prototype.slice.call(tabs).map((tab, i) => tab.onclick = () => openTab(i));\n\nconst displayIcon = mode => {\n  if (mode === `none`) {\n    el(`weatherIcon`).style.display = `none`;\n    el(`verticalLine`).style.display = `none`;\n  } else {\n    el(`weatherIcon`).style.display = `block`;\n    el(`verticalLine`).style.display = `block`;\n  }\n};\n\nlet results = [[]],\n    kelvin = 273.15,\n    APIkey = `d3fb6b0837add2d07e9d69ef97b85afd`,\n    weather,\n    activeTab = 1,\n    tabs = document.getElementsByClassName(`tab`);\nel(`search-form`).addEventListener(`submit`, () => getCity());\ndisplayIcon(`none`);\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/style.scss?");

/***/ })

/******/ });