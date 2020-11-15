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

/**
 * Renders All management menu .
 */
export class ManagementMenu extends Component {
  render() {
    return (
      <CardGrid>
        <CardColumn>
          <CardBody title="Projects">
            <Card title="Add new">
              <Button.Success onClick={() => history.push('/admin/projects/new')}>
                Create
              </Button.Success>
            </Card>
          </CardBody>
          <CardBody>
            <Card title="Rearrange order">
              <Button.Light onClick={() => Alert.info('This feature is not yet implemented!')}>
                Manage
              </Button.Light>
            </Card>
          </CardBody>
        </CardColumn>
        <CardColumn>
          <CardBody title="Poster">
            <Card title="Add new poster">
              <Button.Success onClick={() => history.push('/admin/posters/new')}>
                Create
              </Button.Success>
            </Card>
          </CardBody>
          <CardBody>
            <Card title="Existing posters">
              <Button.Danger onClick={() => history.push('/admin/posters/manage')}>
                Edit
              </Button.Danger>
            </Card>
          </CardBody>
        </CardColumn>
        <CardColumn>
          <CardBody title="Employers">
            <Card title="Manage employers">
              <Button.Danger onClick={() => history.push('/admin/employers')}>Edit</Button.Danger>
            </Card>
          </CardBody>
        </CardColumn>
        <CardColumn>
          <CardBody title="Categories">
            <Card title="Manage Categories">
              <Button.Danger onClick={() => history.push('/admin/categories')}>Edit</Button.Danger>
            </Card>
          </CardBody>
        </CardColumn>
      </CardGrid>
    );
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
        <CardGrid columns={1} columnsSm={2} columnsMd={3} columnsLg={4}>
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
export class NewProject extends Component {
  project: Project = {
    // Default values for project, updated on change in form
    projectId: 0,
    title: '',
    projectDescription: '',
    projectDate: '',
    categoryId: 1,
    employerId: 1,
    ranking: 0,
    active: false,
  };
  categories: Category[] = [];
  employers: Employer[] = [];

  render() {
    return (
      <>
        <p>
          Verdier
          <br />
          projectId: {this.project.projectId} <br />
          title: {this.project.title} <br />
          description: {this.project.projectDescription} <br />
          date: {this.project.projectDate} <br />
          category: {this.project.categoryId} <br />
          employer: {this.project.employerId} <br />
          active?:{' '}
          {this.project.active == true
            ? 'Aktivt'
            : this.project.active == false
            ? 'Deaktivert'
            : 'error'}{' '}
          <br />
        </p>
        <Card title="New Project">
          <Form.Label> Title:</Form.Label>
          <Form.Input
            type="text"
            value={this.project.title}
            onChange={(event) => (this.project.title = event.currentTarget.value)}
          ></Form.Input>
          <br />
          <Form.Label> Description:</Form.Label>
          <Form.Textarea
            value={this.project.projectDescription}
            onChange={(event) => (this.project.projectDescription = event.currentTarget.value)}
          ></Form.Textarea>
          <br />
          <Form.Label> Date:</Form.Label>
          <Form.Input
            type="date"
            value={this.project.projectDate.substring(0, 10)}
            onChange={(event) => (this.project.projectDate = event.currentTarget.value)}
          ></Form.Input>
          <br />
          <Form.Label> Category:</Form.Label>
          <Form.Select
            value={this.project.categoryId}
            onChange={(event) => (this.project.categoryId = parseInt(event.currentTarget.value))}
          >
            {this.categories.map((category) => (
              <option value={category.categoryId}>{category.categoryName}</option>
            ))}
          </Form.Select>
          <br />
          <Form.Label> Employer:</Form.Label>
          <Form.Select
            value={this.project.employerId}
            onChange={(event) => (this.project.employerId = parseInt(event.currentTarget.value))}
          >
            {this.employers.map((employer) => (
              <option value={employer.employerId}>{employer.employerName}</option>
            ))}
          </Form.Select>
          <br />
          <br />
          <Form.Checkbox
            checked={this.project.active}
            onChange={(event) => (this.project.active = event.currentTarget.checked)}
            labeling={'Do you want the project active from start?'}
          ></Form.Checkbox>
          <br />
          <Button.Success
            onClick={() =>
              projectService
                .createProject(this.project)
                .then(() => history.push('/admin'))
                .catch((error: Error) => Alert.danger('Error storing new project: ' + error))
            }
          >
            Create project
          </Button.Success>
        </Card>
      </>
    );
  }
  mounted() {
    categoryService
      .getCategories()
      .then((categories) => (this.categories = categories))
      .catch((error: Error) => Alert.danger('Error getting categories: ' + error));

    employerService
      .getEmployers()
      .then((employers) => (this.employers = employers))
      .catch((error: Error) => Alert.danger('Error getting employers: ' + error));
  }
}

/**
 * New Poster page
 */
export class NewPoster extends Component {
  poster: Poster = {
    // Default values for poster, updated on change in form
    posterId: 0,
    projectId: 1,
    posterDescription: '',
    posterUrl: '',
    thumbnailUrl: '',
  };
  projects: Project[] = [];
  posters: Poster[] = [];

  render() {
    return (
      <>
        <p>
          Verdier
          <br />
          posterId: {this.poster.posterId} <br />
          projectId: {this.poster.projectId} <br />
          posterDescription: {this.poster.posterDescription} <br />
          posterUrl: {this.poster.posterUrl} <br />
          thumbnailUrl: {this.poster.thumbnailUrl} <br />
        </p>

        <Card title="Add a new poster">
          <Form.Label> Connect to project:</Form.Label>
          <Form.Select
            value={this.poster.projectId}
            onChange={(event) => (this.poster.projectId = parseInt(event.currentTarget.value))}
          >
            {this.projects.map((project) => (
              <option value={project.projectId}>{project.title}</option>
            ))}
          </Form.Select>
          <br />
          <CardPlain>
            <Form.Label> Poster description:</Form.Label>
            <Form.Input
              type="text"
              value={this.poster.posterDescription}
              onChange={(event) => (this.poster.posterDescription = event.currentTarget.value)}
            ></Form.Input>
            <br />
            <Form.Label> Url to Poster:</Form.Label>
            <Form.Input
              type="text"
              value={this.poster.posterUrl}
              onChange={(event) => (this.poster.posterUrl = event.currentTarget.value)}
            ></Form.Input>
            <br />
            <Form.Label> Url to posters thumbnail:</Form.Label>
            <Form.Input
              type="text"
              value={this.poster.thumbnailUrl}
              onChange={(event) => (this.poster.thumbnailUrl = event.currentTarget.value)}
            ></Form.Input>
            <br />
          </CardPlain>
          <Button.Success
            onClick={() =>
              posterService
                .createPoster(this.poster)
                .then(() => {
                  history.push('/admin');
                  Alert.success('Poster added successfully');
                })
                .catch((error: Error) => Alert.danger('Error storing new poster: ' + error))
            }
          >
            Add new poster
          </Button.Success>
        </Card>
        <Card title="Theese posters allready exists for this project:">
          {this.posters
            .filter((p) => p.projectId == this.poster.projectId)
            .map((p) => (
              <img
                src={p.thumbnailUrl}
                alt={'Can not display poster with id ' + p.posterId}
                width="105"
                heigth="150"
              />
            ))}
        </Card>
      </>
    );
  }
  mounted() {
    projectService
      .getProjects()
      .then((projects) => (this.projects = projects))
      .catch((error: Error) => Alert.danger('Error getting employers: ' + error));
    posterService
      .getPosters()
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error fetching connected posters: ' + error));
  }
}

/**
 * Manage posters page
 */
export class ManagePosters extends Component {
  poster: Poster = {
    // Default values for poster, updated on change in form
    posterId: 1,
    projectId: 1,
    posterDescription: '',
    posterUrl: '',
    thumbnailUrl: '',
  };
  projects: Project[] = [];
  posters: Poster[] = [];

  render() {
    return (
      <>
        <Card title="Edit existing poster">
          <Form.Label> Choose project:</Form.Label>
          <Form.Select
            value={this.poster.projectId}
            onChange={(event) => (this.poster.projectId = event.currentTarget.value)}
          >
            {this.projects.map((project) => (
              <option value={project.projectId}>{project.title}</option>
            ))}
          </Form.Select>
          <Card title="Theese posters exists for this project. Klikk to edit:">
            {this.posters
              .filter((poster) => poster.projectId == this.poster.projectId)
              .map((poster) => (
                <Row>
                  <Column width={2}>
                    <img
                      src={poster.thumbnailUrl}
                      alt={'Can not display poster with id ' + poster.posterId}
                      width="105"
                      heigth="150"
                    />
                  </Column>
                  <Column>
                    <CardPlain>
                      <Form.Label> Poster description:</Form.Label>
                      <Form.Input
                        type="text"
                        value={poster.posterDescription}
                        onChange={(event) => (poster.posterDescription = event.currentTarget.value)}
                      ></Form.Input>
                      <br />
                      <Form.Label> Url to Poster:</Form.Label>
                      <Form.Input
                        type="text"
                        value={poster.posterUrl}
                        onChange={(event) => (poster.posterUrl = event.currentTarget.value)}
                      ></Form.Input>
                      <br />
                      <Form.Label> Url to posters thumbnail:</Form.Label>
                      <Form.Input
                        type="text"
                        value={poster.thumbnailUrl}
                        onChange={(event) => (poster.thumbnailUrl = event.currentTarget.value)}
                      ></Form.Input>
                      <br />
                      <Button.Success
                        onClick={() =>
                          posterService
                            .updatePoster(poster)
                            .then(() => {
                              history.push('/admin/posters/manage');
                              Alert.success('Poster successfully edited');
                            })
                            .catch((error: Error) =>
                              Alert.danger('Error storing edited poster: ' + error)
                            )
                        }
                      >
                        Save edit
                      </Button.Success>
                    </CardPlain>
                  </Column>
                </Row>
              ))}
          </Card>
          <br />
        </Card>
      </>
    );
  }
  mounted() {
    projectService
      .getProjects()
      .then((projects) => (this.projects = projects))
      .catch((error: Error) => Alert.danger('Error getting employers: ' + error));
    posterService
      .getPosters()
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error fetching connected posters: ' + error));
  }
}

/**
 * Manage categories page
 */
export class ManageCategories extends Component {
  categories: Category[] = [];
  categoryToUpdate: Category = { categoryId: 0, categoryName: 'default' };
  categoryToAdd: Category = { categoryId: 0, categoryName: '' };
  categoryUsed: number = 0;
  projects: Project[] = [];

  render() {
    return (
      <>
        <p>
          Verdier
          <br />
          New categoryId: {this.categoryToAdd.categoryId} <br />
          New categoryName: {this.categoryToAdd.categoryName} <br />
          Upd categoryId: {this.categoryToUpdate.categoryId} <br />
          Upd categoryName: {this.categoryToUpdate.categoryName} <br />
        </p>
        <Card title="Add a category">
          <CardPlain>
            <Row>
              <Column width={2}>
                <Form.Label>Set name of category to:</Form.Label>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  value={this.categoryToAdd.categoryName}
                  onChange={(event) =>
                    (this.categoryToAdd.categoryName = event.currentTarget.value)
                  }
                />
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Button.Success
                  onClick={() =>
                    categoryService
                      .createCategory(this.categoryToAdd)
                      .then(() => {
                        history.push('/admin');
                        Alert.success('Category successfully added');
                      })
                      .catch((error: Error) => Alert.danger('Error updating category: ' + error))
                  }
                >
                  Add category
                </Button.Success>
              </Column>
            </Row>
          </CardPlain>
        </Card>
        <Card title="Select a category to change">
          <Form.Select
            value={this.categoryToUpdate.categoryId}
            onChange={(event) => (
              (this.categoryToUpdate.categoryId = event.currentTarget.value),
              (this.categoryToUpdate.categoryName = this.categories.find(
                (category) => category.categoryId == event.currentTarget.value
              ).categoryName),
              (this.categoryUsed = this.projects.filter(
                (project) => project.categoryId == event.currentTarget.value
              ).length)
            )}
          >
            <option value="0">Select a category to change</option>
            {this.categories.map((category) => (
              <option value={category.categoryId}>
                {category.categoryId + ') ' + category.categoryName}
              </option>
            ))}
          </Form.Select>
          <br />
          {this.categoryToUpdate.categoryId >= 1 ? (
            <CardBody title={this.categoryToUpdate.categoryName}>
              <Row>
                <Column width={3}>
                  <Form.Label>
                    In use in {this.categoryUsed} projects. Change category name to:
                  </Form.Label>
                </Column>
                <Column>
                  <Form.Input
                    type="text"
                    value={this.categoryToUpdate.categoryName}
                    onChange={(event) =>
                      (this.categoryToUpdate.categoryName = event.currentTarget.value)
                    }
                  />
                </Column>
              </Row>
              <Row>
                <Column width={3}>
                  <Button.Success
                    onClick={() =>
                      categoryService
                        .updateCategory(this.categoryToUpdate)
                        .then(() => {
                          history.push('/admin/categories');
                          Alert.success('Category successfully updated');
                        })
                        .catch((error: Error) => Alert.danger('Error updating category: ' + error))
                    }
                  >
                    Update category
                  </Button.Success>
                  {this.categoryUsed >= 1 ? (
                    <Button.Light
                      onClick={() => {
                        Alert.info(
                          this.categoryToUpdate.categoryName + ' cannot be deleted while in use.'
                        );
                      }}
                    >
                      Delete category
                    </Button.Light>
                  ) : (
                    <Button.Danger
                      onClick={() =>
                        categoryService
                          .deleteCategory(this.categoryToUpdate.categoryId)
                          .then(() => {
                            history.push('/admin');
                            Alert.success('Category successfully deleted');
                          })
                          .catch((error: Error) =>
                            Alert.danger('Error deleting category: ' + error)
                          )
                      }
                    >
                      Delete category
                    </Button.Danger>
                  )}
                </Column>
              </Row>
            </CardBody>
          ) : (
            ''
          )}
        </Card>
      </>
    );
  }

  mounted() {
    categoryService
      .getCategories()
      .then((categories) => (this.categories = categories))
      .catch((error: Error) => Alert.danger('Error getting categories: ' + error));

    projectService
      .getProjects()
      .then((projects) => (this.projects = projects))
      .catch((error: Error) => Alert.danger('Error getting projects: ' + error.message));
  }
}

/**
 * Manage Employers page
 */
export class ManageEmployers extends Component {
  employers: Employer[] = [];
  employerToUpdate: Employer = { employerId: 0, employerName: 'default' };
  employerToAdd: Employer = { employerId: 0, employerName: '' };
  employerUsed: number = 0;
  projects: Project[] = [];

  render() {
    return (
      <>
        <p>
          Verdier
          <br />
          New employerId: {this.employerToAdd.employerId} <br />
          New employerName: {this.employerToAdd.employerName} <br />
          Upd employerId: {this.employerToUpdate.employerId} <br />
          Upd employerName: {this.employerToUpdate.employerName} <br />
        </p>
        <Card title="Add a employer">
          <CardPlain>
            <Row>
              <Column width={2}>
                <Form.Label>Set name of employer to:</Form.Label>
              </Column>
              <Column>
                <Form.Input
                  type="text"
                  value={this.employerToAdd.employerName}
                  onChange={(event) =>
                    (this.employerToAdd.employerName = event.currentTarget.value)
                  }
                />
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Button.Success
                  onClick={() =>
                    employerService
                      .createEmployers(this.employerToAdd)
                      .then(() => {
                        history.push('/admin');
                        Alert.success('Employer successfully added');
                      })
                      .catch((error: Error) => Alert.danger('Error updating employer: ' + error))
                  }
                >
                  Add employer
                </Button.Success>
              </Column>
            </Row>
          </CardPlain>
        </Card>
        <Card title="Select a employer to change">
          <Form.Select
            value={this.employerToUpdate.employerId}
            onChange={(event) => (
              (this.employerToUpdate.employerId = event.currentTarget.value),
              (this.employerToUpdate.employerName = this.employers.find(
                (employer) => employer.employerId == event.currentTarget.value
              ).employerName),
              (this.employerUsed = this.projects.filter(
                (project) => project.employerId == event.currentTarget.value
              ).length)
            )}
          >
            <option value="0">Select a employer to change</option>
            {this.employers.map((employer) => (
              <option value={employer.employerId}>
                {employer.employerId + ') ' + employer.employerName}
              </option>
            ))}
          </Form.Select>
          <br />
          {this.employerToUpdate.employerId >= 1 ? (
            <CardBody title={this.employerToUpdate.employerName}>
              <Row>
                <Column width={3}>
                  <Form.Label>
                    In use in {this.employerUsed} projects. Change employer name to:
                  </Form.Label>
                </Column>
                <Column>
                  <Form.Input
                    type="text"
                    value={this.employerToUpdate.employerName}
                    onChange={(event) =>
                      (this.employerToUpdate.employerName = event.currentTarget.value)
                    }
                  />
                </Column>
              </Row>
              <Row>
                <Column width={3}>
                  <Button.Success
                    onClick={() =>
                      employerService
                        .updateEmployer(this.employerToUpdate)
                        .then(() => {
                          history.push('/admin');
                          Alert.success('Employer successfully updated');
                        })
                        .catch((error: Error) => Alert.danger('Error updating employer: ' + error))
                    }
                  >
                    Update employer
                  </Button.Success>
                  {this.employerUsed >= 1 ? (
                    <Button.Light
                      onClick={() => {
                        Alert.info(
                          this.employerToUpdate.employerName + ' cannot be deleted while in use.'
                        );
                      }}
                    >
                      Delete employer
                    </Button.Light>
                  ) : (
                    <Button.Danger
                      onClick={() =>
                        employerService
                          .deleteEmployer(this.employerToUpdate.employerId)
                          .then(() => {
                            history.push('/admin');
                            Alert.success('Employer successfully deleted');
                          })
                          .catch((error: Error) =>
                            Alert.danger('Error deleting employer: ' + error)
                          )
                      }
                    >
                      Delete employer
                    </Button.Danger>
                  )}
                </Column>
              </Row>
            </CardBody>
          ) : (
            ''
          )}
        </Card>
      </>
    );
  }

  mounted() {
    employerService
      .getEmployers()
      .then((employers) => (this.employers = employers))
      .catch((error: Error) => Alert.danger('Error getting employers: ' + error));

    projectService
      .getProjects()
      .then((projects) => (this.projects = projects))
      .catch((error: Error) => Alert.danger('Error getting projects: ' + error.message));
  }
}
