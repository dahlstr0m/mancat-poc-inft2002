// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import Button from './Button';
import { CardGrid, CardColumn, CardBody, Card } from './Card';
import { Alert } from './Widgets';

/**
 * Renders All management menu .
 */
export default class ManagementMenu extends Component {
  render() {
    return (
      <CardGrid columns={1} columnsSm={2} columnsMd={3} columnsLg={4}>
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
              <Button.Light
                onClick={() => Alert.info('This feature is not yet fully implemented. ')}
              >
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
