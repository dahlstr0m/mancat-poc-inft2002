// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import { Topbar, BackToAdmin, Contact, Footer, AdminPage } from '../src/index';
import { NavBar } from '../src/components/Widgets';
import Button from '../src/components/Button';
import { Card, TitleCard } from '../src/components/Card';
import ManagementMenu from '../src/components/ManagementMenu';
import ProjectListingManagement from '../src/components/ProjectListingManagement';

// Tests
describe('Main components tests', () => {
  test('Topbar component draws correctly', () => {
    const wrapper = shallow(<Topbar />);

    expect(
      wrapper.contains(
        <NavBar brand="Mancat">
          <NavBar.Link to="/">Portfolio</NavBar.Link>
          <NavBar.Link to="/contact">Contact</NavBar.Link>
          <NavBar.Link to="/admin">Admin</NavBar.Link>
        </NavBar>
      )
    ).toBeTruthy();
  });

  test('BackToAdmin component draws correctly', () => {
    const wrapper = shallow(<BackToAdmin />);

    expect(
      wrapper.containsMatchingElement(
        <Card>
          <Button.Light>Back to admin</Button.Light>
        </Card>
      )
    ).toBeTruthy();
  });

  test('BackToAdmin component button takes user to admin page', (done) => {
    const wrapper = shallow(<BackToAdmin />);

    wrapper.find(Button.Light).simulate('click');

    setTimeout(() => {
      expect(location.hash).toEqual('#/admin/');
      done();
    });
  });

  test('Contact component draws correctly', () => {
    const wrapper = shallow(<Contact />);

    expect(
      wrapper.containsMatchingElement(
        <Card title="Contact">
          <ul>
            <li>+47 123 45 678</li>
            <li>fornavn@eposttjeneste.no</li>
            <li>Bosted 12, 3456 Sted</li>
          </ul>
        </Card>
      )
    ).toBeTruthy();
  });

  test('Footer component draws correctly', () => {
    const wrapper = shallow(<Footer />);

    expect(
      wrapper.containsMatchingElement(
        <Card textRight>Laget av Kevin, Hans Petter, Henrik, Bjarne og Mathias</Card>
      )
    ).toBeTruthy();
  });

  test('AdminPage component draws correctly', () => {
    const wrapper = shallow(<AdminPage />);

    expect(
      wrapper.containsMatchingElement(
        <>
          <TitleCard>Mancat admin</TitleCard>
          <ManagementMenu />
          <hr />
          <ProjectListingManagement />
        </>
      )
    ).toBeTruthy();
  });
});
