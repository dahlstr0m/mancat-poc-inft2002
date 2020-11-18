// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ManageProject from '../../src/components/ManageProject';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/poster-service');
jest.mock('../../src/services/category-service');
jest.mock('../../src/services/employer-service');

// Tests
describe('ManageProject component tests', () => {
  test('ManageProject draws correctly', (done) => {
    const wrapper = shallow(<ManageProject pathId={1} />);

    // Wait for events to complete
    setTimeout(() => {
      setTimeout(() => {
        expect(wrapper).toMatchSnapshot();

        done();
      });
    });
  });
});
