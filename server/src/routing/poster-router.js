// @flow
import express from 'express';

import { posterService, type Poster } from '../services/poster-service';

const router: express$Router<> = express.Router();

/**
 * Poster API handling
 */

// Get all posters
router.get('/', (req, res) => {
  posterService
    .getPosters()
    .then((rows) => res.send(rows))
    .catch((error: Error) => res.status(500).send(error));
});

// Get poster with id :id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  posterService
    .getPoster(id)
    .then((poster) => (poster ? res.send(poster) : res.status(404).send('Poster not found')))
    .catch((error: Error) => res.status(500).send(error));
});

// Create a new poster
router.post('/', (req, res) => {
  const data = req.body;
  if (
    data &&
    typeof data.projectId == 'number' &&
    !isNaN(data.projectId) &&
    typeof data.posterDescription == 'string' &&
    data.posterDescription.length != 0 &&
    typeof data.posterUrl == 'string' &&
    data.posterUrl.length != 0 &&
    typeof data.thumbnailUrl == 'string' &&
    data.thumbnailUrl.length != 0
  ) {
    const poster: Poster = {
      posterId: 0,
      projectId: data.projectId,
      posterDescription: data.posterDescription,
      posterUrl: data.posterUrl,
      thumbnailUrl: data.thumbnailUrl,
    };

    posterService
      .createPoster(poster)
      .then((posterId) => res.send({ posterId: posterId }))
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing poster data.');
  }
});

// Update poster with id :id
router.put('/:id', (req, res) => {
  const data = req.body;
  const id = Number(req.params.id);
  if (
    data &&
    typeof data.projectId == 'number' &&
    !isNaN(data.projectId) &&
    typeof data.posterDescription == 'string' &&
    data.posterDescription.length != 0 &&
    typeof data.posterUrl == 'string' &&
    data.posterUrl.length != 0 &&
    typeof data.thumbnailUrl == 'string' &&
    data.thumbnailUrl.length != 0
  ) {
    const poster: Poster = {
      posterId: id,
      projectId: data.projectId,
      posterDescription: data.posterDescription,
      posterUrl: data.posterUrl,
      thumbnailUrl: data.thumbnailUrl,
    };

    posterService
      .updatePoster(poster)
      .then((result) => res.send())
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing poster data.');
  }
});

// Delete poster with id :id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  posterService
    .deletePoster(id)
    .then((result) => res.send())
    .catch((error: Error) => res.status(500).send(error));
});

export default router;
