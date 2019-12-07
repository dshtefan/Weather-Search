import {body} from "../setupJest";
import {preparingErrorMessage} from "../js/renderingFunctions";

describe('preparingErrorMessage function', () => {
  const message = 'error';
  beforeEach(() => {
    document.body.innerHTML = body;
  });
  test('заблокированы вкладки', () => {
    preparingErrorMessage(message);
    Array.prototype.slice.call(
      document.getElementsByClassName('tab')).map(
      (tab) => expect(tab.onclick).toBeInstanceOf(Function)
    );
  });
});