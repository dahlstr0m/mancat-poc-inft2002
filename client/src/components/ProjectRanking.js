// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import projectService, { type Project } from '../services/project-service';
import posterService, { type Poster } from '../services/poster-service';
import { PortfolioCard, Card } from './Card';
import Form from './Form';
import { Alert } from './Widgets';

/**
 * Renders ranking list
 */

export default class ProjectRanking extends Component {
  projects: Project[] = [];
  posters: Poster[] = [];

  render() {
    return (
      <>
        <Card title="Change projects display-order">
          <Card>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Projects vieworder</th>
                  <th scope="col">Project</th>
                  <th scope="col">Status</th>
                  <th scope="col">Move</th>
                </tr>
              </thead>
              <tbody>
                {this.projects
                  .sort((projectA, projectB) => projectB.ranking - projectA.ranking) // Sorting to display by asc ranking
                  .map((
                    project // Mapping to display all projects with Ranking.
                  ) => (
                    <tr>
                      <th scope="row">{'#' + project.ranking}</th>

                      <td>
                        <span>
                          <img
                            src={this.getPosterUrl(project)}
                            alt="No thumb"
                            width="53"
                            height="75"
                          />
                        </span>
                        <span>{' ' + project.title}</span>
                      </td>
                      <td>{project.active === true ? 'Active' : 'Disabled'}</td>
                      <td>Up | Down</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Card>
        </Card>
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
