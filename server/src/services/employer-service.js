// @flow

import pool from '../mysql-pool';

export type Employer = {
  employerId: number,
  employerName: string,
};

class EmployerService {
  getEmployers() {
    return new Promise<Employer[]>((resolve, reject) => {
      pool.query('SELECT * FROM Employers', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getEmployer(id: number) {
    return new Promise<?Employer>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Employers WHERE employerId = ?',
        [id],
        (error, results: Employer[]) => {
          if (error) return reject(error);

          resolve(results[0]);
        }
      );
    });
  }

  getProjectEmployer(projectId: number) {
    return new Promise<?Employer>((resolve, reject) => {
      pool.query(
        `SELECT Employers.employerId, Employers.employerName 
          FROM Projects INNER JOIN Employers 
          ON Projects.employerId = Employers.employerId
          WHERE Projects.projectId = ?`,
        [projectId],
        (error, results: Employer[]) => {
          if (error) return reject(error);

          resolve(results[0]);
        }
      );
    });
  }

  createEmployer(employer: Employer) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Employers SET employerName=?',
        [employer.employerName],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        }
      );
    });
  }

  updateEmployer(employer: Employer) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Employers SET employerName=? WHERE employerId=?',
        [employer.employerName, employer.employerId],
        (error, results) => {
          if (error) return reject(error);
          if (!results.affectedRows) reject(new Error('No rows updated'));

          resolve();
        }
      );
    });
  }

  deleteEmployer(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Employers WHERE employerId=?', [id], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No rows deleted'));

        resolve();
      });
    });
  }
}

const employerService = new EmployerService();
export { employerService };
