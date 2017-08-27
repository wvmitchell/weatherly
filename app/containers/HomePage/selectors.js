import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = () => (state) => state.get('homePage');

/**
 * Other specific selectors
 */

const makeSelectLocation = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('location')
)

const makeSelectConditions = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('conditions')
)

const makeSelectForecast = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('forecast')
)

const makeSelectResults = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.get('results')
)

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectLocation,
  makeSelectConditions,
  makeSelectForecast,
  makeSelectResults,
};
