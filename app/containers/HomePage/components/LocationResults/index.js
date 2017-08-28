/**
*
* LocationResults
*
*/

import React from 'react';
import {
  RaisedButton,
} from 'material-ui';


class LocationResults extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h2>We found a few matches, is one of these what you are looking for?</h2>
        <div className="location-options">
          { this.props.results.map((result) => (
            <RaisedButton
              backgroundColor="primary"
              className="location-option"
              onClick={() => this.props.selectSuggestion(result.l)}
              key={result.l}
            >
              {`${result.city} ${result.state}, ${result.country_name}`}
            </RaisedButton>)
            )
          }
        </div>
      </div>
    );
  }
}

LocationResults.propTypes = {
  results: React.PropTypes.array,
  selectSuggestion: React.PropTypes.func,
};

export default LocationResults;
