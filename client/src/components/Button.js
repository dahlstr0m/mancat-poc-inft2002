// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

/**
 * Renders a success button using Bootstrap styles.
 */
class ButtonSuccess extends Component<{
  onClick: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-success' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a danger button using Bootstrap styles.
 */
class ButtonDanger extends Component<{
  onClick: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-danger' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a light button using Bootstrap styles.
 */
class ButtonLight extends Component<{
  onClick: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-light' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a button using Bootstrap styles.
 */
export default class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
}
