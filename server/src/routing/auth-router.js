// @flow
import express from 'express';
import { authService } from '../services/auth-service';
import bcrypt from 'bcrypt';

const router: express$Router<> = express.Router();

router.post('/login', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  authService
    .getUser(user)
    .then(async (result) => {
      if (result) {
        if (await bcrypt.compare(user.password, result.password)) {
          res.send(result);
        } else {
          res.status(401).send('Invalid username/password combination.');
        }
      } else {
        res.status(401).send('Invalid username/password combination.');
      }
    })
    .catch((error) => res.status(500).send(error));
});

export default router;
