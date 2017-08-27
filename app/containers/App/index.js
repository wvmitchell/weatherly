/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { green, lightBlue, red } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: createPalette({
    primary: green,
    accent: {
      ...lightBlue,
    },
    error: red,
  }),
});

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {React.Children.toArray(this.props.children)}
        </div>
      </MuiThemeProvider>
    );
  }
}
