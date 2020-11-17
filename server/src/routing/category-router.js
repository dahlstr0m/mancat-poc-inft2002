// @flow
import express from 'express';

import { categoryService, type Category } from '../services/category-service';

const router: express$Router<> = express.Router();

/**
 * Category API handling
 */
router.get('/', (req, res) => {
  categoryService
    .getCategories()
    .then((rows) => res.send(rows))
    .catch((error: Error) => res.status(500).send(error));
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  categoryService
    .getCategory(id)
    .then((category) =>
      category ? res.send(category) : res.status(404).send('Category not found')
    )
    .catch((error: Error) => res.status(500).send(error));
});

router.post('/', (req, res) => {
  const data = req.body;
  if (data && typeof data.categoryName == 'string' && data.categoryName.length != 0) {
    const category: Category = {
      categoryId: 0,
      categoryName: data.categoryName,
    };

    categoryService
      .createCategory(category)
      .then((categoryId) => res.send({ categoryId: categoryId }))
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing category name.');
  }
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const id = Number(req.params.id);
  if (data && typeof data.categoryName == 'string' && data.categoryName.length != 0) {
    const category: Category = {
      categoryId: id,
      categoryName: data.categoryName,
    };

    categoryService
      .updateCategory(category)
      .then((result) => res.send())
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing category name.');
  }
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  categoryService
    .deleteCategory(id)
    .then((result) => res.send())
    .catch((error: Error) => res.status(500).send(error));
});

export default router;
