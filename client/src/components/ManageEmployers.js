// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { projectService, employerService, type Project, type Employer } from '../portfolio-service';
import Button from './Button';
import Form from './Form';
import { Card, CardBody, CardPlain } from './Card';
import { Row, Column, Alert } from './Widgets';
import { history } from '../index';

/**
 * Manage Employers page
 */
export default class ManageEmployers extends Component {
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
              <option key={employer.employerId} value={employer.employerId}>
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
