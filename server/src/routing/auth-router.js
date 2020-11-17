// @flow
import express from 'express';
import { authService, type User } from '../services/auth-service';
import bcrypt from 'bcrypt';

const router: express$Router<> = express.Router();

router.post('/login', (req, res) => {
  const data = req.body;
  if (
    data &&
    typeof data.username == 'string' &&
    data.username.length != 0 &&
    typeof data.password == 'string' &&
    data.password.length != 0
  ) {
    const user: User = {
      username: data.username,
      password: data.password,
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
      .catch((error: Error) => res.status(500).send(error));
  } else {
    res.status(400).send('Missing username or password in request');
  }
});

export default router;
