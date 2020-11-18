// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';

// Component imports
import ManageEmployers from './components/ManageEmployers';
import ManagementMenu from './components/ManagementMenu';
import PortfolioListing from './components/PortfolioListing';
import ProjectDetails from './components/ProjectDetails';
import ProjectListingManagement from './components/ProjectListingManagement';
import ProjectRanking from './components/ProjectRanking';
import NewProject from './components/NewProject';
import NewPoster from './components/NewPoster';
import ManageProject from './components/ManageProject';
import ManagePosters from './components/ManagePosters';
import ManageCategories from './components/ManageCategories';
import LoginPage from './components/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import Button from './components/Button';
import { Card, ContactCard, FooterCard, TitleCard, CardPlain } from './components/Card';
import { NavBar, Alert } from './components/Widgets';

import { authService } from './services/auth-service';
// Create and export history
import { createHashHistory } from 'history';
export const history = createHashHistory();

class Topbar extends Component {
  render() {
    return (
      <NavBar brand="Mancat">
        <NavBar.Link to="/">Sorter</NavBar.Link>
        <NavBar.Link to="/">Portfolio</NavBar.Link>
        <NavBar.Link to="/contact">Contact</NavBar.Link>
        <NavBar.Link to="/admin">Admin</NavBar.Link>
      </NavBar>
    );
  }
}

class BackToAdmin extends Component {
  render() {
    return (
      <CardPlain>
        <Button.Light onClick={() => history.push('/admin/')}>Back to admin</Button.Light>
      </CardPlain>
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
        <TitleCard img="https://portfolio.hpbastiansen.com/other/logo.png">Mancat admin</TitleCard>
        <ManagementMenu />
        <hr />
        <ProjectListingManagement />
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
        <Route // Main page
          exact
          path="/login"
          component={() => (
            <div>
              <LoginPage />
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
              <ProjectDetails pathId={props.match.params.id} />
              <MainPage />
              <Footer />
            </div>
          )}
        />
        <ProtectedRoute //Admin page
          exact
          path="/admin"
          component={() => (
            <div>
              <Alert />
              <AdminPage />
            </div>
          )}
        />
        <ProtectedRoute //New project
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
        <ProtectedRoute //Manage project
          exact
          path="/admin/projects/:id(\d+)"
          component={(props) => (
            <div>
              <BackToAdmin />
              <Alert />
              <ManageProject pathId={props.match.params.id} />
            </div>
          )}
        />

        <ProtectedRoute //Rank project
          exact
          path="/admin/ranking"
          component={() => (
            <div>
              <BackToAdmin />
              <Alert />
              <ProjectRanking />
            </div>
          )}
        />
        <ProtectedRoute //New poster
          exact
          path="/admin/posters/new"
          component={() => (
            <div>
              <BackToAdmin />
              <Alert />
              <NewPoster />
            </div>
          )}
        />
        <ProtectedRoute //Manage posters
          exact
          path="/admin/posters/manage"
          component={() => (
            <div>
              <BackToAdmin />
              <Alert />
              <ManagePosters />
            </div>
          )}
        />
        <ProtectedRoute
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
        <ProtectedRoute
          exact
          path="/admin/employers"
          component={() => (
            <div>
              <BackToAdmin />
              <Alert />
              <ManageEmployers />
            </div>
          )}
        />
      </div>
    </HashRouter>,
    root
  );
