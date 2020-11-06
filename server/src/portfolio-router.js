// @flow
import express from 'express';

import portfolioService, { type Project } from './portfolio-service';

const router: express$Router<> = express.Router();

router.get('/projects', (request, response) => {
  portfolioService
    .getProjects()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/projects/:id', (request, response) => {
  const id = Number(request.params.id);
  portfolioService
    .getProject(id)
    .then((project) =>
      project ? response.send(project) : response.status(404).send('Project not found')
    )
    .catch((error: Error) => response.status(500).send(error));
});

export default router;
