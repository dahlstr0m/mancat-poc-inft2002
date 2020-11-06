// @flow

import pool from './mysql-pool';

export type Project = {
  projectid: number,
  title: string,
  description: string,
  projectDate: number,
  categoryId: number,
  employerid: number,
  active: boolean,
  ranking: boolean,
};

class PortfolioService {
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
      pool.query('SELECT * FROM Projects WHERE id = ?', [id], (error, results: Project[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }
}

const portfolioService = new PortfolioService();
export default portfolioService;
