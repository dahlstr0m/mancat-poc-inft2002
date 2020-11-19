// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import PortfolioListing from '../../src/components/PortfolioListing';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/poster-service');
jest.mock('../../src/services/category-service');

// Tests
describe('PortfolioListing component tests', () => {
  test('PortfolioListing draws correctly', (done) => {
    const wrapper = shallow(<PortfolioListing />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });
});
