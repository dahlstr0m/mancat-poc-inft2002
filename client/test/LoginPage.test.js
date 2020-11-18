// @flow

import * as React from 'react';
import LoginPage from '../src/components/LoginPage';
import { shallow } from 'enzyme';
import { authService } from './mocks/auth-service';

jest.mock('../src/services/auth-service', authService);

describe('LoginPage component tests', () => {
  test('LoginPage draws correctly', (done) => {
    const wrapper = shallow(<LoginPage />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });
});
