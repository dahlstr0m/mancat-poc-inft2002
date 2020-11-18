// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ManagementMenu from '../../src/components/ManagementMenu';
import Button from '../../src/components/Button';

// Tests
describe('ManagementMenu component tests', () => {
  test('ManagementMenu draws correctly', (done) => {
    const wrapper = shallow(<ManagementMenu />);

    // Wait for events to complete
    setTimeout(() => {
      setTimeout(() => {
        expect(wrapper).toMatchSnapshot();

        done();
      });
    });
  });

  test('New project button sets location correctly', (done) => {
    const wrapper = shallow(<ManagementMenu />);

    wrapper.find(Button.Success).at(0).simulate('click');
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin/projects/new');
      done();
    });
  });

  test('New poster button sets location correctly', (done) => {
    const wrapper = shallow(<ManagementMenu />);

    wrapper.find(Button.Success).at(1).simulate('click');
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin/posters/new');
      done();
    });
  });

  test('Edit posters button sets location correctly', (done) => {
    const wrapper = shallow(<ManagementMenu />);

    wrapper.find(Button.Danger).at(0).simulate('click');
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin/posters/manage');
      done();
    });
  });

  test('Manage employers button sets location correctly', (done) => {
    const wrapper = shallow(<ManagementMenu />);

    wrapper.find(Button.Danger).at(1).simulate('click');
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin/employers');
      done();
    });
  });

  test('Manage categories button sets location correctly', (done) => {
    const wrapper = shallow(<ManagementMenu />);

    wrapper.find(Button.Danger).at(2).simulate('click');
    setTimeout(() => {
      expect(location.hash).toEqual('#/admin/categories');
      done();
    });
  });
});
