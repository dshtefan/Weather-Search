import {body} from "../setupJest";
import {getCity} from "../js/getCity";

describe('getCity function', () => {
  const dataSuccess = {
    data: {
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
    }};
  const dataError = {
    error: 'error'
  };
  let getWeather;
  let preparingData;
  let preparingErrorMessage;
  let event;

  beforeEach(() => {
    document.body.innerHTML = body;
    getWeather = jest.fn(() => (cityName) => new Promise((resolve, reject) => {
      if (cityName === dataSuccess.data.name)
        resolve(dataSuccess);
      else
        reject(dataError);
    }));
    preparingData = jest.fn(() => {});
    preparingErrorMessage = jest.fn(() => {});
    event = {
      preventDefault: jest.fn(() => {}),
      target: [{
        value: "Shuzenji"
      }]
    };
  });

  test('проверка вызова preventDefault', async () => {
    await getCity(event, getWeather, preparingData, preparingErrorMessage);
    expect(event.preventDefault.mock.calls.length).toBe(1);
  });
  test('проверка вызова getWeather', async () => {
    await getCity(event, getWeather(), preparingData, preparingErrorMessage);
    expect(getWeather.mock.calls.length).toBe(1);
  });
  test('проверка вызова preparingData', async () => {
    await getCity(event, getWeather, preparingData, preparingErrorMessage);
    expect(preparingData.mock.calls.length).toBe(1);
  });
  test('проверка вызова preparingErrorMessage', async () => {

    await getCity({...event, target: [{value: 'wdqwdqwd'}]}, getWeather(), preparingData, preparingErrorMessage);
    expect(preparingErrorMessage.mock.calls.length).toBe(1);
  });
});