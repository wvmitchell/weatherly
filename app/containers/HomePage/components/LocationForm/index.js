/**
*
* LocationForm
*
*/

import React from 'react';
import {
  TextField,
  RaisedButton,
} from 'material-ui';


class LocationForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>What is the weather like where you are?</h1>
        <form onSubmit={this.props.searchForLocation}>
          <TextField
            label="Good question, let's see"
            onChange={this.props.addLocation}
            id="homePage.locationInput"
          />
          <RaisedButton backgroundColor="accent" type="submit">
            Go
          </RaisedButton>
        </form>
      </div>
    );
  }
}

LocationForm.propTypes = {
  addLocation: React.PropTypes.func,
  searchForLocation: React.PropTypes.func,
};

export default LocationForm;
