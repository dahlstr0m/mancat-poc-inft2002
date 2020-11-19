// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import { Alert, Row, Column, NavBar } from '../../src/components/Widgets';

// Tests
describe('Widget components tests', () => {
  test('No alerts initially', () => {
    const wrapper = shallow(<Alert />);

    expect(wrapper.matchesElement(<></>)).toEqual(true);
  });

  test('Show alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      done();
    });
  });

  test('Close alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <>
            <div>
              test<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      wrapper.find('button.close').simulate('click');

      expect(wrapper.matchesElement(<></>)).toEqual(true);

      done();
    });
  });

  test('Show info and warning alerts', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.info('info');
    Alert.warning('warning');

    setTimeout(() => {
      expect(
        wrapper.containsMatchingElement(
          <>
            <div>
              info<button>&times;</button>
            </div>
            <div>
              warning<button>&times;</button>
            </div>
          </>
        )
      ).toEqual(true);

      done();
    });
  });
});
