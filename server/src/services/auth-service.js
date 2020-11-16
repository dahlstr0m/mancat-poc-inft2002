// @flow

import pool from '../mysql-pool';

class AuthService {
  getUser(user) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Users WHERE username=?', [user.username], (err, results) => {
        if (err) reject(err);

        resolve(results[0]);
      });
    });
  }
}

const authService = new AuthService();
export { authService };
