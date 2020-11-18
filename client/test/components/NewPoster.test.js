// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import NewPoster from '../../src/components/NewPoster';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/poster-service');

// Tests
describe('NewPoster component tests', () => {
  test('NewPoster draws correctly', (done) => {
    const wrapper = shallow(<NewPoster />);

    // Wait for events to complete
    setTimeout(() => {
      setTimeout(() => {
        expect(wrapper).toMatchSnapshot();

        done();
      });
    });
  });
});
