import React from 'react';
import { shallow } from 'enzyme';

import TodaysForecast from '../index';

describe('<TodaysForecast />', () => {
  it('should match the snapshot', () => {
    const mockConditions = {
      display_location: {
        full: 'some-place',
      },
      weather: 'some-weather',
      temperature_string: 'some-temp',
    };
    const mockForecast = {
      simple: {
        forecastday: [
          { date: { pretty: 'a date' } },
        ],
      },
      txt: {
        forecastday: [
          { fcttext: 'description' },
          { fcttext: 'description' },
        ],
      },
    };
    const renderedComponent = shallow(
      <TodaysForecast
        conditions={mockConditions}
        forecast={mockForecast}
        getTempExtremesString={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
