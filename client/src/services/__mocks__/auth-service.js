// @flow

type User = {
  username: string,
  password: string,
};

class AuthService {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login(user: User) {
    if (user.username === 'admin' && user.password === 'admin') {
      this.authenticated = true;
      return Promise.resolve();
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }
}
const authService = new AuthService();
export default authService;
