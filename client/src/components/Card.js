// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import Button from './Button';

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

export class CardPlain extends Component<{ children?: React.Node }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export class TitleCard extends Component<{ img?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card">
        <h1>
          <img src={this.props.img} alt={'-No img-'} width={140} height={140} />
          {'         ' + this.props.children}
        </h1>
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
  imgWidth?: number,
  imgHeight?: numer,
  title?: React.Node,
  buttonText?: React.Node,
  buttonOnClick?: React.Node,
  children?: React.Node,
}> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <img
            src={this.props.img}
            className="rounded mx-auto d-block"
            alt={this.props.imgAlt}
            width={this.props.imgWidth}
            height={this.props.imgHeight}
          />
          <hr />
          <h5 className="card-title mx-auto d-block">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
          <Button.Danger onClick={this.props.buttonOnClick}>{this.props.buttonText}</Button.Danger>
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
  columns: React.Node,
  columnsSm?: React.Node,
  columnsMd?: React.Node,
  columnsLg?: React.Node,
  children?: React.Node,
}> {
  render() {
    return (
      <div
        className={
          'row row-cols-' +
          this.props.columns +
          (this.props.columnsSm ? ' row-cols-sm-' + this.props.columnsSm : '') +
          (this.props.columnsMd ? ' row-cols-md-' + this.props.columnsMd : '') +
          (this.props.columnsLg ? ' row-cols-lg-' + this.props.columnsLg : '')
        }
      >
        {this.props.children}
      </div>
    );
  }
}

/**
 * Renders a PortfolioCard for portfoliolisting
 */
export class PortfolioCard extends Component<{
  projectid: number,
  title: React.Node,
  link: string,
  imageurl?: React.Node,
  children?: React.Node,
}> {
  render() {
    const displaystyleDev = {
      width: '200px',
      backgroundColor: 'lightgrey',
      margin: '20px',
    };
    return (
      <>
        <div id={'PortfolioCard' + this.props.projectId} style={displaystyleDev}>
          <p>Prosjekttittel: {this.props.title}</p>
          <p>
            Link til prosjekt: <NavLink to={this.props.link}>HER</NavLink>
          </p>
          <p>ImageUrl: {this.props.imageUrl}</p>
          <img src={this.props.imageUrl} alt={'Thumbnail kan ikke vises for ' + this.props.title} />
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
  projectId?: React.Node,
  title?: React.Node,
  description?: React.Node,
  date?: React.Node,
  category?: React.Node,
  employer?: React.Node,
  children?: React.Node,
}> {
  render() {
    const displaystyleDev2 = {
      width: '100%',
      height: '80%',
      backgroundColor: 'lightgreen',
      margin: '20px',
    };
    return (
      <>
        <div id={this.props.projectId} style={displaystyleDev2}>
          <p>Tittel: {this.props.title}</p>
          <p>Beskrivelse: {this.props.description}</p>
          <p>Dato: {this.props.date}</p>
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
  description?: React.Node,
  url?: React.Node,
  thumbnailUrl?: React.Node,
}> {
  render() {
    return (
      <>
        <div id={this.props.posterId}>
          <p>Poster: {this.props.posterId}</p>
          <img src={this.props.url} alt={''} />
          <p>Beskrivelse: {this.props.description}</p>
          <p>Url: {this.props.url}</p>
          <p>ThumbnailUrl: {this.props.thumbnailUrl}</p>
          <hr />
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
  children?: React.Node,
}> {
  render() {
    const displaystyleDev = {
      width: '100%',
      height: '250px',
      backgroundColor: 'lightgreen',
      margin: '20px',
    };
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
  children?: React.Node,
}> {
  render() {
    const displaystyleDev4 = {
      width: '100%',
      margin: '20px',
    };
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
