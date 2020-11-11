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
  CardImage,
  CardColumn,
  CardGrid,
  CardPlain,
  CardBody,
} from './widgets';
import {
  projectService,
  categoryService,
  posterService,
  employerService,
  type Project,
  type Category,
  type Poster,
  type Employer,
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
        {this.projects
          .filter((project) => project.active === true) // Filter to ensure only Active projects will be displayed
          .sort((projectA, projectB) => projectA.ranking - projectB.ranking) // Sorting to display by asc ranking
          .map((
            project // Mapping to display all left projects with PortfolioCard widget & fetching correct corresponding thumbnail for url attrib.
          ) => (
            <PortfolioCard
              projectId={project.projectId}
              title={project.title}
              link={'/projects/' + project.projectId}
              imageUrl={
                this.posters.find((poster) => poster.projectId === project.projectId)
                  ? this.posters.find((poster) => poster.projectId === project.projectId)
                      .thumbnailUrl
                  : ''
              }
            >
              {'ingen data'}
            </PortfolioCard>
          ))}
      </>
    );
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

/**
 * Renders project details.
 */
export class ProjectDetails extends Component<{ pathId: number }> {
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
          {this.posters.map((poster) => (
            <PosterCard
              posterId={poster.posterId}
              description={poster.description}
              url={poster.url}
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
      .getProject(this.pathId)
      .then((project) => (this.project = project))
      .catch((error: Error) => Alert.danger('Error getting project: ' + error.message));

    categoryService
      .getProjectCategory(this.pathId)
      .then((category) => (this.category = category))
      .catch((error: Error) => Alert.danger('Error getting category: ' + error.message));

    employerService
      .getProjectEmployer(this.pathId)
      .then((employer) => (this.employer = employer))
      .catch((error: Error) => Alert.danger('Error getting employer: ' + error.message));

    posterService
      .getProjectPosters(this.pathId)
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error getting posters: ' + error.message));
  }
}

export class OtherManagement extends Component {
  render() {
    return (
      <CardPlain>
        <CardBody title="Manage categories">
          <Button.Success onClick={() => history.push('/admin/categories')}>Manage</Button.Success>
        </CardBody>
        <hr />
        <CardBody title="Manage employers">
          <Button.Success>Manage</Button.Success>
        </CardBody>
        <hr />
        <CardBody title="Add new project">
          <Button.Success>Manage</Button.Success>
        </CardBody>
      </CardPlain>
    );
  }
}

export class ManageCategories extends Component {
  categories: Category[] = [];
  category: Category = { categoryId: 0, name: '' };

  render() {
    return (
      <CardPlain>
        {this.categories.map((category) => (
          <CardBody key={category.categoryId} title={category.name}>
            <Row>
              <Column width={2}>
                <Form.Label>Category name:</Form.Label>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  value={category.title}
                  onChange={(event) => (this.category.title = event.currentTarget.value)}
                />
              </Column>
            </Row>
            <Button.Success
              onClick={() =>
                categoryService
                  .updateCategory(this.category)
                  .then(() => history.push('/admin'))
                  .catch((error: Error) => Alert.danger('Error updating category: ' + error))
              }
            >
              Update category
            </Button.Success>
            <Button.Danger
              onClick={() =>
                categoryService
                  .deleteCategory(this.category.categoryId)
                  .then(() => history.push('/admin'))
                  .catch((error: Error) => Alert.danger('Error deleting category: ' + error))
              }
            >
              Delete category
            </Button.Danger>
          </CardBody>
        ))}
      </CardPlain>
    );
  }

  mounted() {
    categoryService
      .getCategories()
      .then((categories) => (this.categories = categories))
      .catch((error: Error) => Alert.danger('Error getting categories: ' + error));
  }
}

export class ProjectManagement extends Component {
  projects: Project[] = [];
  posters: Poster[] = [];

  render() {
    return (
      <>
        <h1>Project management</h1>
        <CardGrid columns={1} columnsSm={2} columnsMd={4}>
          {this.projects.map((project) => (
            <CardColumn>
              <CardImage
                img={
                  this.posters.find((poster) => poster.projectId === project.projectId)
                    ? this.posters.find((poster) => poster.projectId === project.projectId)
                        .thumbnailUrl
                    : ''
                }
                title={project.title}
                alt={project.title}
                buttonText={'Manage project'}
                buttonOnClick={() => history.push(`/admin/projects/${project.projectId}`)}
              >
                {project.description}
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
