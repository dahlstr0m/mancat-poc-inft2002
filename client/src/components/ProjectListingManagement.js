// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import { CardGrid, CardColumn, CardImage } from './Card';
import { Alert } from './Widgets';
import { projectService, posterService } from '../services';

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
                  img={
                    this.posters.find((poster) => poster.projectId === project.projectId)
                      ? this.posters.find((poster) => poster.projectId === project.projectId)
                          .thumbnailUrl
                      : ''
                  }
                  title={project.title}
                  imgAlt={'Missing thumbnail for ' + project.title}
                  imgWidth={210}
                  imgHeight={300}
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

  mounted() {
    projectService
      .getProjects()
      .then((projects) => (this.projects = projects))
      .catch((error: Error) => Alert.danger('Error getting projects: ' + error));

    posterService
      .getPosters()
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error getting posters: ' + error));
  }
}