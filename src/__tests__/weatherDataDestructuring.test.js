import {body} from "../setupJest";
import {weatherDataDestructuring} from '../js/weatherDataDestructuring'
describe('weatherDataDestructuring function', () => {
  const data = {
    "coord": { "lon": 139,"lat": 35},
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 289.92,
      "pressure": 1009,
      "humidity": 92,
      "temp_min": 288.71,
      "temp_max": 290.93
    },
    "wind": {
      "speed": 0.47,
      "deg": 107.538
    },
    "clouds": {
      "all": 2
    },
    "dt": 1560350192,
    "sys": {
      "type": 3,
      "id": 2019346,
      "message": 0.0065,
      "country": "JP",
      "sunrise": 1560281377,
      "sunset": 1560333478
    },
    "timezone": 32400,
    "id": 1851632,
    "name": "Shuzenji",
    "cod": 200
  };
  beforeEach(() => {
    document.body.innerHTML = body;
  });
  test('парсит в массив', () => {
    const expected = [
      [ 'Shuzenji' ],
      [ 'Clear', '17°', '18° / 16°', '01' ],
      [ 'Wind', 0.47, 'm / s', 'wind' ],
      [ 'Humidity', '92%', '', 'humidity' ],
      [ 'Sunrise | Sunset', '28:38 | 18:66', '', 'sunset' ],
      [ 'Pressure', 1009, 'hPa', 'pressure' ]
    ];
    expect(weatherDataDestructuring(data)).toEqual(expected);
  });
});