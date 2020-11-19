// @flow

type Project = {
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
    return Promise.resolve([
      {
        projectId: 1,
        title: 'Project 1',
        projectDescription: 'Project 1 description',
        projectDate: '10-10-2020',
        categoryId: 1,
        employerId: 1,
        ranking: 1,
        active: true,
      },
      {
        projectId: 2,
        title: 'Project 2',
        projectDescription: 'Project 2 description',
        projectDate: '11-10-2020',
        categoryId: 2,
        employerId: 2,
        ranking: 2,
        active: true,
      },
      {
        projectId: 3,
        title: 'Project 3',
        projectDescription: 'Project 3 description',
        projectDate: '12-10-2020',
        categoryId: 3,
        employerId: 3,
        ranking: 3,
        active: true,
      },
    ]);
  }

  getProject(projectId: number) {
    if (projectId === 1)
      return Promise.resolve({
        projectId: 1,
        title: 'Project 1',
        projectDescription: 'Project 1 description',
        projectDate: '10-10-2020',
        categoryId: 1,
        employerId: 1,
        ranking: 1,
        active: true,
      });

    if (projectId === 2)
      return Promise.resolve({
        projectId: 2,
        title: 'Project 2',
        projectDescription: 'Project 2 description',
        projectDate: '11-10-2020',
        categoryId: 2,
        employerId: 2,
        ranking: 2,
        active: true,
      });
  }

  createProject(project: Project) {
    return Promise.resolve(4);
  }

  updateProject(project: Project) {
    return Promise.resolve();
  }

  deleteProject(projectId: number) {
    return Promise.resolve();
  }
}

const projectService = new ProjectService();
export default projectService;
