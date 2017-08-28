/**
*
* ForecastCard
*
*/

import React from 'react';

import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui/Card';

class ForecastCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card className="upcoming-weather">
        <CardHeader
          title={this.props.forecast.simple.forecastday[this.props.day].date.weekday}
          subtitle={this.props.getTempExtremesString(this.props.forecast, this.props.day)}
          avatar={this.props.forecast.txt.forecastday[this.props.day * 2].icon_url}
        />
        <CardText>
          <h3>Conditions</h3>
          <p>{this.props.forecast.txt.forecastday[this.props.day * 2].fcttext}</p>
        </CardText>
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
