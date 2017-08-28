import { fromJS } from 'immutable';
import makeSelectHomePage, {
  makeSelectLocation,
  makeSelectConditions,
  makeSelectForecast,
  makeSelectResults,
} from '../selectors';

describe('makeSelectHomePageDomain', () => {
  const mocked = fromJS({
    homePage: {
      location: 'Denver - CO',
      conditions: {
        temp: 'some-temp',
      },
      forecast: {
        high: 'real high',
        low: 'very low',
      },
      results: [
        0: {
          name: 'some-place',
        },
      ],
    },
  });

  describe('makeSelectHomePage', () => {
    const selector = makeSelectHomePage();

    it('selects the whole domain', () => {
      const expected = {
        location: 'Denver - CO',
        conditions: {
          temp: 'some-temp',
        },
        forecast: {
          high: 'real high',
          low: 'very low',
        },
        results: [
          0: {
            name: 'some-place',
          },
        ],
      };

      expect(selector(mocked)).toEqual(expected);
    });
  });

  describe('makeSelectLocation', () => {
    const selector = makeSelectLocation();

    const expected = 'Denver - CO';
    expect(selector(mocked)).toEqual(expected);
  });

  describe('makeSelectConditions', () => {
    const selector = makeSelectConditions();

    const expected = fromJS({ temp: 'some-temp' });
    expect(selector(mocked)).toEqual(expected);
  });

  describe('makeSelectForecast', () => {
    const selector = makeSelectForecast();

    const expected = fromJS({ high: 'real high', low: 'very low' });
    expect(selector(mocked)).toEqual(expected);
  });

  describe('makeSelectResults', () => {
    const selector = makeSelectResults();

    const expected = fromJS([0: { name: 'some-place' }]);
    expect(selector(mocked)).toEqual(expected);
  });
});
