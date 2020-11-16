// @flow

import pool from '../mysql-pool';

export type Category = {
  categoryId: number,
  categoryName: string,
};

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
        `SELECT ProjectCategories.categoryId, ProjectCategories.categoryName 
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
      pool.query(
        'INSERT INTO ProjectCategories SET categoryName=?',
        [category.categoryName],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        }
      );
    });
  }

  updateCategory(category: Category) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE ProjectCategories SET categoryName=? WHERE categoryId=?',
        [category.categoryName, category.categoryId],
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

const categoryService = new CategoryService();
export { categoryService };
