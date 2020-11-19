// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import Button from './Button';

/**
 * Renders an information card using Bootstrap classes.
 */
export class Card extends Component<{
  title?: React.Node,
  children?: React.Node,
  textRight?: React.Node,
}> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className={'card-text' + (this.props.textRight ? ' text-right' : '')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export class TitleCard extends Component<{
  img?: React.Node,
  children?: React.Node,
  button?: React.Node,
  buttonOnClick?: () => mixed,
  buttonText?: React.Node,
}> {
  render() {
    return (
      <div className="card">
        <h1>
          <img
            src={this.props.img}
            alt={'-No img-'}
            width={140}
            height={140}
            style={{ marginRight: '15px' }}
          />
          {this.props.children}
        </h1>
        {this.props.button ? (
          <Button.Light onClick={this.props.buttonOnClick}>{this.props.buttonText}</Button.Light>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export class CardBody extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card-body">
        <h5 className="card-title">{this.props.title}</h5>
        <div className="card-text">{this.props.children}</div>
      </div>
    );
  }
}

export class CardImage extends Component<{
  img?: React.Node,
  imgAlt?: React.Node,
  title?: React.Node,
  button?: React.Node,
  buttonText?: React.Node,
  buttonOnClick: () => mixed,
  children?: React.Node,
}> {
  render() {
    return (
      <div className="card h-100">
        <div className="card-body">
          <img
            src={this.props.img}
            className="card-img-top rounded mx-auto d-block"
            alt={this.props.imgAlt}
          />
          <hr />
          <h5 className="card-title mx-auto d-block">{this.props.title}</h5>
          <div className="card-text text-center">{this.props.children}</div>
          <div className="text-center">
            {this.props.button ? (
              <Button.Danger onClick={this.props.buttonOnClick}>
                {this.props.buttonText}
              </Button.Danger>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export class CardImageEffect extends Component<{
  img?: React.Node,
  imgAlt?: React.Node,
  imgWidth?: number,
  imgHeight?: number,
  title?: React.Node,
  children?: React.Node,
  link?: string,
}> {
  render() {
    return (
      <div className="card hover-shadow">
        <div className="card-body">
          <NavLink to={this.props.link}>
            <img
              src={this.props.img}
              className="rounded mx-auto d-block"
              alt={this.props.imgAlt}
              width={this.props.imgWidth}
              height={this.props.imgHeight}
            />
          </NavLink>
        </div>
      </div>
    );
  }
}

export class CardColumn extends Component<{
  children?: React.Node,
}> {
  render() {
    return <div className="col mb-4">{this.props.children}</div>;
  }
}

export class CardGrid extends Component<{
  columns: number,
  columnsSm?: number,
  columnsMd?: number,
  columnsLg?: number,
  children?: React.Node,
}> {
  render() {
    return (
      <div
        className={
          'row row-cols-' +
          this.props.columns.toString() +
          (this.props.columnsSm ? ' row-cols-sm-' + this.props.columnsSm.toString() : '') +
          (this.props.columnsMd ? ' row-cols-md-' + this.props.columnsMd.toString() : '') +
          (this.props.columnsLg ? ' row-cols-lg-' + this.props.columnsLg.toString() : '')
        }
      >
        {this.props.children}
      </div>
    );
  }
}
