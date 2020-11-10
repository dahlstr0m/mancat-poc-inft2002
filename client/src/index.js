// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert } from './widgets';
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
    return <Card title="Contact">This is contactinfo</Card>;
  }
}

class Footer extends Component {
  render() {
    return <Card title="Footer"></Card>;
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
        <Route exact path="/project/:id(\d+)" component={ProjectDetails} />
        <Route path="/" component={Portfoliolisting} />
        <Footer />
      </div>
    </HashRouter>,
    root
  );
