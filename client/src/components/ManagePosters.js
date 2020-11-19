// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import Button from './Button';
import Form from './Form';
import { Card } from './Card';
import { Row, Column, Alert } from './Widgets';
import projectService, { type Project } from '../services/project-service';
import posterService, { type Poster } from '../services/poster-service';

/**
 * Manage posters page
 */
export default class ManagePosters extends Component {
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
            onChange={(event) => (this.poster.projectId = parseInt(event.currentTarget.value))}
          >
            {this.projects.map((project) => (
              <option key={project.projectId} value={project.projectId}>
                {project.title}
              </option>
            ))}
          </Form.Select>
          <Card title="These posters exists for this project. Click to edit:">
            {this.posters
              .filter((poster) => poster.projectId == this.poster.projectId)
              .map((poster) => (
                <Row key={poster.posterId}>
                  <Column width={2}>
                    <img
                      src={poster.thumbnailUrl}
                      alt={'Can not display poster with id ' + poster.posterId}
                      width="105"
                      heigth="150"
                    />
                  </Column>
                  <Column>
                    <Card>
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
                              history.push('/admin/');
                              Alert.success('Poster successfully edited');
                            })
                            .catch((error: Error) =>
                              Alert.danger('Error storing edited poster: ' + error.message)
                            )
                        }
                      >
                        Save edit
                      </Button.Success>
                      <Button.Danger
                        onClick={() =>
                          posterService
                            .deletePoster(poster.posterId)
                            .then(() => {
                              history.push('/admin');
                              Alert.success('Poster successfully deleted');
                            })
                            .catch((error: Error) =>
                              Alert.danger('Error deleting poster: ' + error.message)
                            )
                        }
                      >
                        Delete poster
                      </Button.Danger>
                    </Card>
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
      .catch((error: Error) => Alert.danger('Error getting employers: ' + error.message));
    posterService
      .getPosters()
      .then((posters) => (this.posters = posters))
      .catch((error: Error) => Alert.danger('Error fetching connected posters: ' + error.message));
  }
}
