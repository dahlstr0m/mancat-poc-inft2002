// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import {
  Alert,
  Card,
  Row,
  Column,
  Form,
  Button,
  NavBar,
  PortfolioCard,
  ProjectCard,
  PosterCard,
} from './widgets';
import {
  projectService,
  categoryService,
  posterService,
  employerService,
  thumbnailService,
  type Project,
  type Category,
  type Poster,
  type Employer,
  type Thumbnail,
} from './portfolio-service';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/**
 * Renders portfolio list.
 */
export class PortfolioListing extends Component {
  projects: Project[] = [];
  posters: Poster[] = [];

  render() {
    return (
      <>
        <div>
          {this.projects.map((project) => {
            <div>{project.title}</div>;
          })}
        </div>
        {/* {this.projects
          .filter((project) => project.active === true) // Filter to ensure only Active projects to be displayed
          .sort((projectA, projectB) => projectA.ranking - projectB.ranking) // Sorting to display by asc ranking
          .map((
            project // Maping to display all left projects with PortfolioCard widget & fetching correct corresponding thumbnail for url attrib.
          ) => (
            <PortfolioCard
              projectid={project.projectId}
              title={project.title}
              link={'/project/' + project.projectId}
              imageurl={
                ''
              }
            >
              {'ingen data'}
            </PortfolioCard>
          ))} */}
      </>
    );
  }

  mounted() {
    projectService
      .getProjects()
      .then((projects) => (this.projects = projects))
      .then(() => console.log(this.projects))
      .catch((error: Error) => Alert.danger('Error getting projects: ' + error.message));

    /* posterService
      .getPosters()
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error getting posters: ' + error.message)); */
  }
}

/**
 * Renders project details.
 */
export class ProjectDetails extends Component<{ match: { params: { id: number } } }> {
  project: Project = {
    projectId: 0,
    title: '',
    description: '',
    date: '',
    categoryId: 0,
    employerId: 0,
    active: false,
    ranking: 0,
  };
  category: Category = { categoryId: 0, name: '' };
  employer: Employer = { employerId: 0, name: '' };
  posters: Poster[] = [];
  thumbnails: Thumbnail[] = [];

  render() {
    return (
      <>
        <ProjectCard
          projectId={this.project.projectId}
          title={this.project.title}
          description={this.project.description}
          date={this.project.date}
          category={this.category.name}
          employer={this.employer.name}
        >
          {this.posters.map((
            p // Maping to display all left projects with PosterCard widget & fetching correct corresponding thumbnail for url attrib.
          ) => (
            <PosterCard
              posterId={p.posterId}
              posterDescription={p.description}
              posterUrl={p.url}
              posterThumbnailUrl={this.thumbnails.map((t) => t.url)}
            >
              {'ingen data'}
            </PosterCard>
          ))}
        </ProjectCard>
      </>
    );
  }
  mounted() {
    /* projectService
      .getProject(this.props.match.params.id)
      .then((project) => (this.project = project))
      .catch((error: Error) => Alert.danger('Error getting project: ' + error.message));

    categoryService
      .getProjectCategory(this.props.match.params.id)
      .then((category) => (this.category = category))
      .catch((error: Error) => Alert.danger('Error getting category: ' + error.message));

    employerService
      .getProjectEmployer(this.props.match.params.id)
      .then((employer) => (this.employer = employer))
      .catch((error: Error) => Alert.danger('Error getting employer: ' + error.message));

    posterService
      .getProjectPosters(this.props.match.params.id)
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error getting posters: ' + error.message));

    thumbnailService
      .getProjectThumbnails(this.props.match.params.id)
      .then((thumbnails) => (this.thumbnails = thumbnails))
      .catch((error: Error) => Alert.danger('Error getting thumbnails: ' + error.message)); */
  }
}
