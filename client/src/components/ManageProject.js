// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import Button from './Button';
import Form from './Form';
import { Card } from './Card';
import { Alert } from './Widgets';
import { projectService, categoryService, employerService } from '../services';

/**
 * Renders page to Mange Project
 */
export default class ManageProject extends Component<{ pathId: number }> {
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
        <Card title={'Project: ' + this.project.title}>
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
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </Form.Select>
          <br />
          <Form.Label> Employer:</Form.Label>
          <Form.Select
            value={this.project.employerId}
            onChange={(event) => (this.project.employerId = parseInt(event.currentTarget.value))}
          >
            {this.employers.map((employer) => (
              <option key={employer.employerId} value={employer.employerId}>
                {employer.employerName}
              </option>
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
                .updateProject(this.project)
                .then(() => {
                  history.push('/admin');
                  Alert.success('Project successfully saved');
                })
                .catch((error: Error) => Alert.danger('Error storing new project: ' + error))
            }
          >
            Save project
          </Button.Success>
          <Button.Danger
            onClick={() =>
              projectService
                .deleteProject(this.project.projectId)
                .then(() => {
                  history.push('/admin');
                  Alert.success('Project successfully deleted');
                })
                .catch((error: Error) => Alert.danger('Error deleting project: ' + error))
            }
          >
            Delete project
          </Button.Danger>
        </Card>
      </>
    );
  }
  mounted() {
    projectService
      .getProject(this.props.pathId)
      .then((project) => (this.project = project))
      .then(() => (this.project.projectDate = this.project.projectDate.substring(0, 10)))
      .catch((error: Error) => Alert.danger('Error getting project: ' + error));
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
