import {body} from "../setupJest";
import {displayIcon} from "../js/renderingFunctions";

describe('displayIcon function', () => {
  const getStyleById = (id) => window.getComputedStyle(document.getElementById(id));
  beforeEach(() => {
    document.body.innerHTML = body;
  });
  test('none', () => {
    const expected = 'none';
    displayIcon('none');
    expect(getStyleById('weatherIcon').display).toEqual(expected);
    expect(getStyleById('verticalLine').display).toEqual(expected);
  });
  test('block', () => {
    const expected = 'block';
    displayIcon();
    expect(getStyleById('weatherIcon').display).toEqual(expected);
    expect(getStyleById('verticalLine').display).toEqual(expected);
  });
});