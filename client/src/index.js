// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, ContactCard, FooterCard } from './widgets';
import { PortfolioListing, ProjectDetails } from './components';

class Topbar extends Component {
  render() {
    return (
      <NavBar brand="Mancat">
        <NavBar.Link to="/">Sorter</NavBar.Link>
        <NavBar.Link to="/projects">Portfolio</NavBar.Link>
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

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Topbar />
        <Alert />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/projects/:id(\d+)" component={ProjectDetails} />
        <Route exact path="/projects" component={PortfolioListing} />
        <Footer />
      </div>
    </HashRouter>,
    root
  );
