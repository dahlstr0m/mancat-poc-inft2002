// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

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
    return axios.get<Project[]>('/projects').then((response) => response.data);
  }

  getProject(projectId: number) {
    return axios.get<Project>('/projects/' + projectId).then((response) => response.data);
  }

  createProject(project: Project) {
    return axios
      .post<Project, { projectId: number }>('/projects', project)
      .then((response) => response.data);
  }

  updateProject(project: Project) {
    return axios.put<Project, void>('/projects', project).then((response) => response.data);
  }

  deleteProject(projectId: number) {
    return axios.delete<void>('/projects/' + projectId).then((response) => response.data);
  }
}

class CategoryService {
  getCategories() {
    return axios.get<Category[]>('/categories').then((response) => response.data);
  }

  getCategory(categoryId: number) {
    return axios.get<Category>('/categories/' + categoryId).then((response) => response.data);
  }

  getProjectCategory(projectId: number) {
    return axios.get<Category>(`/projects/${projectId}/category`).then((response) => response.data);
  }

  createCategory(category: Category) {
    return axios
      .post<Category, { categoryId: number }>('/categories', category)
      .then((response) => response.data);
  }

  updateCategory(category: Category) {
    return axios.put<Category, void>('/categories', category).then((response) => response.data);
  }

  deleteProject(categoryId: number) {
    return axios.delete<void>('/categories/' + categoryId).then((response) => response.data);
  }
}

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
    return axios.put<Poster, void>('/posters', poster).then((response) => response.data);
  }

  deleteProject(posterId: number) {
    return axios.delete<void>('/posters/' + posterId).then((response) => response.data);
  }
}

class EmployerService {
  getEmployers() {
    return axios.get<Employer[]>('/employers').then((response) => response.data);
  }

  getEmployer(employerId: number) {
    return axios.get<Employer>('/employers/' + employerId).then((response) => response.data);
  }

  getProjectEmployer(projectId: number) {
    return axios.get<Employer>(`/projects/${projectId}/employer`).then((response) => response.data);
  }

  createEmployers(employer: Employer) {
    return axios
      .post<Employer, { employerId: number }>('/employers', employer)
      .then((response) => response.data);
  }

  updateEmployer(employer: Employer) {
    return axios.put<Employer, void>('/employers', employer).then((response) => response.data);
  }

  deleteProject(employerId: number) {
    return axios.delete<void>('/employers/' + employerId).then((response) => response.data);
  }
}

class ThumbnailService {
  getThumbnails() {
    return axios.get<Thumbnail[]>('/thumbnails').then((response) => response.data);
  }

  getThumbnail(thumbnailId: number) {
    return axios.get<Thumbnail>('/thumbnails/' + thumbnailId).then((response) => response.data);
  }

  getProjectThumbnails(projectId: number) {
    return axios
      .get<Thumbnail[]>(`/projects/${projectId}/thumbnails`)
      .then((response) => response.data);
  }

  createThumbnail(thumbnail: Thumbnail) {
    return axios
      .post<Thumbnail, { thumbnailId: number }>('/thumbnails', thumbnail)
      .then((response) => response.data);
  }

  updateThumbnail(thumbnail: Thumbnail) {
    return axios.put<Thumbnail, void>('/thumbnails', thumbnail).then((response) => response.data);
  }

  deleteThumbnail(thumbnailId: number) {
    return axios.delete<void>('/thumbnails/' + thumbnailId).then((response) => response.data);
  }
}

const projectService = new ProjectService();
const categoryService = new CategoryService();
const posterService = new PosterService();
const employerService = new EmployerService();
const thumbnailService = new ThumbnailService();
export { projectService, categoryService, posterService, employerService, thumbnailService };
