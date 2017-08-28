import { takeEvery, call, put, select } from 'redux-saga/effects';
import API from 'utils/api';
import {
  SUBMIT_LOCATION,
  ADD_CONDITIONS,
  ADD_FORECAST,
  ADD_QUERY_RESULTS,
  API_FETCH_ERROR,
} from './constants';
import {
  makeSelectLocation,
} from './selectors';

// Individual exports for testing
export function* watchSubmitLocation() {
  yield takeEvery(SUBMIT_LOCATION, submitLocation);
}

export function* submitLocation() {
  try {
    const location = yield select(makeSelectLocation());
    const forecast = yield call(API.getForecast, location);
    const conditions = yield call(API.getConditions, location);
    if (conditions.current_observation) {
      yield put({ type: ADD_CONDITIONS, conditions: conditions.current_observation });
      yield put({
        type: ADD_FORECAST,
        forecast: { simple: forecast.forecast.simpleforecast, txt: forecast.forecast.txt_forecast },
      });
    } else {
      yield put({ type: ADD_QUERY_RESULTS, results: conditions.response.results });
    }
  } catch (err) {
    yield put({ type: API_FETCH_ERROR, error: err.message });
  }
}

// All sagas to be loaded
export default [
  watchSubmitLocation,
];
