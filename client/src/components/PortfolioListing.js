// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import projectService, { type Project } from '../services/project-service';
import posterService, { type Poster } from '../services/poster-service';
import categoryService, { type Category } from '../services/category-service';
import { Card, CardGrid, CardColumn, CardImageEffect } from './Card';
import Form from './Form';
import { Alert } from './Widgets';

/**
 * Renders portfolio list.
 */
export default class PortfolioListing extends Component {
  projects: Project[] = [];
  posters: Poster[] = [];
  categories: Category[] = [];
  searchFilter: string = ''; // Is converted to RegExp object when used in string.match()
  selectedCategory: number = 0;

  render() {
    return (
      <>
        <Card>
          <Form.Label>Search:</Form.Label>
          <Form.Input
            type="text"
            value={this.searchFilter}
            onChange={(event) => (this.searchFilter = event.currentTarget.value)}
          />
          <Form.Label>Category:</Form.Label>
          <Form.Select
            value={this.selectedCategory}
            onChange={(event) => (this.selectedCategory = parseInt(event.currentTarget.value))}
          >
            <option key={0} value={0}>
              All
            </option>
            {this.categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </Form.Select>
        </Card>
        <CardGrid columns={1} columnsSm={2} columnsMd={3} columnsLg={4}>
          {this.projects
            .filter((project) => project.active === true) // Filter to ensure only Active projects will be displayed
            .filter(
              (project) =>
                this.selectedCategory != 0 ? project.categoryId == this.selectedCategory : true // Filter only selected category.
            )
            .filter((project) => project.title.match(new RegExp(`^.*${this.searchFilter}.*$`, 'i'))) // Filter out all projects with title not matching search string
            .sort((projectA, projectB) => projectA.ranking - projectB.ranking) // Sorting to display by asc ranking
            .map((
              project // Mapping to display all left projects with PortfolioCard widget & fetching correct corresponding thumbnail for url attrib.
            ) => (
              <CardColumn key={project.projectId}>
                <CardImageEffect
                  img={this.getPosterUrl(project)}
                  link={'/projects/' + project.projectId}
                  imgAlt={'Missing thumbnail for ' + project.title}
                  imgWidth={210}
                  imgHeight={300}
                ></CardImageEffect>
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

    categoryService
      .getCategories()
      .then((categories) => (this.categories = categories))
      .catch((error: Error) => Alert.danger('Error getting categories: ' + error.message));
  }
}
