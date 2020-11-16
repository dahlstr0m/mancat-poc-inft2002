// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { projectService, categoryService, type Project, type Category } from '../portfolio-service';
import Button from './Button';
import Form from './Form';
import { Card, CardPlain, CardBody } from './Card';
import { Row, Column, Alert } from './Widgets';
import { history } from '../index';

/**
 * Manage categories page
 */
export default class ManageCategories extends Component {
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
              (this.categoryToUpdate.categoryId = parseInt(event.currentTarget.value)),
              ((this.categoryToUpdate.categoryName = this.categories.find(
                (category) => category.categoryId === parseInt(event.currentTarget.value)
              )
                ? this.categories.find(
                    (category) => category.categoryId === parseInt(event.currentTarget.value)
                  ).categoryName
                : ''),
              (this.categoryUsed = this.projects.filter(
                (project) => project.categoryId == event.currentTarget.value
              ).length))
            )}
          >
            <option value="0">Select a category to change</option>
            {this.categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
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
                          history.push('/admin');
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
      .catch((error: Error) => Alert.danger('Error getting categories: ' + error.message));

    projectService
      .getProjects()
      .then((projects) => (this.projects = projects))
      .catch((error: Error) => Alert.danger('Error getting projects: ' + error.message));
  }
}
