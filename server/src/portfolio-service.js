// @flow

import pool from './mysql-pool';

export type Project = {
  projectId: number,
  title: string,
  description: string,
  date: string,
  categoryId: number,
  employerId: number,
  ranking: number,
  active: boolean,
};

export type Category = {
  categoryId: number,
  name: string,
};

export type Poster = {
  posterId: number,
  projectId: number,
  description: string,
  url: string,
};

export type Employer = {
  employerId: number,
  name: string,
};

export type Thumbnail = {
  thumbnailId: number,
  posterId: number,
  url: string,
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
        'INSERT INTO Projects SET title=?, description=?, date=?, categoryId=?, employerId=?, active=?, ranking=?',
        [
          project.title,
          project.description,
          project.date,
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
        'UPDATE Projects SET title=?, description=?, date=?, categoryId=?, employerId=?, active=?, ranking=? WHERE projectId=?',
        [
          project.title,
          project.description,
          project.date,
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

class CategoryService {
  getCategories() {
    return new Promise<Category[]>((resolve, reject) => {
      pool.query('SELECT * FROM ProjectCategories', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getCategory(id: number) {
    return new Promise<?Category>((resolve, reject) => {
      pool.query(
        'SELECT * FROM ProjectCategories WHERE categoryId = ?',
        [id],
        (error, results: Category[]) => {
          if (error) return reject(error);

          resolve(results[0]);
        }
      );
    });
  }

  getProjectCategory(projectId: number) {
    return new Promise<?Category>((resolve, reject) => {
      pool.query(
        `SELECT ProjectCategories.categoryId, ProjectCategories.name 
        FROM Projects INNER JOIN ProjectCategories ON 
        Projects.categoryId = ProjectCategories.categoryId 
        WHERE Projects.projectId = ?`,
        [projectId],
        (error, results: Category[]) => {
          if (error) return reject(error);

          resolve(results[0]);
        }
      );
    });
  }

  createCategory(category: Category) {
    return new Promise<number>((resolve, reject) => {
      pool.query('INSERT INTO ProjectCategories SET name=?', [category.name], (error, results) => {
        if (error) return reject(error);
        if (!results.insertId) return reject(new Error('No row inserted'));

        resolve(Number(results.insertId));
      });
    });
  }

  updateCategory(category: Category) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE ProjectCategories SET name=? WHERE categoryId=?',
        [category.name, category.categoryId],
        (error, results) => {
          if (error) return reject(error);
          if (!results.affectedRows) reject(new Error('No rows updated'));

          resolve();
        }
      );
    });
  }

  deleteCategory(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM ProjectCategories WHERE categoryId=?', [id], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No rows deleted'));

        resolve();
      });
    });
  }
}

class PosterService {
  getPosters() {
    return new Promise<Poster[]>((resolve, reject) => {
      pool.query('SELECT * FROM Posters', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  getProjectPosters(projectId: number) {
    return new Promise<Poster[]>((resolve, reject) => {
      pool.query(
        `SELECT * FROM Posters WHERE Posters.projectId = ?`,
        [projectId],
        (error, results) => {
          if (error) return reject(error);

          resolve(results);
        }
      );
    });
  }

  getPoster(id: number) {
    return new Promise<?Poster>((resolve, reject) => {
      pool.query('SELECT * FROM Posters WHERE posterId = ?', [id], (error, results: Poster[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  createPoster(poster: Poster) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Posters SET projectId=?, description=?, url=?',
        [poster.projectId, poster.description, poster.url],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        }
      );
    });
  }

  updatePoster(poster: Poster) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Posters SET projectId=?, description=?, url=? WHERE posterId=?',
        [poster.projectId, poster.description, poster.url, poster.posterId],
        (error, results) => {
          if (error) return reject(error);
          if (!results.affectedRows) reject(new Error('No rows updated'));

          resolve();
        }
      );
    });
  }

  deletePoster(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Posters WHERE posterId=?', [id], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No rows deleted'));

        resolve();
      });
    });
  }
}

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
        `SELECT Employers.employerId, Employers.name 
        FROM Projects INNER JOIN Employers 
        ON Projects.employerId = Employers.employerId
        WHERE Projects.employerId = ?`,
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
      pool.query('INSERT INTO Employers SET name=?', [employer.name], (error, results) => {
        if (error) return reject(error);
        if (!results.insertId) return reject(new Error('No row inserted'));

        resolve(Number(results.insertId));
      });
    });
  }

  updateEmployer(employer: Employer) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Employers SET name=? WHERE employerId=?',
        [employer.name, employer.employerId],
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

class ThumbnailService {
  getProjectThumbnails(projectId: number) {
    return new Promise<Thumbnail[]>((resolve, reject) => {
      pool.query(
        `SELECT Thumbnails.thumbnailId, Thumbnails.posterId, Thumbnails.url 
        FROM Thumbnails INNER JOIN Posters 
        ON Thumbnails.posterId = Posters.posterId 
        WHERE Posters.projectId = ?`,
        [projectId],
        (error, results) => {
          if (error) return reject(error);

          resolve(results);
        }
      );
    });
  }
}

const projectService = new ProjectService();
const categoryService = new CategoryService();
const posterService = new PosterService();
const employerService = new EmployerService();
const thumbnailService = new ThumbnailService();
export { projectService, categoryService, posterService, employerService, thumbnailService };
