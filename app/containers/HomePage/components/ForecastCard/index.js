/**
*
* ForecastCard
*
*/

import React from 'react';

import Card, {
  CardHeader,
  CardContent,
} from 'material-ui/Card';
import {
  Avatar,
  Typography,
} from 'material-ui';

class ForecastCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card className="upcoming-weather">
        <CardHeader
          avatar={
            <Avatar
              alt={this.props.forecast.txt.forecastday[this.props.day * 2].icon}
              src={this.props.forecast.txt.forecastday[this.props.day * 2].icon_url}
            />
          }
          title={this.props.forecast.simple.forecastday[this.props.day].date.weekday}
          subheader={this.props.getTempExtremesString(this.props.forecast, this.props.day)}
        />
        <CardContent>
          <Typography type="headline" component="h3">
            Conditions
          </Typography>
          <Typography type="body1">
            {this.props.forecast.txt.forecastday[this.props.day * 2].fcttext}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

ForecastCard.propTypes = {
  forecast: React.PropTypes.object,
  getTempExtremesString: React.PropTypes.func,
  day: React.PropTypes.number,
};

export default ForecastCard;
