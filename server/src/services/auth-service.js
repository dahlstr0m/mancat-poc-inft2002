// @flow

import pool from '../mysql-pool';

export type User = {
  username: string,
  password: string,
};

class AuthService {
  getUser(user: User) {
    return new Promise<?User>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Users WHERE username=?',
        [user.username],
        (err, results: User[]) => {
          if (err) reject(err);

          resolve(results[0]);
        }
      );
    });
  }
}

const authService = new AuthService();
export { authService };
