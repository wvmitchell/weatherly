/**
*
* ForecastCard
*
*/

import React from 'react';

import Card, {
  CardHeader,
  CardMedia,
  CardContent,
} from 'material-ui/Card';
import messages from './messages';

class ForecastCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card className="todays-weather">
      </Card>
    );
  }
}

ForecastCard.propTypes = {
  forecast: React.PropTypes.object,
  day: React.PropTypes.number,
  night: React.PropTypes.number,
};

export default ForecastCard;
