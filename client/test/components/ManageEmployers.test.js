// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ManageEmployers from '../../src/components/ManageEmployers';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/employer-service');

// Tests
describe('ManageEmployers component tests', () => {
  test('ManageEmployers draws correctly', (done) => {
    const wrapper = shallow(<ManageEmployers />);

    // Wait for events to complete
    setTimeout(() => {
      setTimeout(() => {
        expect(wrapper).toMatchSnapshot();

        done();
      });
    });
  });
});
