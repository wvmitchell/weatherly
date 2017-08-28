/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_LOCATION,
  ADD_CONDITIONS,
  ADD_FORECAST,
  ADD_QUERY_RESULTS,
  CLEAR_QUERY_RESULTS,
  CLEAR_CONDITIONS,
  CLEAR_FORECAST,
  API_FETCH_ERROR,
} from './constants';

const initialState = fromJS({});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LOCATION:
      return state.set('location', action.location);
    case ADD_CONDITIONS:
      return state.set('conditions', action.conditions);
    case ADD_FORECAST:
      return state.set('forecast', action.forecast);
    case ADD_QUERY_RESULTS:
      return state.set('results', action.results);
    case CLEAR_QUERY_RESULTS:
      return state.delete('results');
    case CLEAR_CONDITIONS:
      return state.delete('conditions');
    case CLEAR_FORECAST:
      return state.delete('forecast');
    case API_FETCH_ERROR:
      return state.set('fetchError', action.error);
    default:
      return state;
  }
}

export default homePageReducer;
