// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import Button from '../../src/components/Button';

// Tests
describe('Button components tests', () => {
  test('ButtonSuccess draws correctly', () => {
    const wrapper = shallow(<Button.Success small>Success</Button.Success>);

    expect(wrapper).toMatchSnapshot();
  });

  test('ButtonDanger draws correctly', () => {
    const wrapper = shallow(<Button.Danger small>Danger</Button.Danger>);

    expect(wrapper).toMatchSnapshot();
  });

  test('ButtonLight draws correctly', () => {
    const wrapper = shallow(<Button.Light small>Light</Button.Light>);

    expect(wrapper).toMatchSnapshot();
  });
});
