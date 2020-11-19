// @flow

/**
 * Mocked version of EmployerService used in testing.
 */

type Employer = {
  employerId: number,
  employerName: string,
};

class EmployerService {
  getEmployers() {
    return Promise.resolve([
      {
        employerId: 1,
        employerName: 'Employer 1',
      },
      {
        employerId: 2,
        employerName: 'Employer 2',
      },
      {
        employerId: 3,
        employerName: 'Employer 3',
      },
      {
        employerId: 4,
        employerName: 'Employer 4',
      },
    ]);
  }

  getEmployer(employerId: number) {
    if (employerId === 1)
      return Promise.resolve({
        employerId: 1,
        employerName: 'Employer 1',
      });

    if (employerId === 2)
      return Promise.resolve({
        employerId: 2,
        employerName: 'Employer 2',
      });
  }

  getProjectEmployer(projectId: number) {
    if (projectId === 1)
      return Promise.resolve({
        employerId: 1,
        employerName: 'Employer 1',
      });

    if (projectId === 2)
      return Promise.resolve({
        employerId: 2,
        employerName: 'Employer 2',
      });

    if (projectId === 3)
      return Promise.resolve({
        employerId: 3,
        employerName: 'Employer 3',
      });
  }

  createEmployer(employer: Employer) {
    return Promise.resolve(4);
  }

  updateEmployer(employer: Employer) {
    return Promise.resolve();
  }

  deleteEmployer(employerId: number) {
    return Promise.resolve();
  }
}
const employerService = new EmployerService();
export default employerService;
