// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import { Card } from './Card';
import Form from './Form';
import Button from './Button';
import { Alert } from './Widgets';
import projectService, { type Project } from '../services/project-service';
import categoryService, { type Category } from '../services/category-service';
import employerService, { type Employer } from '../services/employer-service';

/**
 * Renders page to add New Project
 */
export default class NewProject extends Component {
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
                .createProject(this.project)
                .then(() => {
                  history.push('/admin');
                  Alert.success('Project successfully created');
                })
                .catch((error: Error) =>
                  Alert.danger('Error storing new project: ' + error.message)
                )
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
      .catch((error: Error) => Alert.danger('Error getting categories: ' + error.message));

    employerService
      .getEmployers()
      .then((employers) => (this.employers = employers))
      .catch((error: Error) => Alert.danger('Error getting employers: ' + error.message));
  }
}
