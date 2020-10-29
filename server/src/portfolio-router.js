// @flow
import express from 'express';
import portfolioService from './portfolio-service';

/**
 * Express router containing portfolio methods.
 */
const router: express$Router<> = express.Router();

router.get('/projects', async (req, res) => {
  try {
    const result = await portfolioService.getProjects();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await portfolioService.getProject(id);

    result.length > 0 ? res.send(result) : res.status(404).send('Project not found.');
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

export default router;
