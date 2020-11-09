// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

class Hello extends Component {
  render() {
    let who = 'World';
    return <div>Hello {who}</div>;
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <div>
      <Hello />
    </div>,
    root
  );
