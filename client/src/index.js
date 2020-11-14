// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, ContactCard, FooterCard, TitleCard, CardPlain } from './widgets';
import {
  ManagementMenu,
  ManageCategories,
  PortfolioListing,
  ProjectDetails,
  ProjectListingManagement,
  BackToAdmin,
  NewProject,
} from './components';

class Topbar extends Component {
  render() {
    return (
      <NavBar brand="Mancat">
        <NavBar.Link to="/">Sorter</NavBar.Link>
        <NavBar.Link to="/">Portfolio</NavBar.Link>
        <NavBar.Link to="/contact">Contact</NavBar.Link>
      </NavBar>
    );
  }
}

class Contact extends Component {
  render() {
    return <ContactCard title="Contact">This is contactinfo</ContactCard>;
  }
}

class Footer extends Component {
  render() {
    return (
      <FooterCard title="Footer">Laget av Kevin, Hans Petter, Henrik, Bjarne og Mathias</FooterCard>
    );
  }
}

class MainPage extends Component {
  render() {
    return (
      <>
        <PortfolioListing />
      </>
    );
  }
}

class AdminPage extends Component {
  render() {
    return (
      <>
        <CardPlain>
          <TitleCard img="mancatsrc">Mancat admin</TitleCard>
          <ManagementMenu />
          <hr />
          <ProjectListingManagement />
        </CardPlain>
      </>
    );
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Route // Main page
          exact
          path="/"
          component={() => (
            <div>
              <Topbar />
              <Alert />
              <MainPage />
              <Footer />
            </div>
          )}
        />
        <Route // Contact page
          exact
          path="/contact"
          component={() => (
            <div>
              <Topbar />
              <Alert />
              <Contact />
              <MainPage />
              <Footer />
            </div>
          )}
        />
        <Route //Project page
          exact
          path="/projects/:id(\d+)"
          component={(props) => (
            <div>
              <Topbar />
              <Alert />
              <ProjectDetails />
              <MainPage />
              <Footer />
            </div>
          )}
        />
        <Route //Admin page
          exact
          path="/admin"
          component={() => (
            <div>
              <Alert />
              <AdminPage />
            </div>
          )}
        />
        <Route //New project
          exact
          path="/admin/projects/new"
          component={() => (
            <div>
              <BackToAdmin />
              <Alert />
              <NewProject />
            </div>
          )}
        />
        <Route
          exact
          path="/admin/categories"
          component={() => (
            <div>
              <BackToAdmin />
              <Alert />
              <ManageCategories />
            </div>
          )}
        />
      </div>
    </HashRouter>,
    root
  );
