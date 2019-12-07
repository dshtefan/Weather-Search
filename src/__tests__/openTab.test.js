import {body} from "../setupJest";
import {openTab} from "../js/openTab";

describe('openTab function', () => {
  const data = [
    [ 'Shuzenji' ],
    [ 'Clear', '17°', '18° / 16°', '01' ],
    [ 'Wind', 0.47, 'm / s', 'wind' ],
    [ 'Humidity', '92%', '', 'humidity' ],
    [ 'Sunrise | Sunset', '28:38 | 18:66', '', 'sunset' ],
    [ 'Pressure', 1009, 'hPa', 'pressure' ]
  ];
  beforeEach(() => {
    document.body.innerHTML = body;
  });
  test('открывает нужную вкладку', () => {
    openTab(1, data);
    expect(document.getElementById(`tab2`).classList.contains('active-tab')).toBeTruthy();
  });
});