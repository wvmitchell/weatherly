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
  TextField,
  RaisedButton,
} from 'material-ui';
import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import ForecastCard from './components/ForecastCard';
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
        <h1>What is the weather like where you are?</h1>
        <form onSubmit={this.searchForLocation}>
          <TextField
            label="Good question, let's see"
            onChange={this.props.addLocation}
            id="homePage.locationInput"
          />
          <RaisedButton backgroundColor="accent" type="submit">
            Go
          </RaisedButton>
        </form>
        { this.props.results &&
          <div>
            <h2>We found a few matches, is one of these what you are looking for?</h2>
            <div className="location-options">
              { this.props.results.map((result) => (
                <RaisedButton
                  backgroundColor="primary"
                  className="location-option"
                  onClick={() => this.selectSuggestion(result.l)}
                  key={result.l}
                >
                  {`${result.city} ${result.state}, ${result.country_name}`}
                </RaisedButton>)
                )
              }
            </div>
          </div>
        }
        { this.props.conditions && this.props.forecast &&
          <div>
            <Card className="todays-weather">
              <CardHeader
                title={this.props.conditions.display_location.full}
                subtitle={this.getTempExtremesString(this.props.forecast, 0)}
                avatar={this.props.forecast.txt.forecastday[0].icon_url}
              />
              <CardText>
                <h3>Currently</h3>
                <p>{this.props.conditions.weather}, {this.props.conditions.temperature_string}</p>
                <br />
                <h3>Today</h3>
                <p>{this.props.forecast.txt.forecastday[0].fcttext}</p>
                <br />
                <h3>Tonight</h3>
                <p>{this.props.forecast.txt.forecastday[1].fcttext}</p>
              </CardText>
            </Card>
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

