// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ManageCategories from '../../src/components/ManageCategories';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/category-service');

// Tests
describe('ManageCategories component tests', () => {
  test('ManageCategories draws correctly', (done) => {
    const wrapper = shallow(<ManageCategories />);

    // Wait for events to complete
    setTimeout(() => {
      setTimeout(() => {
        expect(wrapper).toMatchSnapshot();

        done();
      });
    });
  });
});
