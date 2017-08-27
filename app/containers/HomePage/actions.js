/*
 *
 * HomePage actions
 *
 */

import {
  ADD_LOCATION,
  SUBMIT_LOCATION,
  ADD_CONDITIONS,
  ADD_FORECAST,
  ADD_QUERY_RESULTS,
  CLEAR_QUERY_RESULTS,
  CLEAR_CONDITIONS,
  CLEAR_FORECAST,
} from './constants';

export function addLocation(location) {
  return {
    type: ADD_LOCATION,
    location,
  };
}

export function submitLocation() {
  return {
    type: SUBMIT_LOCATION,
  };
}

export function addConditions(conditions) {
  return {
    type: ADD_CONDITIONS,
    conditions,
  };
}

export function addForecast(forecast) {
  return {
    type: ADD_FORECAST,
    forecast,
  };
}

export function addQueryResults(results) {
  return {
    type: ADD_QUERY_RESULTS,
    results,
  };
}

export function clearQueryResults() {
  return {
    type: CLEAR_QUERY_RESULTS,
  }
}

export function clearConditions() {
  return {
    type: CLEAR_CONDITIONS,
  }
}

export function clearForecast() {
  return {
    type: CLEAR_FORECAST,
  }
}
