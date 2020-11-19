// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ProtectedRoute from '../../src/components/ProtectedRoute';
import { Alert } from '../../src/components/Widgets';
import { AdminPage } from '../../src/index';

// Mocks
jest.mock('../../src/services/auth-service');

// Tests
describe('ProtectedRoute component tests', () => {
  test('ProtectedRoute draws correctly', (done) => {
    const wrapper = shallow(
      <ProtectedRoute
        exact
        path="/admin"
        component={() => (
          <div>
            <Alert />
            <AdminPage />
          </div>
        )}
      />
    );

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });
});
