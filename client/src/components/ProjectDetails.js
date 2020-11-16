// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ProjectCard, PosterCard } from './Card';
import { Alert } from './Widgets';
import {
  projectService,
  posterService,
  categoryService,
  employerService,
} from '../portfolio-service';

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
        <ProjectCard
          projectId={this.project.projectId}
          title={this.project.title}
          description={this.project.projectDescription}
          date={this.project.projectDate}
          category={this.category.categoryName}
          employer={this.employer.employerName}
        >
          {this.posters.map((poster) => (
            <PosterCard
              key={poster.posterId}
              posterId={poster.posterId}
              description={poster.posterDescription}
              url={poster.posterUrl}
              thumbnailUrl={poster.thumbnailUrl}
            >
              {'ingen data'}
            </PosterCard>
          ))}
        </ProjectCard>
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
