
import { fromJS } from 'immutable';
import homePageReducer from '../reducer';
import {
  addLocation,
  addConditions,
  addForecast,
  addQueryResults,
  clearQueryResults,
  clearConditions,
  clearForecast,
} from '../actions';

describe('homePageReducer', () => {
  it('returns the initial state', () => {
    expect(homePageReducer(undefined, {})).toEqual(fromJS({}));
  });

  it('adds a location and returns the state', () => {
    const location = '80303';
    const expected = fromJS({
      location,
    });

    expect(homePageReducer(undefined, addLocation(location))).toEqual(expected);
  });

  it('adds the conditions', () => {
    const conditions = fromJS({ temp: 'some-temp' });
    const expected = fromJS({
      conditions,
    });

    expect(homePageReducer(undefined, addConditions(conditions))).toEqual(expected);
  });

  it('add the forecast', () => {
    const forecast = fromJS({ high: 'some-temp' });
    const expected = fromJS({
      forecast,
    });

    expect(homePageReducer(undefined, addForecast(forecast))).toEqual(expected);
  });

  it('adds the query results', () => {
    const results = fromJS([{ location: 'denver' }, { location: 'boulder' }]);
    const expected = fromJS({
      results,
    });

    expect(homePageReducer(undefined, addQueryResults(results))).toEqual(expected);
  });

  it('clears the query results', () => {
    const results = fromJS([{ location: 'denver' }, { location: 'boulder' }]);

    const expected = fromJS({});
    expect(homePageReducer(fromJS({ results }), clearQueryResults())).toEqual(expected);
  });

  it('clears the conditions', () => {
    const conditions = fromJS({ temp: 'some-temp' });

    const expected = fromJS({});
    expect(homePageReducer(fromJS({ conditions }), clearConditions())).toEqual(expected);
  });

  it('clears the forecast', () => {
    const forecast = fromJS({ high: 'some-temp' });

    const expected = fromJS({});
    expect(homePageReducer(fromJS({ forecast }), clearForecast())).toEqual(expected);
  });
});
