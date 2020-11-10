// @flow

import express from 'express';
import portfolioRouter from './portfolio-router';

/**
 * Express application.
 */
const app: express$Application<> = express();

app.use(express.json());

app.use('/api/v1', portfolioRouter);

export default app;
