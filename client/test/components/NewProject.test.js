// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import NewProject from '../../src/components/NewProject';
import Form from '../../src/components/Form';
import Button from '../../src/components/Button';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/category-service');
jest.mock('../../src/services/employer-service');

// Tests
describe('NewProject component tests', () => {
  test('NewProject draws correctly', (done) => {
    const wrapper = shallow(<NewProject />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  test('NewProject adds project correctly', (done) => {
    const wrapper = shallow(<NewProject />);

    wrapper
      .find(Form.Input)
      .at(0)
      .simulate('change', { currentTarget: { value: 'New title' } });
    wrapper.find(Form.Textarea).simulate('change', { currentTarget: { value: 'New desc' } });
    wrapper
      .find(Form.Input)
      .at(1)
      .simulate('change', { currentTarget: { value: 'New date' } });
    wrapper
      .find(Form.Select)
      .at(0)
      .simulate('change', { currentTarget: { value: 2 } });
    wrapper
      .find(Form.Select)
      .at(1)
      .simulate('change', { currentTarget: { value: 2 } });
    wrapper.find(Form.Checkbox).simulate('change', { currentTarget: { checked: true } });

    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="New title" />)).toEqual(true);
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Textarea value="New desc" />)).toEqual(true);
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="New date" />)).toEqual(true);
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Select value={2} />)).toEqual(true);
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Select value={2} />)).toEqual(true);
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Checkbox checked={true} />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');

    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');
      done();
    });
  });
});
