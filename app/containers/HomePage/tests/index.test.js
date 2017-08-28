import React from 'react';
import { shallow, mount } from 'enzyme';

import { HomePage, mapDispatchToProps } from '../index';

describe('<HomePage />', () => {
  let dispatch = jest.fn();

  it('Expect it to match snapshot', () => {
    const renderedComponent = shallow(<HomePage dispatch={dispatch} />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('getTempExtremesString parses the forecast to produce the correct string', () => {
    const mockForecast = {
      simple: {
        forecastday: [
          {
            high: {
              fahrenheit: 88.2,
              celsius: 32.2,
            },
            low: {
              fahrenheit: 18.2,
              celsius: 2.2,
            },
          },
        ],
      },
    };
    const renderedComponent = mount(
      <HomePage
        dispatch={dispatch}
        submitLocation={jest.fn()}
      />
    );
    expect(renderedComponent.instance().getTempExtremesString(mockForecast, 0)).toEqual('High: 88.2 F (32.2 C) / Low: 18.2 F (2.2 C)');
  });

  it('searchForLocation submits the location search', () => {
    const clearConditions = jest.fn();
    const clearForecast = jest.fn();
    const submitLocation = jest.fn();
    const renderedComponent = mount(
      <HomePage
        dispatch={dispatch}
        clearConditions={clearConditions}
        clearForecast={clearForecast}
        submitLocation={submitLocation}
      />
    );
    renderedComponent.instance().searchForLocation({ preventDefault: jest.fn() });
    expect(clearConditions).toHaveBeenCalled();
    expect(clearForecast).toHaveBeenCalled();
    expect(submitLocation).toHaveBeenCalled();
  });

  it('selectSuggestion selects a location and updates the store', () => {
    const clearQueryResults = jest.fn();
    const clearConditions = jest.fn();
    const clearForecast = jest.fn();
    const submitLocation = jest.fn();
    const renderedComponent = mount(
      <HomePage
        dispatch={dispatch}
        clearQueryResults={clearQueryResults}
        clearConditions={clearConditions}
        clearForecast={clearForecast}
        submitLocation={submitLocation}
      />
    );
    renderedComponent.instance().selectSuggestion({ target: { value: 'some-location' } });
    expect(clearQueryResults).toHaveBeenCalled();
    expect(clearConditions).toHaveBeenCalled();
    expect(clearForecast).toHaveBeenCalled();
    expect(submitLocation).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    let result;

    beforeAll(() => {
      dispatch = jest.fn();
      result = mapDispatchToProps(dispatch);
    });

    it('injects dispatch', () => {
      expect(result.dispatch).toBeDefined();
    });

    it('defines addLocation fn', () => {
      result.addLocation({ target: { value: 'something' } });
      expect(dispatch).toHaveBeenCalled();
    });

    it('defines submitLocation fn', () => {
      result.submitLocation();
      expect(dispatch).toHaveBeenCalled();
    });

    it('defines clearQueryResults fn', () => {
      result.clearQueryResults();
      expect(dispatch).toHaveBeenCalled();
    });

    it('defines clearConditions fn', () => {
      result.clearConditions();
      expect(dispatch).toHaveBeenCalled();
    });

    it('defines clearForecast fn', () => {
      result.clearForecast();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
