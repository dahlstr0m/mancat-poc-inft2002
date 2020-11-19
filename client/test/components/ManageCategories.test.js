// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { history } from '../../src/index';

// Components
import ManageCategories from '../../src/components/ManageCategories';
import Form from '../../src/components/Form';
import Button from '../../src/components/Button';
import { CardBody } from '../../src/components/Card';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/category-service');

// Tests
describe('ManageCategories component tests', () => {
  test('ManageCategories draws correctly', (done) => {
    const wrapper = shallow(<ManageCategories />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  test('ManageCategories correctly sets location on create', (done) => {
    const wrapper = shallow(<ManageCategories />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Kategori 4' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Kategori 4" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');
      done();
    });
  });

  test('ManageCategories correctly sets location on edit', (done) => {
    const wrapper = shallow(<ManageCategories />);

    wrapper.find(Form.Select).simulate('change', { currentTarget: { value: 2 } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Select value={2}></Form.Select>));
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<CardBody title="Kategori 2"></CardBody>));

    wrapper
      .find(Form.Input)
      .at(1)
      .simulate('change', { currentTarget: { value: 'Category 2' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Category 2" />)).toEqual(true);

    wrapper.find(Button.Success).at(1).simulate('click');

    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');
      done();
    });
  });

  test('ManageCategories correctly deletes category if not used in projects.', (done) => {
    const wrapper = shallow(<ManageCategories />);

    wrapper.find(Form.Select).simulate('change', { currentTarget: { value: 4 } });
    wrapper.update();
    wrapper.find(Button.Danger).simulate('click');

    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin');
      done();
    });
  });
});
