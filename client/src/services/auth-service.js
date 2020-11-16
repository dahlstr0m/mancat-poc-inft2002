// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

class AuthService {
  constructor() {
    this.authenticated = false;
  }

  login(user) {
    return axios
      .post<{}, {}>('/auth/login', user)
      .then(() => (this.authenticated = true))
      .catch((error) => console.log(error));
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

const authService = new AuthService();

export { authService };
