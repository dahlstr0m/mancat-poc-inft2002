// @flow

import pool from '../mysql-pool';

export type Poster = {
  posterId: number,
  projectId: number,
  posterDescription: string,
  posterUrl: string,
  thumbnailUrl: string,
};

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
        'INSERT INTO Posters SET projectId=?, posterDescription=?, posterUrl=?, thumbnailUrl=?',
        [poster.projectId, poster.posterDescription, poster.posterUrl, poster.thumbnailUrl],
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
        'UPDATE Posters SET projectId=?, posterDescription=?, posterUrl=?, thumbnailUrl=? WHERE posterId=?',
        [
          poster.projectId,
          poster.posterDescription,
          poster.posterUrl,
          poster.thumbnailUrl,
          poster.posterId,
        ],
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

const posterService = new PosterService();
export { posterService };
