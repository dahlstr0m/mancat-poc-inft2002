// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import { CardGrid, CardColumn, CardImage } from './Card';
import { Alert } from './Widgets';
import {
  projectService,
  posterService,
  type Project,
  type Poster,
} from '../services/portfolio-service';

/**
 * Renders project listing in management
 */
export default class ProjectListingManagement extends Component {
  projects: Project[] = [];
  posters: Poster[] = [];

  render() {
    return (
      <>
        <h1>Project management</h1>
        <CardGrid columns={1} columnsSm={2} columnsMd={3} columnsLg={4}>
          {this.projects
            .sort((projectA, projectB) => projectA.ranking - projectB.ranking) // Sorting to display by asc ranking
            .map((project) => (
              <CardColumn key={project.projectId}>
                <CardImage
                  button
                  img={this.getPosterUrl(project)}
                  title={project.title}
                  imgAlt={'Missing thumbnail for ' + project.title}
                  buttonText={'Manage project'}
                  buttonOnClick={() => history.push(`/admin/projects/${project.projectId}`)}
                >
                  Description: {project.projectDescription}
                  <br />
                  Status: {project.active == true ? 'Active' : 'Disabled'}
                </CardImage>
              </CardColumn>
            ))}
        </CardGrid>
      </>
    );
  }

  getPosterUrl(project: Project) {
    const poster = this.posters.find((poster) => poster.projectId === project.projectId);
    return poster ? poster.thumbnailUrl : '';
  }

  mounted() {
    projectService
      .getProjects()
      .then((projects) => (this.projects = projects))
      .catch((error: Error) => Alert.danger('Error getting projects: ' + error.message));

    posterService
      .getPosters()
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error getting posters: ' + error.message));
  }
}
