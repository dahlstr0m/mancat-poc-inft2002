// @flow

class AuthService {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login(user: { username: string, password: string }) {
    if (username === 'admin' && password === 'admin') {
      this.authenticated = true;
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

const authService = new AuthService();
export { authService };
