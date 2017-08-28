import React from 'react';
import { shallow } from 'enzyme';

import ForecastCard from '../index';

describe('<ForecastCard />', () => {
  it('should match the snapshot', () => {
    const mockForecast = {
      txt: {
        forecastday: [
          { icon: 'some-name', icon_url: 'some-path' },
        ],
      },
      simple: {
        forecastday: [
          {
            date: {
              weekday: 'sunday',
            },
          },
        ],
      },
    };
    const renderedComponent = shallow(
      <ForecastCard
        forecast={mockForecast}
        day={0}
        getTempExtremesString={jest.fn()}
      />
    );

    expect(renderedComponent).toMatchSnapshot();
  });
});
