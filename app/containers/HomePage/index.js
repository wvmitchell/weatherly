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
import ForecastCard from 'components/ForecastCard';
import makeSelectHomePage, {
  makeSelectLocation,
  makeSelectConditions,
  makeSelectForecast,
} from './selectors';
import messages from './messages';
import {
  addLocation,
  submitLocation,
} from './actions';
import {
  HomePageWrapper,
} from './styledComponents';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  submitLocation = (event) => {
    event.preventDefault()
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
        <form onSubmit={ this.submitLocation }>
          <TextField
            label="Good question, let's see"
            onChange={ this.props.addLocation }
          />
          <Button raised color="accent" type="submit">
            Go
          </Button>
        </form>
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
                <Typography type="headline">
                  Currently
                </Typography>
                <Typography type="body1">
                  {this.props.conditions.weather}, {this.props.conditions.temperature_string}
                </Typography>
                <br />
                <Typography type="headline">
                  Today
                </Typography>
                <Typography type="body1">
                  {this.props.forecast.txt.forecastday[0].fcttext}
                </Typography>
                <br />
                <Typography type="headline">
                  Tonight
                </Typography>
                <Typography type="body1">
                  {this.props.forecast.txt.forecastday[1].fcttext}
                </Typography>
              </CardContent>
            </Card>
            <Typography type="display2" component="h2">
              <FormattedMessage {...messages.secondHeader} />
            </Typography>
            <ForecastCard
              forecast={this.props.forecast}
              day={2}
              night={3}
            />
            <ForecastCard
              forecast={this.props.forecast}
              day={4}
              night={5}
            />
            <ForecastCard
              forecast={this.props.forecast}
              day={6}
              night={7}
            />
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addLocation: (evt) => dispatch(addLocation(evt.target.value)),
    submitLocation: () => dispatch(submitLocation()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

