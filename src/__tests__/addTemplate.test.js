import {body} from "../setupJest";
import {addTemplate} from "../js/renderingFunctions";

describe('addTemplate function', () => {
  const data = {
    city: "Ufa",
    res: "1°",
    src: "13",
    tab: "Snow",
    unit: "1° / 1°"
  };
  beforeEach(() => {
    document.body.innerHTML = body;
  });
  test('empty', () => {
    const expected = '<div id="weatherIcon"><img src="img/weather_icons/temp.svg"></div><div id="verticalLine"></div><div id="tabContent"><div id="cityName"></div><div id="tabName"></div><div id="result"></div><div id="unit"></div></div>';
    addTemplate();
    expect(document.getElementById('middleBlock').innerHTML).toEqual(expected);
  });
  test('with data', () => {
    const expected = '<div id="weatherIcon"><img src="img/weather_icons/13.svg"></div><div id="verticalLine"></div><div id="tabContent"><div id="cityName">Ufa</div><div id="tabName">Snow</div><div id="result">1°</div><div id="unit">1° / 1°</div></div>'
    addTemplate(data);
    expect(document.getElementById('middleBlock').innerHTML).toEqual(expected);
  });
});