import React from 'react';
import { shallow } from 'enzyme';

import LocationResults from '../index';

describe('<LocationResults />', () => {
  it('matches the snapshot', () => {
    const renderedComponent = shallow(
      <LocationResults
        results={[]}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
