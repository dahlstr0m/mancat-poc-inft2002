// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export type Project = {
  projectid: number,
  title: string,
  description: string,
  projectDate: number,
  categoryId: number,
  employerid: number,
  active: boolean,
  ranking: number,
};

class ProjectService {
  //Get project using projectid
  get(projectid: number) {
    return axios.get<Project>('/projects/' + projectid).then((response) => response.data);
  }
  //Get all projects
  getAll() {
    return axios.get<Project[]>('/projects').then((response) => response.data);
  }

  //Create new projects, needs a title, categoryID and a active status
  create(title: string, categoryId: number, active: boolean) {
    return axios
      .post<{}, { projectid: number }>('/projects', {
        title: title,
        categoryId: categoryId,
        active: active,
      })
      .then((response) => response.data);
  }

  //  Deletes a project based on task id
  delete(projectid: number) {
    return axios.delete<Project>('/projects/' + projectid).then((response) => response.data);
  }

  // Update given project.
  update(project: Project) {
    return axios.put<Project, void>('/projects', project).then((response) => response.data);
  }
}

export type Poster = {
  posterid: number,
  projectid: number,
  description: string,
  url: string,
};

class PosterService {
  //Get project using posterid
  get(posterid: number) {
    return axios.get<Poster>('/posters/' + posterid).then((response) => response.data);
  }
  //Get all posters
  getAll() {
    return axios.get<Poster[]>('/posters').then((response) => response.data);
  }

  //Create new posters, needs a posterid and has to bed linked to a projectid
  create(posterid: string, projectid: number) {
    return axios
      .post<{}, { posterid: number }>('/posters', { posterid: posterid, projectid: projectid })
      .then((response) => response.data);
  }

  //  Deletes a poster based on task id
  delete(posterid: number) {
    return axios.delete<Project>('/posters/' + posterid).then((response) => response.data);
  }

  // Update given poster.
  update(poster: Poster) {
    return axios.put<Poster, void>('/posters', poster).then((response) => response.data);
  }
}

export type Thumbnails = {
  thumbnailid: number,
  posterid: number,
  url: string,
};

class ThumbnailService {
  //  Deletes a project based on thumbnail id
  delete(thumbnailid: number) {
    return axios.delete<Project>('/thumbnails/' + thumbnailid).then((response) => response.data);
  }

  // Update given thumbnail.
  update(thumbnails: Thumbnails) {
    return axios.put<Thumbnails, void>('/thumbnails', thumbnails).then((response) => response.data);
  }
}

const projectservice = new ProjectService();
export { projectservice };

const posterservice = new PosterService();
export { posterservice };

const thumbnailservice = new ThumbnailService();
export { thumbnailservice };
