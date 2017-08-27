
import {
  addLocation,
  submitLocation,
  addConditions,
  addForecast,
  addQueryResults,
} from '../actions';
import {
  ADD_LOCATION,
  SUBMIT_LOCATION,
  ADD_CONDITIONS,
  ADD_FORECAST,
  ADD_QUERY_RESULTS,
} from '../constants';

describe('HomePage actions', () => {
  describe('addLocation Action', () => {
    it('has a constant', () => {
      expect(ADD_LOCATION).toBeDefined();
    })

    it('has a type of ADD_LOCATION', () => {
      const location = '80303'
      const expected = {
        type: ADD_LOCATION,
        location,
      };
      expect(addLocation(location)).toEqual(expected);
    });
  });

  describe('submitLocation Action', () => {
    it('has a constant', () => {
      expect(SUBMIT_LOCATION).toBeDefined();
    })

    it('has a type of SUBMIT_LOCATION', () => {
      const expected = {
        type: SUBMIT_LOCATION,
      }
      expect(submitLocation()).toEqual(expected)
    })
  });

  describe('addForecast Action', () => {
    it('has a constant', () => {
      expect(ADD_FORECAST).toBeDefined();
    })

    it('has a type of ADD_FORECAST', () => {
      const forecast = { high: 'some-temp' }
      const expected = {
        type: ADD_FORECAST,
        forecast,
      }
      expect(addForecast(forecast)).toEqual(expected)
    })
  });

  describe('addConditions Action', () => {
    it('has a constant', () => {
      expect(ADD_CONDITIONS).toBeDefined();
    })

    it('has a type of ADD_CONDITIONS', () => {
      const conditions = { temp: 'some-temp' }
      const expected = {
        type: ADD_CONDITIONS,
        conditions,
      }
      expect(addConditions(conditions)).toEqual(expected)
    })
  });

  describe('addQueryResults Action', () => {
    it('has a constant', () => {
      expect(ADD_QUERY_RESULTS).toBeDefined()
    })

    it('has a type of ADD_QUERY_RESULTS', () => {
      const results = [{
        location: 'denver',
      }, {
        location: 'boulder',
      }]
      const expected = {
        type: ADD_QUERY_RESULTS,
        results,
      }

      expect(addQueryResults(results)).toEqual(expected)
    })
  })
});
