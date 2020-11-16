// @flow
import express from 'express';

import { employerService, type Employer } from '../services/employer-service';

const router: express$Router<> = express.Router();

/**
 * Employer API handling
 */
router.get('/', (req, res) => {
  employerService
    .getEmployers()
    .then((rows) => res.send(rows))
    .catch((error: Error) => res.status(500).send(error));
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  employerService
    .getEmployer(id)
    .then((employer) =>
      employer ? res.send(employer) : res.status(404).send('Employer not found')
    )
    .catch((error: Error) => res.status(500).send(error));
});

router.post('/', (req, res) => {
  const data = req.body;
  if (data && typeof data.employerName == 'string' && data.employerName.length != 0) {
    const employer: Employer = {
      employerId: 0,
      employerName: data.employerName,
    };

    employerService
      .createEmployer(employer)
      .then((employerId) => res.send({ employerId: employerId }))
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing employer name.');
  }
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const id = Number(req.params.id);
  if (data && typeof data.employerName == 'string' && data.employerName.length != 0) {
    const employer: Employer = {
      employerId: id,
      employerName: data.employerName,
    };

    employerService
      .updateEmployer(employer)
      .then((result) => res.send())
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing employer name.');
  }
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  employerService
    .deleteEmployer(id)
    .then((result) => res.send())
    .catch((error: Error) => res.status(500).send(error));
});

export default router;
