// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
  alerts: { id: number, text: React.Node, type: string }[] = [];
  nextId = 0;

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
          <div key={alert.id} className={'alert alert-' + alert.type} role="alert">
            {alert.text}
            <button type="button" className="close" onClick={() => this.alerts.splice(i, 1)}>
              &times;
            </button>
          </div>
        ))}
      </>
    );
  }

  /**
   * Show success alert.
   */
  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      const instance = Alert.instance(); // Get rendered Alert component instance
      instance?.alerts.push({ id: instance.nextId++, text: text, type: 'success' });
    });
  }

  /**
   * Show info alert.
   */
  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      const instance = Alert.instance(); // Get rendered Alert component instance
      instance?.alerts.push({ id: instance.nextId++, text: text, type: 'info' });
    });
  }

  /**
   * Show warning alert.
   */
  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      const instance = Alert.instance(); // Get rendered Alert component instance
      instance?.alerts.push({ id: instance.nextId++, text: text, type: 'warning' });
    });
  }

  /**
   * Show danger alert.
   */
  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      const instance = Alert.instance(); // Get rendered Alert component instance
      instance?.alerts.push({ id: instance.nextId++, text: text, type: 'danger' });
    });
  }
}

/**
 * Renders a row using Bootstrap classes.
 */
export class Row extends Component<{ children?: React.Node }> {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes.
 */
export class Column extends Component<{ width?: number, right?: boolean, children?: React.Node }> {
  render() {
    return (
      <div
        className={
          'col' +
          (this.props.width ? '-' + this.props.width : '') +
          (this.props.right ? ' text-right' : '')
        }
      >
        {this.props.children}
      </div>
    );
  }
}

/**
 * Renders a NavBar link using Bootstrap styles.
 */
class NavBarLink extends Component<{ to: string, children?: React.Node }> {
  render() {
    return (
      <NavLink className="nav-link" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

/**
 * Renders a NavBar using Bootstrap classes.
 */
export class NavBar extends Component<{ brand?: React.Node, children?: React.Node }> {
  static Link = NavBarLink;

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
        {
          <NavLink className="navbar-brand" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
        }
        <ul className="navbar-nav">{this.props.children}</ul>
      </nav>
    );
  }
}
