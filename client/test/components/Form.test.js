// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import Form from '../../src/components/Form';

// Tests
describe('Form components tests', () => {
  test('Form.Label draws correctly', () => {
    const wrapper = shallow(<Form.Label>Label</Form.Label>);

    expect(wrapper).toMatchSnapshot();
  });

  test('Form.Input draws correctly', () => {
    const wrapper = shallow(<Form.Input type="text" value="value" />);

    expect(wrapper).toMatchSnapshot();
  });

  test('Form.Textarea draws correctly', () => {
    const wrapper = shallow(<Form.Textarea value="value" />);

    expect(wrapper).toMatchSnapshot();
  });

  test('Form.Checkbox draws correctly', () => {
    const wrapper = shallow(<Form.Checkbox checked labeling="Check-label" />);

    expect(wrapper).toMatchSnapshot();
  });

  test('Form.Select draws correctly', () => {
    const wrapper = shallow(<Form.Select value={2}></Form.Select>);

    expect(wrapper).toMatchSnapshot();
  });
});
