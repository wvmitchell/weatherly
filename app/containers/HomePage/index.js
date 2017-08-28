/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { cookie } from 'cookie_js';
import {
  AppBar,
} from 'material-ui';
import LocationForm from './components/LocationForm';
import ForecastCard from './components/ForecastCard';
import TodaysForecast from './components/TodaysForecast';
import LocationResults from './components/LocationResults';
import makeSelectHomePage, {
  makeSelectLocation,
  makeSelectConditions,
  makeSelectForecast,
  makeSelectResults,
} from './selectors';
import {
  addLocation,
  submitLocation,
  clearQueryResults,
  clearConditions,
  clearForecast,
} from './actions';
import {
  HomePageWrapper,
} from './styledComponents';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    const location = cookie.get('location');
    this.props.dispatch(addLocation(location));
    this.props.submitLocation();
  }

  getTempExtremesString = (forecast, day) => {
    const high = forecast.simple.forecastday[day].high;
    const low = forecast.simple.forecastday[day].low;
    const highF = high.fahrenheit;
    const highC = high.celsius;
    const lowF = low.fahrenheit;
    const lowC = low.celsius;
    return `High: ${highF} F (${highC} C) / Low: ${lowF} F (${lowC} C)`;
  }

  searchForLocation = (event) => {
    event.preventDefault();
    this.props.clearConditions();
    this.props.clearForecast();
    this.props.submitLocation();
  }

  selectSuggestion = (suggestion) => {
    this.props.dispatch(addLocation(suggestion));
    this.props.clearQueryResults();
    this.props.clearConditions();
    this.props.clearForecast();
    this.props.submitLocation();
  }

  render() {
    if (this.props.location) {
      cookie.set({ location: this.props.location });
    }

    return (
      <HomePageWrapper>
        <Helmet
          title="Weatherly - Weather happens"
          meta={[
            { name: 'description', content: 'Find out what the weather is like in your area' },
          ]}
        />
        <AppBar title="Weatherly" />
        <LocationForm
          addLocation={this.props.addLocation}
          searchForLocation={this.searchForLocation}
        />
        { this.props.results &&
          <LocationResults
            results={this.props.results}
            selectSuggestion={this.selectSuggestion}
          />
        }
        { this.props.conditions && this.props.forecast &&
          <div>
            <TodaysForecast
              conditions={this.props.conditions}
              forecast={this.props.forecast}
              getTempExtremesString={this.getTempExtremesString}
            />
            <br />
            <h2>Here is what to expect for the next few days:</h2>
            <div className="three-day-forecast">
              <ForecastCard
                forecast={this.props.forecast}
                getTempExtremesString={this.getTempExtremesString}
                day={1}
              />
              <ForecastCard
                forecast={this.props.forecast}
                getTempExtremesString={this.getTempExtremesString}
                day={2}
              />
              <ForecastCard
                forecast={this.props.forecast}
                getTempExtremesString={this.getTempExtremesString}
                day={3}
              />
            </div>
          </div>
        }
      </HomePageWrapper>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.string,
  forecast: PropTypes.object,
  conditions: PropTypes.object,
  results: PropTypes.array,
  addLocation: PropTypes.func,
  submitLocation: PropTypes.func,
  clearForecast: PropTypes.func,
  clearConditions: PropTypes.func,
  clearQueryResults: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  HomePage: makeSelectHomePage(),
  location: makeSelectLocation(),
  conditions: makeSelectConditions(),
  forecast: makeSelectForecast(),
  results: makeSelectResults(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addLocation: (evt) => dispatch(addLocation(evt.target.value)),
    submitLocation: () => dispatch(submitLocation()),
    clearQueryResults: () => dispatch(clearQueryResults()),
    clearConditions: () => dispatch(clearConditions()),
    clearForecast: () => dispatch(clearForecast()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

