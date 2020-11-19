// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ProjectDetails from '../../src/components/ProjectDetails';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/poster-service');
jest.mock('../../src/services/category-service');
jest.mock('../../src/services/employer-service');

// Tests
describe('ProjectDetails component tests', () => {
  test('ProjectDetails draws correctly', (done) => {
    const wrapper = shallow(<ProjectDetails pathId={1} />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });
});
