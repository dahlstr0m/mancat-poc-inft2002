// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type Employer = {
  employerId: number,
  employerName: string,
};

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

  createEmployer(employer: Employer) {
    return axios
      .post<Employer, { employerId: number }>('/employers', employer)
      .then((response) => response.data);
  }

  updateEmployer(employer: Employer) {
    return axios
      .put<Employer, void>(`/employers/${employer.employerId}`, employer)
      .then((response) => response.data);
  }

  deleteEmployer(employerId: number) {
    return axios.delete<void>('/employers/' + employerId).then((response) => response.data);
  }
}

const employerService = new EmployerService();
export default employerService;
