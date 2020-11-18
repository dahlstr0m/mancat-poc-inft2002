// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ManagePosters from '../../src/components/ManagePosters';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/poster-service');

// Tests
describe('ManagePosters component tests', () => {
  test('ManagePosters draws correctly', (done) => {
    const wrapper = shallow(<ManagePosters />);

    // Wait for events to complete
    setTimeout(() => {
      setTimeout(() => {
        expect(wrapper).toMatchSnapshot();

        done();
      });
    });
  });
});
