// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type Poster = {
  posterId: number,
  projectId: number,
  posterDescription: string,
  posterUrl: string,
  thumbnailUrl: string,
};

class PosterService {
  getPosters() {
    return axios.get<Poster[]>('/posters').then((response) => response.data);
  }

  getPoster(posterId: number) {
    return axios.get<Poster>('/posters/' + posterId).then((response) => response.data);
  }

  getProjectPosters(projectId: number) {
    return axios.get<Poster[]>(`/projects/${projectId}/posters`).then((response) => response.data);
  }

  createPoster(poster: Poster) {
    return axios
      .post<Poster, { posterId: number }>('/posters', poster)
      .then((response) => response.data);
  }

  updatePoster(poster: Poster) {
    return axios
      .put<Poster, void>(`/posters/${poster.posterId}`, poster)
      .then((response) => response.data);
  }

  deletePoster(posterId: number) {
    return axios.delete<void>('/posters/' + posterId).then((response) => response.data);
  }
}

const posterService = new PosterService();
export default posterService;
