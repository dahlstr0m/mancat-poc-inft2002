// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ManagePosters from '../../src/components/ManagePosters';
import Form from '../../src/components/Form';
import Button from '../../src/components/Button';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/poster-service');

// Tests
describe('ManagePosters component tests', () => {
  test('ManagePosters draws correctly', (done) => {
    const wrapper = shallow(<ManagePosters />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  test('Editing a poster is successful', (done) => {
    const wrapper = shallow(<ManagePosters />);
    wrapper.find(Form.Select).simulate('change', { currentTarget: { value: 1 } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Select value={1} />)).toEqual(true);

    // Wait for events to complete
    setTimeout(() => {
      wrapper
        .find(Form.Input)
        .at(0)
        .simulate('change', { currentTarget: { value: 'Poster desc' } });
      wrapper
        .find(Form.Input)
        .at(1)
        .simulate('change', { currentTarget: { value: 'Poster url' } });
      wrapper
        .find(Form.Input)
        .at(2)
        .simulate('change', { currentTarget: { value: 'Poster thumbnail' } });
      // $FlowExpectedError
      expect(wrapper.containsMatchingElement(<Form.Input value="Poster desc" />)).toEqual(true);
      // $FlowExpectedError
      expect(wrapper.containsMatchingElement(<Form.Input value="Poster url" />)).toEqual(true);
      // $FlowExpectedError
      expect(wrapper.containsMatchingElement(<Form.Input value="Poster thumbnail" />)).toEqual(
        true
      );

      wrapper.find(Button.Success).simulate('click');
    });

    setTimeout(() => {
      expect(location.hash).toEqual('#/admin/');
      done();
    });
  });

  test('Deleting a poster is successful', (done) => {
    const wrapper = shallow(<ManagePosters />);

    wrapper.find(Form.Select).simulate('change', { currentTarget: { value: 3 } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Select value={3} />)).toEqual(true);

    setTimeout(() => {
      wrapper.find(Button.Danger).simulate('click');
    });

    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');
      done();
    });
  });
});
