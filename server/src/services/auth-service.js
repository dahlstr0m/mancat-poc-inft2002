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

  // Only used for testing purposes, password should be hashed
  insertUser(user: User) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Users SET username=?, password=?',
        [user.username, user.password],
        (err, results) => {
          if (err) return reject(err);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        }
      );
    });
  }
}

const authService = new AuthService();
export { authService };
