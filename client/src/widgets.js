// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

/**
 * Renders a PortfolioCard for portfoliolisting
 */
export class PortfolioCard extends Component<{
  projectid?: React.Node,
  title?: React.Node,
  link?: React.Node,
  imageurl?: React.Node,
  children?: React.Node
}> {
  render() {
    const displaystyleDev ={
      width:'200px',
      height:'250px',
      backgroundColor: 'lightgrey',
      margin:'20px'
    }
    return (
      <>
       <div id={'PortfolioCard'+this.props.projectid} style={displaystyleDev}>
          <p>Prosjekttittel: {this.props.title}</p>
          <p>Link til prosjekt: <NavLink to={this.props.link}>HER</NavLink></p>
          <p>ImageUrl: {this.props.imageurl}</p>
          <p>Data(?): {this.props.children}</p>
          <p>Link til prosjektvisning: {this.props.children}</p>
        </div>
      </>
    );
  }
}

/**
 * Renders a ProjectCard for ProjectDetails
 */

export class ProjectCard extends Component<{
  projectid?: React.Node,
  title?: React.Node,
  projectdescription?: React.Node,
  projectdate?: React.Node,
  category?: React.Node,
  employer?: React.Node,
  children?: React.Node
}> {
  render() {
    const displaystyleDev2 ={
      width:'100%',
      height:'80%',
      backgroundColor: 'lightgreen',
      margin:'20px'
    }
    return (
      <>
       <div id={this.props.projectid} style={displaystyleDev2}>
          <p>Tittel: {this.props.title}</p>
          <p>Beskrivelse: {this.props.projectdescription}</p>
          <p>Dato: {this.props.projectdate}</p>
          <p>Kategori: {this.props.category}</p>
          <p>Employer: {this.props.employer}</p>
          <div>{this.props.children}</div>
        </div>
      </>
    );
  }
}

/**
 * Renders a PosterCard for ProjectCard
 */

export class PosterCard extends Component<{
  posterId?: React.Node,
  posterDescription?: React.Node,
  posterUrl?: React.Node,
  posterThumbnailUrl?: React.Node,
}> {
  render() {

    return (
      <>
       <div id={this.props.posterId}>
          <p>Poster: {this.props.posterId}</p>
          <p>Beskrivelse: {this.props.posterDescription}</p>
          <p>Url: {this.props.posterUrl}</p>
          <p>ThumbnailUrl: {this.props.posterThumbnailUrl}</p>
          <hr></hr>
        </div>
      </>
    );
  }
}

/**
 * Renders a ContactCard
 */
export class ContactCard extends Component<{
  title?: React.Node,
  children?: React.Node
}> {
  render() {
    const displaystyleDev ={
      width:'100%',
      height:'250px',
      backgroundColor: 'lightgreen',
      margin:'20px'
    }
    return (
      <>
       <div id={'Contact'} style={displaystyleDev}>
          <h1>{this.props.title}</h1>
          <div>{this.props.children}</div>
        </div>
      </>
    );
  }
}

/**
 * Renders a Footer
 */
export class FooterCard extends Component<{
  title?: React.Node,
  children?: React.Node
}> {
  render() {
    const displaystyleDev4 ={
      width:'100%',
      margin:'20px'
    }
    return (
      <>
       <div id={'Footer'} style={displaystyleDev4}>
          <h1>{this.props.title}</h1>
          <div>{this.props.children}</div>
        </div>
      </>
    );
  }
}

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
 * Renders an information card using Bootstrap classes.
 */
export class Card extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
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
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
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

/**
 * Renders a form label using Bootstrap styles.
 */
class FormLabel extends Component<{ children?: React.Node }> {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

/**
 * Renders a form input using Bootstrap styles.
 */
class FormInput extends Component<{
  type: string,
  value: React.Node,
  onChange: (SyntheticEvent<HTMLInputElement>) => mixed,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { type, value, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

/**
 * Renders a form textarea using Bootstrap styles.
 */
class FormTextarea extends React.Component<{
  value: React.Node,
  onChange: (SyntheticEvent<HTMLTextAreaElement>) => mixed,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, rows, cols
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, ...rest } = this.props;
    return <textarea {...rest} className="form-control" value={value} onChange={onChange} />;
  }
}

/**
 * Renders a form checkbox using Bootstrap styles.
 */
class FormCheckbox extends Component<{
  checked: React.Node,
  onChange: (SyntheticEvent<HTMLInputElement>) => mixed,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { checked, onChange, ...rest } = this.props;
    return <input {...rest} type="checkbox" checked={checked} onChange={onChange} />;
  }
}

/**
 * Renders a form select using Bootstrap styles.
 */
class FormSelect extends Component<{
  value: React.Node,
  onChange: (SyntheticEvent<HTMLSelectElement>) => mixed,
  children?: React.Node,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, size.
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, children, ...rest } = this.props;
    return (
      <select {...rest} className="custom-select" value={value} onChange={onChange}>
        {children}
      </select>
    );
  }
}

/**
 * Renders form components using Bootstrap styles.
 */
export class Form {
  static Label = FormLabel;
  static Input = FormInput;
  static Textarea = FormTextarea;
  static Checkbox = FormCheckbox;
  static Select = FormSelect;
}