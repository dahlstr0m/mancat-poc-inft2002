import * as React from 'react';
import { Component } from 'react-simplified';
import Form from './Form';
import Button from './Button';
import { Card } from './Card';
import { Alert } from './Widgets';
import { authService } from '../services';
import { history } from '../index';

export default class LoginPage extends Component {
  user = { username: '', password: '' };

  render() {
    return (
      <Card title="Log in">
        <Form.Label>Username:</Form.Label>
        <Form.Input
          type="text"
          value={this.user.username}
          onChange={(event) => (this.user.username = event.currentTarget.value)}
        />
        <Form.Label>Password:</Form.Label>
        <Form.Input
          type="password"
          value={this.user.password}
          onChange={(event) => (this.user.password = event.currentTarget.value)}
        />
        <hr />
        <Button.Success
          onClick={() =>
            authService.login(this.user).then(() => {
              if (authService.isAuthenticated()) {
                history.push('/admin');
              }
            })
          }
        >
          Log in
        </Button.Success>
      </Card>
    );
  }
}