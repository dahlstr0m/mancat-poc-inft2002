// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Types
import { type Project } from '../../src/services/project-service';
import { type Poster } from '../../src/services/poster-service';

// Components
import ProjectListingManagement from '../../src/components/ProjectListingManagement';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/poster-service');

// Tester
describe('ProjectListingManagement component tests', () => {
  test('ProjectListingManagement draws correctly', (done) => {
    const wrapper = shallow(<ProjectListingManagement />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });
});
