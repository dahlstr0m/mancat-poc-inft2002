// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

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
    return axios
      .put<Project, void>(`/projects/${project.projectId}`, project)
      .then((response) => response.data);
  }

  /**
   * Special method to update every projects ranking at once.
   * Used only in <ProjectRanking />.
   */
  updateRanking(projects: Project[]) {
    return axios
      .put<Project[], void>('/projects/ranking', projects)
      .then((response) => response.data);
  }

  deleteProject(projectId: number) {
    return axios.delete<void>('/projects/' + projectId).then((response) => response.data);
  }
}

const projectService = new ProjectService();
export default projectService;
