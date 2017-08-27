/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { cookie } from 'cookie_js'
import {
  AppBar, 
  Toolbar,
  Typography,
  TextField,
  Button,
  Avatar,
} from 'material-ui';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
} from 'material-ui/Card';
import ForecastCard from './components/ForecastCard';
import makeSelectHomePage, {
  makeSelectLocation,
  makeSelectConditions,
  makeSelectForecast,
  makeSelectResults,
} from './selectors';
import messages from './messages';
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
    const location = cookie.get('location')
    this.props.dispatch(addLocation(location))
    this.props.submitLocation()
  }

  searchForLocation = (event) => {
    event.preventDefault()
    this.props.clearConditions()
    this.props.clearForecast()
    this.props.submitLocation()
  }

  selectSuggestion = (event) => {
    this.props.dispatch(addLocation(event.target.value))
    this.props.clearQueryResults()
    this.props.clearConditions()
    this.props.clearForecast()
    this.props.submitLocation()
  }

  getTempExtremesString = (forecast, day) => {
    const high = forecast.simple.forecastday[day].high
    const low = forecast.simple.forecastday[day].low
    const highF = high.fahrenheit
    const highC = high.celsius
    const lowF = low.fahrenheit
    const lowC = low.celsius
    return `High: ${highF} F (${highC} C) / Low: ${lowF} F (${lowC} C)`
  }

  render() {
    if (this.props.location) {
      cookie.set({ location: this.props.location })
    }

    return (
      <HomePageWrapper>
        <Helmet
          title="Weatherly - Weather happens"
          meta={[
            { name: 'description', content: 'Find out what the weather is like in your area' },
          ]}
        />
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">Weatherly</Typography>
          </Toolbar>
        </AppBar>
        <Typography type="display3" component="h1">
          <FormattedMessage {...messages.header} />
        </Typography>
        <form onSubmit={ this.searchForLocation }>
          <TextField
            label="Good question, let's see"
            onChange={ this.props.addLocation }
          />
          <Button raised color="accent" type="submit">
            Go
          </Button>
        </form>
        { this.props.results &&
          <div>
            <Typography type="display2" component="h2">
              <FormattedMessage {...messages.notFound} />
            </Typography>
            <div className='location-options'>
              { this.props.results.map((result) => (
                  <Button
                    raised
                    color="primary"
                    onClick={this.selectSuggestion}
                    key={result.l}
                    value={result.l}
                  >
                    {`${result.city} ${result.state}, ${result.country_name}`}
                  </Button>
                ))
              }
            </div>
          </div>
        }
        { this.props.conditions && this.props.forecast &&
          <div>
            <Card className="todays-weather">
              <CardHeader
                avatar={
                  <Avatar 
                    alt={this.props.forecast.txt.forecastday[0].icon} 
                    src={this.props.forecast.txt.forecastday[0].icon_url} 
                  />
                }
                title={this.props.conditions.display_location.full}
                subheader={this.getTempExtremesString(this.props.forecast, 0)}
              />
              <CardContent>
                <Typography type="headline" component="h3">
                  Currently
                </Typography>
                <Typography type="body1">
                  {this.props.conditions.weather}, {this.props.conditions.temperature_string}
                </Typography>
                <br />
                <Typography type="headline" component="h3">
                  Today
                </Typography>
                <Typography type="body1">
                  {this.props.forecast.txt.forecastday[0].fcttext}
                </Typography>
                <br />
                <Typography type="headline" component="h3">
                  Tonight
                </Typography>
                <Typography type="body1">
                  {this.props.forecast.txt.forecastday[1].fcttext}
                </Typography>
              </CardContent>
            </Card>
            <br />
            <Typography type="display2" component="h2">
              <FormattedMessage {...messages.secondHeader} />
            </Typography>
            <div className='three-day-forecast'>
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
};

const mapStateToProps = createStructuredSelector({
  HomePage: makeSelectHomePage(),
  location: makeSelectLocation(),
  conditions: makeSelectConditions(),
  forecast: makeSelectForecast(),
  results: makeSelectResults(),
});

function mapDispatchToProps(dispatch) {
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

