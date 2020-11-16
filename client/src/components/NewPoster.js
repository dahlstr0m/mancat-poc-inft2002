// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import Button from './Button';
import Form from './Form';
import { Card, CardPlain } from './Card';
import { Alert } from './Widgets';
import { projectService, posterService } from '../services';

/**
 * New Poster page
 */
export default class NewPoster extends Component {
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
        <Card title="Add a new poster">
          <Form.Label> Connect to project:</Form.Label>
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
        <Card title="These posters already exists for this project:">
          {this.posters
            .filter((p) => p.projectId == this.poster.projectId)
            .map((p) => (
              <img
                key={p.posterId}
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
