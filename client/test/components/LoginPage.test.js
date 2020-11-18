// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Types
import { type User } from '../../src/services/auth-service';

// Components
import Form from '../../src/components/Form';
import Button from '../../src/components/Button';
import LoginPage from '../../src/components/LoginPage';

// Mocks
jest.mock('../../src/services/auth-service');

// Tests
describe('LoginPage component tests', () => {
  test('LoginPage draws correctly', (done) => {
    const wrapper = shallow(<LoginPage />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  test('Login redirects correctly when authenticated', (done) => {
    const wrapper = shallow(<LoginPage />);

    wrapper
      .find(Form.Input)
      .at(0)
      .simulate('change', { currentTarget: { value: 'admin' } });
    wrapper
      .find(Form.Input)
      .at(1)
      .simulate('change', { currentTarget: { value: 'admin' } });

    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input type="text" value="admin" />)).toEqual(true);
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input type="password" value="admin" />)).toEqual(
      true
    );

    wrapper.find(Button.Success).simulate('click');

    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');

      done();
    });
  });
});
