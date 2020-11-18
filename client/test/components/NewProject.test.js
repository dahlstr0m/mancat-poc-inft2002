// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import NewProject from '../../src/components/NewProject';

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
      setTimeout(() => {
        expect(wrapper).toMatchSnapshot();

        done();
      });
    });
  });
});
