// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, CardImage, CardGrid, CardColumn } from './Card';
import { Alert } from './Widgets';
import projectService, { type Project } from '../services/project-service';
import posterService, { type Poster } from '../services/poster-service';
import categoryService, { type Category } from '../services/category-service';
import employerService, { type Employer } from '../services/employer-service';

/**
 * Renders project details.
 */
export default class ProjectDetails extends Component<{ pathId: number }> {
  project: Project = {
    projectId: 0,
    title: '',
    projectDescription: '',
    projectDate: '',
    categoryId: 0,
    employerId: 0,
    active: false,
    ranking: 0,
  };
  category: Category = { categoryId: 0, categoryName: '' };
  employer: Employer = { employerId: 0, employerName: '' };
  posters: Poster[] = [];

  render() {
    return (
      <>
        <Card title={this.project.title}>
          <hr />
          <p>{this.project.projectDescription}</p>
          <hr />
          <p>Kategori: {this.category.categoryName}</p>
          <p>Oppdragsgiver: {this.employer.employerName}</p>
          <p>Prosjektdato: {new Date(this.project.projectDate).toLocaleDateString()}</p>
        </Card>
        <CardGrid columns={1} columnsSm={2}>
          {this.posters.map((poster) => (
            <CardColumn key={poster.posterId}>
              <CardImage img={poster.posterUrl}>
                <p>{poster.posterDescription}</p>
              </CardImage>
            </CardColumn>
          ))}
        </CardGrid>
      </>
    );
  }
  mounted() {
    projectService
      .getProject(this.props.pathId)
      .then((project) => (this.project = project))
      .catch((error: Error) => Alert.danger('Error getting project: ' + error.message));

    categoryService
      .getProjectCategory(this.props.pathId)
      .then((category) => (this.category = category))
      .catch((error: Error) => Alert.danger('Error getting category: ' + error.message));

    employerService
      .getProjectEmployer(this.props.pathId)
      .then((employer) => (this.employer = employer))
      .catch((error: Error) => Alert.danger('Error getting employer: ' + error.message));

    posterService
      .getProjectPosters(this.props.pathId)
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error getting posters: ' + error.message));
  }
}
