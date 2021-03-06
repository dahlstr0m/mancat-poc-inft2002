// @flow

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type User = {
  username: string,
  password: string,
};

/**
 * Very simple authentication service.
 * User is authenticated through username and hashed password.
 * Session is not stored.
 */
class AuthService {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login(user: User) {
    return axios
      .post<User, {}>('/auth/login', user)
      .then(() => (this.authenticated = true))
      .catch((error) => console.log(error));
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

const authService = new AuthService();
export default authService;
