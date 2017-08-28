/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeEvery, call, put } from 'redux-saga/effects';
import API from 'utils/api';
import { watchSubmitLocation, submitLocation } from '../sagas';
import {
  SUBMIT_LOCATION,
  ADD_CONDITIONS,
} from '../constants';

describe('HomePage Sagas', () => {
  describe('watchSubmitLocation Saga', () => {
    const generator = watchSubmitLocation();

    it('calls submitLocation', () => {
      expect(generator.next().value).toEqual(takeEvery(SUBMIT_LOCATION, submitLocation));
    });

    it('is done', () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('submitLocation Saga', () => {
    const generator = submitLocation();
    const mockConditions = { current_observation: { temp: 'some-temp' } };
    const mockForecast = { forecast: { simpleforecast: 'some-forecast', txt: 'some-txt-forecast' } };

    it('selects the location', () => {
      expect(generator.next().value).toMatchSnapshot();
    });

    it('calls the API for forecast', () => {
      expect(generator.next('80205').value).toEqual(call(API.getForecast, '80205'));
    });

    it('calls the API for conditions', () => {
      expect(generator.next('80205').value).toEqual(call(API.getConditions, '80205'));
    });

    it('updates the state with the conditions', () => {
      expect(generator.next(mockConditions).value).toEqual(put({ type: ADD_CONDITIONS, conditions: mockConditions.current_observation }));
    });

    it('updates the state with the forecast', () => {
      expect(generator.next(mockForecast).value).toEqual(put({ type: ADD_CONDITIONS, forecast: mockForecast.current_observation }));
    });

    it('is done', () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});
