// @flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import { posterService, type Poster } from '../src/services/poster-service';
import { projectService, type Project } from '../src/services/project-service';
import { employerService, type Employer } from '../src/services/employer-service';
import { categoryService, type Category } from '../src/services/category-service';

const testPosters: Poster[] = [
  {
    posterId: 1,
    projectId: 1,
    posterDescription: 'This is Poster 1',
    posterUrl: 'www.test/poster1.png',
    thumbnailUrl: 'www.test/thumbnail1.png',
  },
  {
    posterId: 2,
    projectId: 2,
    posterDescription: 'This is Poster 2',
    posterUrl: 'www.test/poster2.png',
    thumbnailUrl: 'www.test/thumbnail2.png',
  },
  {
    posterId: 3,
    projectId: 2,
    posterDescription: 'This is Poster 3',
    posterUrl: 'www.test/poster3.png',
    thumbnailUrl: 'www.test/thumbnail3.png',
  },
];

const testProjects: Project[] = [
  {
    projectId: 1,
    title: 'Test Project',
    projectDescription: 'Test Project Description',
    projectDate: '2020-11-17',
    categoryId: 1,
    employerId: 1,
    ranking: 1,
    active: true,
  },
  {
    projectId: 2,
    title: 'Test Project 2',
    projectDescription: 'Test Project 2 Description',
    projectDate: '2020-11-15',
    categoryId: 2,
    employerId: 2,
    ranking: 2,
    active: true,
  },
];

const testCategories: Category[] = [
  { categoryId: 1, categoryName: 'Category 1' },
  { categoryId: 2, categoryName: 'Category 2' },
  { categoryId: 3, categoryName: 'Category 3' },
];

const testEmployers: Employer[] = [
  { employerId: 1, employerName: 'Employer 1' },
  { employerId: 2, employerName: 'Employer 2' },
  { employerId: 3, employerName: 'Employer 3' },
];

axios.defaults.baseURL = 'http://localhost:3003/api/v1';

//SQL statements to reset tables before running tests, note that truncate cannot be used due to foreign key constraints
const resetCategoriesTable =
  'DELETE FROM ProjectCategories; ALTER TABLE ProjectCategories AUTO_INCREMENT = 1;';
const resetEmployersTable = 'DELETE FROM Employers; ALTER TABLE Employers AUTO_INCREMENT = 1;';
const resetPostersTable = 'DELETE FROM Posters; ALTER TABLE Posters AUTO_INCREMENT = 1;';
const resetProjectsTable = 'DELETE FROM Projects; ALTER TABLE Projects AUTO_INCREMENT = 1;';

let webServer;
beforeAll((done) => {
  webServer = app.listen(3003, () => done());
});

beforeEach((done) => {
  // Delete all data and reset id auto-increment start value
  pool.query(
    resetPostersTable + resetProjectsTable + resetEmployersTable + resetCategoriesTable,
    (error) => {
      if (error) return done.fail(error);

      //Inserting all test data before each test
      categoryService
        .createCategory(testCategories[0])
        .then(() => categoryService.createCategory(testCategories[1]))
        .then(() => categoryService.createCategory(testCategories[2]))
        .then(() => employerService.createEmployer(testEmployers[0]))
        .then(() => employerService.createEmployer(testEmployers[1]))
        .then(() => employerService.createEmployer(testEmployers[2]))
        .then(() => projectService.createProject(testProjects[0]))
        .then(() => projectService.createProject(testProjects[1]))
        .then(() => posterService.createPoster(testPosters[0]))
        .then(() => posterService.createPoster(testPosters[1]))
        .then(() => posterService.createPoster(testPosters[2]))
        .then(() => done());
    }
  );
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

/*
Category Tests
*/

describe('Fetch category (GET)', () => {
  test('Fetch all categories (200 OK)', (done) => {
    axios.get<Category[]>('/categories').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testCategories);
      done();
    });
  });

  test('Fetch category (200 OK)', (done) => {
    axios.get<Category>('/categories/1').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testCategories[0]);
      done();
    });
  });

  test('Fetch category for a project (200 OK)', (done) => {
    axios.get<Category>('/projects/1/category').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testCategories[0]);
      done();
    });
  });

  test('Fetch category (404 Not Found)', (done) => {
    axios
      .get<Category>('/categories/14')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

describe('Create new category (POST)', () => {
  test('Create new category (200 OK)', (done) => {
    axios
      .post<{}, number>('/categories', { categoryName: 'New Category' })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ categoryId: 4 });
        done();
      });
  });

  test('Create new category (400 Bad request)', (done) => {
    axios
      .post<{}, number>('/categories', { categoryName: '' })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 400');
        done();
      });
  });
});

describe('Update category (PUT)', () => {
  test('Update category (200 OK)', (done) => {
    axios
      .put<{}, number>('/categories/2', { categoryName: 'New Category Name' })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
});

describe('Delete category (DELETE)', () => {
  test('Delete category (200 OK)', (done) => {
    axios.delete('/categories/3').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});

/*
Employer Tests
*/
describe('Fetch employers (GET)', () => {
  test('Fetch all employers (200 OK)', (done) => {
    axios.get<Employer[]>('/employers').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testEmployers);
      done();
    });
  });

  test('Fetch employer (200 OK)', (done) => {
    axios.get<Employer>('/employers/1').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testEmployers[0]);
      done();
    });
  });

  test('Fetch employer for a project (200 OK)', (done) => {
    axios.get<Employer>('/projects/2/employer').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testEmployers[1]);
      done();
    });
  });

  test('Fetch employer (404 Not Found)', (done) => {
    axios
      .get<Employer>('/employers/14')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

describe('Create new employer (POST)', () => {
  test('Create new employer (200 OK)', (done) => {
    axios
      .post<{}, number>('/employers', { employerName: 'Employer 4' })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ employerId: 4 });
        done();
      });
  });

  test('Create new employer (400 Bad request)', (done) => {
    axios
      .post<{}, number>('/employers', { employerName: '' })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 400');
        done();
      });
  });
});

describe('Update employer (PUT)', () => {
  test('Update employer (200 OK)', (done) => {
    axios
      .put<{}, number>('/employers/2', { employerName: 'New Employer Name' })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
});

describe('Delete employer (DELETE)', () => {
  test('Delete employer (200 OK)', (done) => {
    axios.delete('/employers/3').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});

/*
Poster tests
*/

describe('Fetch posters (GET)', () => {
  test('Fetch all posters (200 OK)', (done) => {
    axios.get<Posters[]>('/posters').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testPosters);
      done();
    });
  });

  test('Fetch posters (200 OK)', (done) => {
    axios.get<Posters>('/posters/1').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testPosters[0]);
      done();
    });
  });

  test('Fetch all posters belonging to a project (200 OK)', (done) => {
    axios.get<Projects>('/projects/1/posters').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual([testPosters[0]]);
      done();
    });
  });

  test('Fetch poster (404 Not Found)', (done) => {
    axios
      .get<Poster>('/posters/14')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

describe('Create new poster (POST)', () => {
  test('Create new poster (200 OK)', (done) => {
    axios
      .post<{}, number>('/posters', {
        projectId: 2,
        posterDescription: 'This is Poster 4',
        posterUrl: 'www.test/poster4.jpg',
        thumbnailUrl: 'www.test/thumbnail4.jpg',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ posterId: 4 });
        done();
      });
  });

  test('Create new poster (400 Bad request)', (done) => {
    axios
      .post<{}, number>('/posters', {
        posterUrl: 'www.test/poster4.jpg',
        thumbnailUrl: 'www.test/thumbnail4.jpg',
      })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 400');
        done();
      });
  });
});

describe('Update poster (PUT)', () => {
  test('Update poster (200 OK)', (done) => {
    axios
      .put<{}, number>('/posters/2', {
        projectId: 2,
        posterDescription: 'Plakat til Nasi Padang',
        posterUrl: 'https://portfolio.hpbastiansen.com/posters/nasipadang_p.png',
        thumbnailUrl: 'https://portfolio.hpbastiansen.com/thumbnails/nasipadang_t.png',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
});

describe('Delete poster (DELETE)', () => {
  test('Delete poster (200 OK)', (done) => {
    axios.delete('/posters/2').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});

/*
Project tests
*/

describe('Fetch projects (GET)', () => {
  test('Fetch all projects (200 OK)', (done) => {
    axios.get<Projects[]>('/projects').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testProjects);
      done();
    });
  });

  test('Fetch project (200 OK)', (done) => {
    axios.get<Projects>('/projects/1').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testProjects[0]);
      done();
    });
  });

  test('Fetch project (404 Not Found)', (done) => {
    axios
      .get<Project>('/projects/21')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

describe('Create new projects (POST)', () => {
  test('Create new projects (200 OK)', (done) => {
    axios
      .post<{}, number>('/projects', {
        title: 'New Test Project',
        projectDescription: 'New Test Project Description',
        projectDate: '2020-11-18',
        categoryId: 1,
        employerId: 1,
        ranking: 20,
        active: false,
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ projectId: 3 });
        done();
      });
  });

  test('Create new project (400 Bad request)', (done) => {
    axios
      .post<{}, number>('/projects', {
        title: 'New Test Project',
        projectDescription: 'New Test Project Description',
        active: true,
      })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 400');
        done();
      });
  });
});

describe('Update project (PUT)', () => {
  test('Update project (200 OK)', (done) => {
    axios
      .put<{}, number>('/projects/2', {
        title: 'New Test Project 2',
        projectDescription: 'New Test Project 2 Description',
        projectDate: '2020-11-17',
        categoryId: 1,
        employerId: 1,
        ranking: 20,
        active: true,
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
});

describe('Delete project (DELETE)', () => {
  test('Delete project (200 OK)', (done) => {
    axios.delete('/projects/1').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});
