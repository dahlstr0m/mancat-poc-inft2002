// @flow
import express from 'express';

import { projectService, type Project } from '../services/project-service';
import { posterService } from '../services/poster-service';
import { categoryService } from '../services/category-service';
import { employerService } from '../services/employer-service';

const router: express$Router<> = express.Router();

/**
 * Project API handling
 */

// Get all projects
router.get('/', (req, res) => {
  projectService
    .getProjects()
    .then((rows) => res.send(rows))
    .catch((error: Error) => res.status(500).send(error));
});

// Get project with id :id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  projectService
    .getProject(id)
    .then((project) => (project ? res.send(project) : res.status(404).send('Project not found')))
    .catch((error: Error) => res.status(500).send(error));
});

// Get category of project with id :id
router.get('/:id/category', (req, res) => {
  const id = Number(req.params.id);
  categoryService
    .getProjectCategory(id)
    .then((category) => (category ? res.send(category) : res.status(404).send('Project not found')))
    .catch((error: Error) => res.status(500).send(error));
});

// Get employer of project with id :id
router.get('/:id/employer', (req, res) => {
  const id = Number(req.params.id);
  employerService
    .getProjectEmployer(id)
    .then((employer) => (employer ? res.send(employer) : res.status(404).send('Project not found')))
    .catch((error: Error) => res.status(500).send(error));
});

// Get posters of project with id :id
router.get('/:id/posters', (req, res) => {
  const id = Number(req.params.id);
  posterService
    .getProjectPosters(id)
    .then((posters) => res.send(posters))
    .catch((error: Error) => res.status(500).send(error));
});

// Create a new project
router.post('/', (req, res) => {
  const data = req.body;
  if (
    data &&
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.projectDescription == 'string' &&
    data.projectDescription.length != 0 &&
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
      projectDescription: data.projectDescription,
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

// Update a project with id :id
router.put('/:id(\\d+)', (req, res) => {
  const data = req.body;
  const id = Number(req.params.id);
  if (
    data &&
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.projectDescription == 'string' &&
    data.projectDescription.length != 0 &&
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
      projectDescription: data.projectDescription,
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

// Update ranking of all posters
router.put('/ranking', (req, res) => {
  const data = req.body;
  const dataTemp: any = data;
  if (Array.isArray(dataTemp)) {
    const projects: Project[] = dataTemp;

    projectService
      .updateRanking(projects)
      .then((results) => res.send())
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Data is not an array of projects.');
  }
});

// Delete a project with id :id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  projectService
    .deleteProject(id)
    .then((result) => res.send())
    .catch((error: Error) => res.status(500).send(error));
});

export default router;
