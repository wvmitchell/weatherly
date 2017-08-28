/**
*
* TodaysForecast
*
*/

import React from 'react';
import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui/Card';


class TodaysForecast extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card className="todays-weather">
        <CardHeader
          title={`${this.props.conditions.display_location.full} - ${this.props.forecast.simple.forecastday[0].date.pretty}`}
          subtitle={this.props.getTempExtremesString(this.props.forecast, 0)}
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
    );
  }
}

TodaysForecast.propTypes = {
  conditions: React.PropTypes.object,
  forecast: React.PropTypes.object,
  getTempExtremesString: React.PropTypes.func,
};

export default TodaysForecast;
