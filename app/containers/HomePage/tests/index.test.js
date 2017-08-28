import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from '../index';

describe('<HomePage />', () => {
  const dispatch = jest.fn();

  it('Expect it to match snapshot', () => {
    const renderedComponent = shallow(<HomePage dispatch={dispatch} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
