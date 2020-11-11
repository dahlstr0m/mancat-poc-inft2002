// @flow
import express from 'express';

import {
  projectService,
  categoryService,
  posterService,
  employerService,
  thumbnailService,
  type Project,
  type Category,
  type Poster,
  type Employer,
  type Thumbnail,
} from './portfolio-service';

const router: express$Router<> = express.Router();

/**
 * Project API handling
 */
router.get('/projects', (req, res) => {
  projectService
    .getProjects()
    .then((rows) => res.send(rows))
    .catch((error: Error) => res.status(500).send(error));
});

router.get('/projects/:id', (req, res) => {
  const id = Number(req.params.id);
  projectService
    .getProject(id)
    .then((project) => (project ? res.send(project) : res.status(404).send('Project not found')))
    .catch((error: Error) => res.status(500).send(error));
});

router.get('/projects/:id/category', (req, res) => {
  const id = Number(req.params.id);
  categoryService
    .getProjectCategory(id)
    .then((category) => (category ? res.send(category) : res.status(404).send('Project not found')))
    .catch((error: Error) => res.status(500).send(error));
});

router.get('/projects/:id/employer', (req, res) => {
  const id = Number(req.params.id);
  employerService
    .getProjectEmployer(id)
    .then((employer) => (employer ? res.send(employer) : res.status(404).send('Project not found')))
    .catch((error: Error) => res.status(500).send(error));
});

router.get('/projects/:id/posters', (req, res) => {
  const id = Number(req.params.id);
  posterService
    .getProjectPosters(id)
    .then((posters) => res.send(posters))
    .catch((error: Error) => res.status(500).send(error));
});

router.post('/projects', (req, res) => {
  const data = req.body;
  if (
    data &&
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.description == 'string' &&
    data.description.length != 0 &&
    typeof data.date == 'string' &&
    data.date.length != 0 &&
    typeof data.categoryId == 'number' &&
    !isNaN(data.categoryId) &&
    typeof data.employerId == 'number' &&
    !isNaN(data.employerId) &&
    typeof data.ranking == 'number' &&
    !isNaN(data.ranking) &&
    typeof data.active == 'boolean'
  ) {
    const project: Project = {
      projectId: 0,
      title: data.title,
      description: data.description,
      date: data.date,
      categoryId: data.categoryId,
      employerId: data.employerId,
      ranking: data.ranking,
      active: data.active,
    };

    projectService
      .createProject(project)
      .then((projectId) => res.send({ projectId: projectId }))
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing project data.');
  }
});

router.put('/projects/:id', (req, res) => {
  const data = req.body;
  const id = Number(req.params.id);
  if (
    data &&
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.description == 'string' &&
    data.description.length != 0 &&
    typeof data.date == 'string' &&
    data.date.length != 0 &&
    typeof data.categoryId == 'number' &&
    !isNaN(data.categoryId) &&
    typeof data.employerId == 'number' &&
    !isNaN(data.employerId) &&
    typeof data.ranking == 'number' &&
    !isNaN(data.ranking) &&
    typeof data.active == 'boolean'
  ) {
    const project: Project = {
      projectId: id,
      title: data.title,
      description: data.description,
      date: data.date,
      categoryId: data.categoryId,
      employerId: data.employerId,
      ranking: data.ranking,
      active: data.active,
    };

    projectService
      .updateProject(project)
      .then((result) => res.send())
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing project data.');
  }
});

router.delete('/projects/:id', (req, res) => {
  const id = Number(req.params.id);
  projectService
    .deleteProject(id)
    .then((result) => res.send())
    .catch((error: Error) => res.status(500).send(error));
});

/**
 * Category API handling
 */
router.get('/categories', (req, res) => {
  categoryService
    .getCategories()
    .then((rows) => res.send(rows))
    .catch((error: Error) => res.status(500).send(error));
});

router.get('/categories/:id', (req, res) => {
  const id = Number(req.params.id);
  categoryService
    .getCategory(id)
    .then((category) =>
      category ? res.send(category) : res.status(404).send('Category not found')
    )
    .catch((error: Error) => res.status(500).send(error));
});

router.post('/categories', (req, res) => {
  const data = req.body;
  if (data && typeof data.name == 'string' && data.name.length != 0) {
    const category: Category = {
      categoryId: 0,
      name: data.name,
    };

    categoryService
      .createCategory(category)
      .then((categoryId) => res.send({ categoryId: categoryId }))
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing category name.');
  }
});

router.put('/categories/:id', (req, res) => {
  const data = req.body;
  const id = Number(req.params.id);
  if (data && typeof data.name == 'string' && data.name.length != 0) {
    const category: Category = {
      categoryId: id,
      name: data.name,
    };

    categoryService
      .updateCategory(category)
      .then((result) => res.send())
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing category name.');
  }
});

router.delete('/categories/:id', (req, res) => {
  const id = Number(req.params.id);
  categoryService
    .deleteCategory(id)
    .then((result) => res.send())
    .catch((error: Error) => res.status(500).send(error));
});

/**
 * Poster API handling
 */
router.get('/posters', (req, res) => {
  posterService
    .getPosters()
    .then((rows) => res.send(rows))
    .catch((error: Error) => res.status(500).send(error));
});

router.get('/posters/:id', (req, res) => {
  const id = Number(req.params.id);
  posterService
    .getPoster(id)
    .then((poster) => (poster ? res.send(poster) : res.status(404).send('Poster not found')))
    .catch((error: Error) => res.status(500).send(error));
});

router.post('/posters', (req, res) => {
  const data = req.body;
  if (
    data &&
    typeof data.projectId == 'number' &&
    !isNaN(data.projectId) &&
    typeof data.description == 'string' &&
    data.description.length != 0 &&
    typeof data.url == 'string' &&
    data.url.length != 0
  ) {
    const poster: Poster = {
      posterId: 0,
      projectId: data.projectId,
      description: data.description,
      url: data.url,
    };

    posterService
      .createPoster(poster)
      .then((posterId) => res.send({ posterId: posterId }))
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing poster data.');
  }
});

router.put('/posters/:id', (req, res) => {
  const data = req.body;
  const id = Number(req.params.id);
  if (
    data &&
    typeof data.projectId == 'number' &&
    !isNaN(data.projectId) &&
    typeof data.description == 'string' &&
    data.description.length != 0 &&
    typeof data.url == 'string' &&
    data.url.length != 0
  ) {
    const poster: Poster = {
      posterId: id,
      projectId: data.projectId,
      description: data.description,
      url: data.url,
    };

    posterService
      .updatePoster(poster)
      .then((result) => res.send())
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing poster data.');
  }
});

router.delete('/posters/:id', (req, res) => {
  const id = Number(req.params.id);
  posterService
    .deletePoster(id)
    .then((result) => res.send())
    .catch((error: Error) => res.status(500).send(error));
});

/**
 * Employer API handling
 */
router.get('/employers', (req, res) => {
  employerService
    .getEmployers()
    .then((rows) => res.send(rows))
    .catch((error: Error) => res.status(500).send(error));
});

router.get('/employers/:id', (req, res) => {
  const id = Number(req.params.id);
  employerService
    .getEmployer(id)
    .then((employer) =>
      employer ? res.send(employer) : res.status(404).send('Employer not found')
    )
    .catch((error: Error) => res.status(500).send(error));
});

router.post('/employers', (req, res) => {
  const data = req.body;
  if (data && typeof data.name == 'string' && data.name.length != 0) {
    const employer: Employer = {
      employerId: 0,
      name: data.name,
    };

    employerService
      .createEmployer(employer)
      .then((employerId) => res.send({ employerId: employerId }))
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing employer name.');
  }
});

router.put('/employers/:id', (req, res) => {
  const data = req.body;
  const id = Number(req.params.id);
  if (data && typeof data.name == 'string' && data.name.length != 0) {
    const employer: Employer = {
      employerId: id,
      name: data.name,
    };

    employerService
      .updateEmployer(employer)
      .then((result) => res.send())
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing employer name.');
  }
});

router.delete('/employers/:id', (req, res) => {
  const id = Number(req.params.id);
  employerService
    .deleteEmployer(id)
    .then((result) => res.send())
    .catch((error: Error) => res.status(500).send(error));
});

export default router;
