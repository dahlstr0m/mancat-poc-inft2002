// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, ContactCard, FooterCard } from './widgets';
import { Portfoliolisting, ProjectDetails } from './components';

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

class Admin extends Component {
  render() {
    return (
      <Card title="Mancat admin">
        This is adminpage
        <NavBar brand="Rediger:">
          <NavBar.Link to="/">Prosjekt</NavBar.Link>
          <NavBar.Link to="/">Plakater</NavBar.Link>
          <NavBar.Link to="/">Portfolio</NavBar.Link>
          <NavBar.Link to="/">Visningsrekkefølge</NavBar.Link>
        </NavBar>
      </Card>
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
              <Portfoliolisting />
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
              <Footer />
            </div>
          )}
        />
        <Route //Project page
          exact
          path="/project/:id(\d+)"
          component={(props) => (
            <div>
              <Topbar />
              <Alert />
              <ProjectDetails pathid={props.match.params.id} />
              <Portfoliolisting />
              <Footer />
            </div>
          )}
        />
        <Route //Admin page
          exact
          path="/login"
          component={() => (
            <div>
              <Alert />
              <Admin />
              <Footer />
            </div>
          )}
        />
      </div>
    </HashRouter>,
    root
  );
