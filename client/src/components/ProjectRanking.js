// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import projectService, { type Project } from '../services/project-service';
import posterService, { type Poster } from '../services/poster-service';
import { Card } from './Card';
import Form from './Form';
import { Alert } from './Widgets';
import Button from './Button';

/**
 * Renders ranking list
 */

export default class ProjectRanking extends Component {
  projects: Project[] = [];
  posters: Poster[] = [];
  rankIndex: Project[] = [];

  render() {
    return (
      <>
        <Card title="Change projects display-order">
          <Button.Success onClick={() => projectService.updateRanking(this.rankIndex)}>
            Save ranking
          </Button.Success>
          <Card>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Projects vieworder</th>
                  <th scope="col">Project</th>
                  <th scope="col">Status</th>
                  <th scope="col">Move</th>
                </tr>
              </thead>
              <tbody>
                {this.rankIndex.map((
                  project // Mapping to display all projects with Ranking.
                ) => (
                  <tr key={project.projectId}>
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
                    <td>
                      <Button.Light small onClick={() => this.rankUp(project)}>
                        Up
                      </Button.Light>{' '}
                      |{' '}
                      <Button.Light small onClick={() => this.rankDown(project)}>
                        Down
                      </Button.Light>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Card>
      </>
    );
  }

  rankUp(project: Project) {
    if (project.ranking <= 1) {
      Alert.danger('Can not rank project any higher.');
      return;
    }
    const projectIndex = project.ranking - 1;
    this.rankIndex[projectIndex].ranking -= 1;
    this.rankIndex[projectIndex - 1].ranking += 1;

    this.rankIndex = this.rankIndex.sort(
      (projectA, projectB) => projectA.ranking - projectB.ranking
    );
  }

  rankDown(project: Project) {
    if (project.ranking >= this.rankIndex.length) {
      Alert.danger('Can not rank project any lower.');
      return;
    }
    const projectIndex = project.ranking - 1;
    this.rankIndex[projectIndex].ranking += 1;
    this.rankIndex[projectIndex + 1].ranking -= 1;

    this.rankIndex = this.rankIndex.sort(
      (projectA, projectB) => projectA.ranking - projectB.ranking
    );
  }

  getPosterUrl(project: Project) {
    const poster = this.posters.find((poster) => poster.projectId === project.projectId);
    return poster ? poster.thumbnailUrl : '';
  }

  sortProjectRanking() {
    this.rankIndex = [];
    this.projects.forEach((project, index) => {
      const newProject = project;
      newProject.ranking = index + 1;
      this.rankIndex.push(newProject);
    });
  }

  mounted() {
    projectService
      .getProjects()
      .then((projects) => (this.projects = projects))
      .then(() =>
        this.projects.forEach((project) => {
          if (project.ranking === 0) {
            project.ranking = project.projectId;
          }
        })
      )
      .then(() => this.projects.sort((projectA, projectB) => projectA.ranking - projectB.ranking)) // Sorting to display by asc ranking
      .then(() => this.sortProjectRanking())
      .catch((error: Error) => Alert.danger('Error getting projects: ' + error.message));

    posterService
      .getPosters()
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error getting posters: ' + error.message));
  }
}
