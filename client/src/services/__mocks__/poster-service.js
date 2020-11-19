// @flow

/**
 * Mocked version of PosterService used in testing.
 */

type Poster = {
  posterId: number,
  projectId: number,
  posterDescription: string,
  posterUrl: string,
  thumbnailUrl: string,
};

class PosterService {
  getPosters() {
    return Promise.resolve([
      {
        posterId: 1,
        projectId: 1,
        posterDescription: 'Poster 1 description',
        posterUrl: 'Poster 1 url',
        thumbnailUrl: 'Poster 1 thumb url',
      },
      {
        posterId: 2,
        projectId: 2,
        posterDescription: 'Poster 2 description',
        posterUrl: 'Poster 2 url',
        thumbnailUrl: 'Poster 2 thumb url',
      },
      {
        posterId: 3,
        projectId: 3,
        posterDescription: 'Poster 3 description',
        posterUrl: 'Poster 3 url',
        thumbnailUrl: 'Poster 3 thumb url',
      },
    ]);
  }

  getPoster(posterId: number) {
    if (posterId === 1)
      return Promise.resolve({
        posterId: 1,
        projectId: 1,
        posterDescription: 'Poster 1 description',
        posterUrl: 'Poster 1 url',
        thumbnailUrl: 'Poster 1 thumb url',
      });

    if (posterId === 2)
      return Promise.resolve({
        posterId: 2,
        projectId: 2,
        posterDescription: 'Poster 2 description',
        posterUrl: 'Poster 2 url',
        thumbnailUrl: 'Poster 2 thumb url',
      });
  }

  getProjectPosters(projectId: number) {
    if (projectId === 1)
      return Promise.resolve({
        posterId: 1,
        projectId: 1,
        posterDescription: 'Poster 1 description',
        posterUrl: 'Poster 1 url',
        thumbnailUrl: 'Poster 1 thumb url',
      });

    if (projectId === 2)
      return Promise.resolve({
        posterId: 2,
        projectId: 2,
        posterDescription: 'Poster 2 description',
        posterUrl: 'Poster 2 url',
        thumbnailUrl: 'Poster 2 thumb url',
      });

    if (projectId === 3)
      return Promise.resolve({
        posterId: 3,
        projectId: 3,
        posterDescription: 'Poster 3 description',
        posterUrl: 'Poster 3 url',
        thumbnailUrl: 'Poster 3 thumb url',
      });
  }

  createPoster(poster: Poster) {
    return Promise.resolve(4);
  }

  updatePoster(poster: Poster) {
    return Promise.resolve();
  }

  deletePoster(posterId: number) {
    return Promise.resolve();
  }
}

const posterService = new PosterService();
export default posterService;
