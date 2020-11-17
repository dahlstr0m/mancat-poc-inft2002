// @flow

import pool from '../mysql-pool';

export type Project = {
  projectId: number,
  title: string,
  projectDescription: string,
  projectDate: string,
  categoryId: number,
  employerId: number,
  ranking: number,
  active: boolean,
};

class ProjectService {
  getProjects() {
    return new Promise<Project[]>((resolve, reject) => {
      pool.query('SELECT * FROM Projects', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getProject(id: number) {
    return new Promise<?Project>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Projects WHERE ProjectId = ?',
        [id],
        (error, results: Project[]) => {
          if (error) return reject(error);

          resolve(results[0]);
        }
      );
    });
  }

  createProject(project: Project) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Projects SET title=?, projectDescription=?, projectDate=?, categoryId=?, employerId=?, active=?, ranking=?',
        [
          project.title,
          project.projectDescription,
          project.projectDate,
          project.categoryId,
          project.employerId,
          Number(project.active),
          project.ranking,
        ],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        }
      );
    });
  }

  updateProject(project: Project) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Projects SET title=?, projectDescription=?, projectDate=?, categoryId=?, employerId=?, active=?, ranking=? WHERE projectId=?',
        [
          project.title,
          project.projectDescription,
          project.projectDate,
          project.categoryId,
          project.employerId,
          project.active,
          project.ranking,
          project.projectId,
        ],
        (error, results) => {
          if (error) return reject(error);
          if (!results.affectedRows) reject(new Error('No rows updated'));

          resolve();
        }
      );
    });
  }

  deleteProject(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Projects WHERE projectId=?', [id], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No rows deleted'));

        resolve();
      });
    });
  }
}

const projectService = new ProjectService();
export { projectService };
