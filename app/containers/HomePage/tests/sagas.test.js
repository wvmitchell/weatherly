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
    const mockResponse = { current_observation: { temp: 'some-temp' } };

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
      expect(generator.next(mockResponse).value).toEqual(put({ type: ADD_CONDITIONS, conditions: mockResponse.current_observation }));
    });

    it('is done', () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});
