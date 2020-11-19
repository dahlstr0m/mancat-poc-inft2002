// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import NewPoster from '../../src/components/NewPoster';
import Form from '../../src/components/Form';
import Button from '../../src/components/Button';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/poster-service');

// Tests
describe('NewPoster component tests', () => {
  test('NewPoster draws correctly', (done) => {
    const wrapper = shallow(<NewPoster />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  test('NewPoster adds poster correctly', (done) => {
    const wrapper = shallow(<NewPoster />);

    wrapper.find(Form.Select).simulate('change', { currentTarget: { value: 2 } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Select value={2} />)).toEqual(true);

    wrapper
      .find(Form.Input)
      .at(0)
      .simulate('change', { currentTarget: { value: 'Description' } });
    wrapper
      .find(Form.Input)
      .at(1)
      .simulate('change', { currentTarget: { value: 'URL' } });
    wrapper
      .find(Form.Input)
      .at(2)
      .simulate('change', { currentTarget: { value: 'Thumb URL' } });

    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Description" />)).toEqual(true);
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="URL" />)).toEqual(true);
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Thumb URL" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');

    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');
      done();
    });
  });
});
