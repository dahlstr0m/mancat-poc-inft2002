// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ManageEmployers from '../../src/components/ManageEmployers';
import Form from '../../src/components/Form';
import Button from '../../src/components/Button';
import { CardBody } from '../../src/components/Card';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/employer-service');

// Tests
describe('ManageEmployers component tests', () => {
  test('ManageEmployers draws correctly', (done) => {
    const wrapper = shallow(<ManageEmployers />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  test('ManageEmployers correctly sets location on create', (done) => {
    const wrapper = shallow(<ManageEmployers />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Employer 4' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Employer 4" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');
      done();
    });
  });

  test('ManageEmployers correctly sets location on edit', (done) => {
    const wrapper = shallow(<ManageEmployers />);

    wrapper.find(Form.Select).simulate('change', { currentTarget: { value: 2 } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Select value={2}></Form.Select>));
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<CardBody title="Employer 2"></CardBody>));

    wrapper
      .find(Form.Input)
      .at(1)
      .simulate('change', { currentTarget: { value: 'Employer 25' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Employer 25" />)).toEqual(true);

    wrapper.find(Button.Success).at(1).simulate('click');

    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');
      done();
    });
  });

  test('ManageEmployers correctly deletes employer if not used in projects.', (done) => {
    const wrapper = shallow(<ManageEmployers />);

    wrapper.find(Form.Select).simulate('change', { currentTarget: { value: 4 } });
    wrapper.update();
    wrapper.find(Button.Danger).simulate('click');

    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');
      done();
    });
  });
});
