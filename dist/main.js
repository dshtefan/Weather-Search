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
/*! no static exports found */
/***/ (function(module, exports) {

eval("const getCity = () => {\n  let cityName = document.getElementById(\"cityField\").value;\n  getWeather(cityName);\n};\n\nconst openTab = i => {\n  document.getElementById(`tab${activeTab}`).classList.remove(`active-tab`);\n  let currentTab = document.getElementById(`tab${i + 1}`);\n  document.getElementById(`tab${i + 1}`).classList.add(`active-tab`);\n  activeTab = i + 1;\n  document.getElementById(`cityName`).innerText = results[0][0];\n  document.getElementById(`tabName`).innerText = results[i + 1][0];\n  document.getElementById(`result`).innerText = results[i + 1][1];\n  document.getElementById(`unit`).innerText = results[i + 1][2];\n};\n\nconst getWeather = cityName => {\n  console.log(cityName);\n  axios.get('https://api.openweathermap.org/data/2.5/weather?', {\n    params: {\n      q: cityName,\n      appid: APIkey\n    }\n  }).then(data => {\n    weather = data.data;\n    console.log(data.data);\n    console.log((weather.main.temp - 273.15).toFixed(0));\n    let city = weather.name;\n    let main = weather.weather[0].main;\n    let temp = (weather.main.temp - kelvin).toFixed(0);\n    let max_temp = (weather.main.temp_max - kelvin).toFixed(0);\n    let min_temp = (weather.main.temp_min - kelvin).toFixed(0);\n    let wind = weather.wind.speed;\n    let humidity = weather.main.humidity;\n    let sunrise = new Date(weather.sys.sunrise * 1000);\n    let sunset = new Date(weather.sys.sunset * 1000);\n    let pressure = weather.main.pressure;\n    let timezone = weather.timezone / 3600;\n\n    const getDate = d => `${d.getUTCHours() + timezone}:${d.getUTCMinutes() + timezone}`;\n\n    results = [[city], [main, `${temp}°`, `${max_temp}° / ${min_temp}°`], [`Wind`, wind, `m / s`], [`Humidity`, `${humidity}%`, ``], [`Sunrise | Sunset`, `${getDate(sunrise)} | ${getDate(sunset)}`, ``], [`Pressure`, pressure, `hPa`]];\n    openTab(0);\n    console.log(main);\n  }).catch(err => {\n    console.log(err);\n    errorMessage(err.message);\n  });\n};\n\nconst errorMessage = message => {\n  document.getElementById(`cityName`).innerText = ``;\n  document.getElementById(`result`).innerText = ``;\n  document.getElementById(`unit`).innerText = ``;\n  document.getElementById(`tabName`).innerText = message;\n};\n\nlet results = [[]];\nlet kelvin = 273.15;\nlet APIkey = \"d3fb6b0837add2d07e9d69ef97b85afd\";\nlet weather;\nlet activeTab = 1;\ndocument.getElementById(\"searchButton\").onclick = getCity;\nlet tabs = document.getElementsByClassName(\"tab\");\nArray.prototype.slice.call(tabs).map((tab, i) => tab.onclick = () => openTab(i));\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });