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

/**
 * Renders All management menu .
 */
export class ManagementMenu extends Component {
  render() {
    return (
      <CardGrid>
        <CardColumn>
          <CardBody title="Add new project">
            <Button.Success onClick={() => history.push('/admin/categories')}>
              Manage
            </Button.Success>
          </CardBody>
        </CardColumn>
        <CardColumn>
          <CardBody title="Add new poster">
            <Button.Success>Manage</Button.Success>
          </CardBody>
        </CardColumn>
        <CardColumn>
          <CardBody title="Posters">
            <Button.Danger>Manage</Button.Danger>
          </CardBody>
        </CardColumn>
        <CardColumn>
          <CardBody title="Employers">
            <Button.Danger>Manage</Button.Danger>
          </CardBody>
        </CardColumn>

        <CardColumn>
          <CardBody title="Categories">
            <Button.Danger onClick={() => history.push('/admin/categories')}>Manage</Button.Danger>
          </CardBody>
        </CardColumn>
        <CardColumn>
          <CardBody title="Vieworder">
            <Button.Danger>Manage</Button.Danger>
          </CardBody>
        </CardColumn>
      </CardGrid>
    );
  }
}

/**
 * Renders manage categories page
 */
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

/**
 * Renders project listing in management
 */
export class ProjectListingManagement extends Component {
  projects: Project[] = [];
  posters: Poster[] = [];

  render() {
    return (
      <>
        <h1>Project management</h1>
        <CardGrid columns={1} columnsSm={2} columnsMd={4}>
          {this.projects
            .sort((projectA, projectB) => projectA.ranking - projectB.ranking) // Sorting to display by asc ranking
            .map((project) => (
              <CardColumn>
                <CardImage
                  img={
                    this.posters.find((poster) => poster.projectId === project.projectId)
                      ? this.posters.find((poster) => poster.projectId === project.projectId)
                          .thumbnailUrl
                      : ''
                  }
                  title={project.title}
                  imgAlt={'Missing thumbnail for ' + project.title}
                  buttonText={'Manage project'}
                  buttonOnClick={() => history.push(`/admin/projects/${project.projectId}`)}
                >
                  Description: {project.description}
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

/**
 * Renders back to admin button-module
 */
export class BackToAdmin extends Component {
  render() {
    return (
      <CardPlain>
        <Button.Light onClick={() => history.push('/admin/')}>Back to admin</Button.Light>
      </CardPlain>
    );
  }
}

/**
 * Renders page to add New Project
 */
export class NewProject extends Component<{ pathId: number }> {
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
