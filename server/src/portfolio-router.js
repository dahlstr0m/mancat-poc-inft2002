// @flow
import express from 'express';

import { projectService, type Project } from './portfolio-service';

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

router.post('/projects', (req, res) => {
  const data = req.body;
  if (
    data &&
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.description == 'string' &&
    data.description.length != 0 &&
    typeof data.projectDate == 'string' &&
    data.projectDate.length != 0 &&
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
      projectDate: data.projectDate,
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
    typeof data.projectDate == 'string' &&
    data.projectDate.length != 0 &&
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
      projectDate: data.projectDate,
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
 * Poster API handling
 */

export default router;
