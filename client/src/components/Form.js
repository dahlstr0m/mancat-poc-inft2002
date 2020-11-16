// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

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
  labeling: React.Node,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { labeling, checked, onChange, ...rest } = this.props;
    return (
      <div className="custom-control custom-checkbox">
        <input
          {...rest}
          type="checkbox"
          className="custom-control-input"
          id="customCheck"
          checked={checked}
          onChange={onChange}
        />
        <label className="custom-control-label" htmlFor="customCheck">
          {labeling}
        </label>
      </div>
    );
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
 * Renders a form date using Bootstrap styles.
 */
class FormDate extends Component<{
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
 * Renders form components using Bootstrap styles.
 */
export default class Form {
  static Label = FormLabel;
  static Input = FormInput;
  static Textarea = FormTextarea;
  static Checkbox = FormCheckbox;
  static Select = FormSelect;
  static Date = FormDate;
}
